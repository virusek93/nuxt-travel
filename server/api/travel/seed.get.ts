import { useTravels } from '~~/server/utils/useTravels'
import { travelMock } from '~/mocks/travel'

export default defineEventHandler(async () => {
  const { addItem, getAllTravels, deleteItem } = useTravels()
  const travels = await getAllTravels()
  for await (const { value } of travels) {
    await deleteItem(value.id.toString())
  }
  for (let i = 0; i < travelMock.length; i++) {
    if (typeof travelMock[i] !== 'undefined') {
      await addItem(travelMock[i])
    }
  }
  return true
})
