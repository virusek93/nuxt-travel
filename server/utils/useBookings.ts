import type { Travel } from '~~/types/travel'
import type { Booking } from '~~/types/booking'

export const useBookings = () => {
  const stateKey = 'bookings'
  const idKey = 'bookings-id'

  const getLatestId = async () => {
    return await useStorage().getItem<number>(idKey)
  }

  const addItem = async (item: Omit<Booking, 'id'>) => {
    let latestId = await getLatestId()
    if (!latestId) {
      latestId = 0
    }
    const updatedLatestId = latestId + 1
    await useStorage(stateKey).setItem(updatedLatestId.toString(), {
      ...item,
      id: updatedLatestId,
    })
    await useStorage().setItem(idKey, updatedLatestId)
    return true
  }

  const getBooking = async (id: string) => {
    return await useStorage(stateKey).getItem(id)
  }

  const getAllBookings = async () => {
    const keys = await useStorage(stateKey).getKeys()
    const prefixedKeys = keys.map(item => `${stateKey}:${item}`)
    return await useStorage().getItems<Travel>(prefixedKeys)
  }

  const deleteItem = async (id: string) => {
    if (!(await useStorage(stateKey).hasItem(id))) {
      return false
    }
    await useStorage(stateKey).removeItem(id)
    return true
  }

  const updateItem = async (id: string, item: Travel) => {
    await useStorage(stateKey).setItem(id.toString(), { ...item, id })
    return true
  }

  return { addItem, getBooking, deleteItem, updateItem, getAllBookings }
}
