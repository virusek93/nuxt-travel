export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const { deleteItem } = useTravels()
  if (!id) {
    return createError({
      statusCode: 400,
      statusMessage: 'Missing id param',
    })
  }
  if (!(await deleteItem(id))) {
    return createError({
      statusCode: 404,
      statusMessage: 'Item not found',
    })
  }
})
