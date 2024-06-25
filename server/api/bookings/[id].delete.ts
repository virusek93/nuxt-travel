export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  console.log(id)

  const { deleteItem } = useBookings()
  if (!id) {
    return createError({
      statusCode: 400,
      statusMessage: 'Missing id param',
    })
  }
  return await deleteItem(id)
})
