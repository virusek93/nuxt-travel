import { travelMock } from '~/mocks/travel'
import { useTravels } from '~~/server/utils/useTravels'

export default defineNitroPlugin(async () => {
  const { addItem } = useTravels()
  for (let i = 0; i < travelMock.length; i++) {
    if (typeof travelMock[i] !== 'undefined') {
      await addItem(travelMock[i])
    }
  }
})
