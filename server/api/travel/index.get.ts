import { useTravels } from '~~/server/utils/useTravels'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { getAllTravels } = useTravels()
  const data = await getAllTravels()
  if (query) {
    const search: string = typeof query?.s === 'string' ? query.s : ''
    const minPrice
      = typeof query?.min === 'string' && query.min !== ''
        ? Number(query.min)
        : 0
    const maxPrice
      = typeof query?.max === 'string' && query.max !== ''
        ? Number(query.max)
        : Number.MAX_SAFE_INTEGER
    return (
      data.filter(
        ({ value: item }) =>
          item.name.toLocaleLowerCase().includes(search.toLowerCase())
          && item.price >= minPrice
          && item.price <= maxPrice,
      ) ?? []
    )
  }
  return data
})
