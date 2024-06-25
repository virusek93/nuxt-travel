import type { Travel } from '~~/types/travel'

export const useTravels = () => {
  const stateKey = 'user-travel'
  const idKey = 'user-travel-id'

  const getLatestId = async () => {
    return await useStorage().getItem<number>(idKey)
  }

  const addItem = async (item: Omit<Travel, 'id'>) => {
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

  const getTravel = async (id: string) => {
    return await useStorage(stateKey).getItem(id)
  }

  const getAllTravels = async () => {
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

  return { addItem, getTravel, deleteItem, updateItem, getAllTravels }
}
