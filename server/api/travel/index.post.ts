import * as v from 'valibot'
import { useTravels } from '~~/server/utils/useTravels'
import { getTravelSchema } from '~/schemas/travel'

export default defineEventHandler(async (event) => {
  const body = ['POST'].includes(event.method)
    ? await readBody(event)
    : undefined
  const { addItem } = useTravels()
  const TravelSchema = getTravelSchema()
  const { item } = body
  if (v.is(TravelSchema, item)) {
    const result = v.safeParse(TravelSchema, item)
    if (result.success) {
      return await addItem(item)
    }
  }
  throw createError({
    statusCode: 500,
    statusMessage: 'Addition failed. Data is no valid',
  })
})
