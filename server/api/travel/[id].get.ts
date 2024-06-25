import { useTravels } from '~~/server/utils/useTravels'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { getTravel } = useTravels()
  if (!id) {
    return createError({
      statusCode: 400,
      statusMessage: 'Missing id param',
    })
  }
  const data = await getTravel(id)
  if (!data) {
    return createError({
      statusCode: 404,
      statusMessage: 'Item not found',
    })
  }
  return data
})
