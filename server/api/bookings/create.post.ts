import * as v from 'valibot'
import { BookingSchema } from '~/schemas/booking'
import { useBookings } from '~~/server/utils/useBookings'

export default defineEventHandler(async (event) => {
  const body = ['POST'].includes(event.method)
    ? await readBody(event)
    : undefined
  const { addItem } = useBookings()
  const { item } = body
  if (v.is(BookingSchema, item)) {
    const result = v.safeParse(BookingSchema, item)
    if (result.success) {
      return await addItem(item)
    }
  }
  throw createError({
    statusCode: 500,
    statusMessage: 'Addition failed. Data is no valid',
  })
})
