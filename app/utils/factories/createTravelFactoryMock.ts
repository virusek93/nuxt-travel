import defu from 'defu'
import type { Travel } from '~~/types/travel'

const baseTravelMock: Travel = {
  id: 1,
  name: 'Test travel',
  startDate: '2024-07-01',
  endDate: '2024-07-25',
  userRating: 5,
  description: 'Lorem',
  pictureUrl: 'https://picsum.photos/seed/picsum/100/100',
  price: 1000,
}

export const createBaseTravelMock = (overwrites: Partial<Travel> = {}) => {
  return defu({
    ...baseTravelMock,
    ...overwrites,
  })
}
