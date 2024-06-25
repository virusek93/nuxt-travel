import { useTravels } from '~~/server/utils/useTravels'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    return createError({
      statusCode: 400,
      statusMessage: 'Missing id param',
    })
  }
  const body = ['PUT'].includes(event.method)
    ? await readBody(event)
    : undefined
  const { updateItem } = useTravels()
  const { item } = body
  const updateStatus = await updateItem(id, item)
  if (!updateStatus) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Edition failed',
    })
  }
  return updateStatus
})
