import type { Travel } from '~~/types/travel'
import { createBaseTravelMock } from '~/utils/factories/createTravelFactoryMock'

export const travelMock: Travel[] = [
  createBaseTravelMock(),
  createBaseTravelMock({
    id: 2,
    name: 'Super Holidays',
    startDate: '2024-06-30',
    price: 1500,
    endDate: '2024-07-02',
  }),
  createBaseTravelMock({
    id: 3,
    name: 'Change your dreams',
    startDate: '2024-07-01',
    price: 300,
    endDate: '2024-07-05',
    userRating: 4,
  }),
  createBaseTravelMock({
    id: 4,
    name: 'Alanya tours',
    price: 2000,
    endDate: '2024-06-30',
    userRating: 5,
  }),
  createBaseTravelMock({
    id: 5,
    name: 'Magic world experience',
    price: 10000,
    endDate: '2024-07-30',
    startDate: '2024-06-30',
    userRating: 5,
  }),
]
