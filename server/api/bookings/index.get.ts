import { useBookings } from '~~/server/utils/useBookings'

export default defineEventHandler(async () => {
  const { getAllBookings } = useBookings()
  return await getAllBookings()
})
