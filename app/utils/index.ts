export const getDateString = (item: Date) => {
  return item.toISOString().split('T')[0]
}
