import * as v from 'valibot'

export const getTravelSchema = (today?: Date) => {
  const currentDate = today ?? new Date()
  currentDate.setHours(0, 0, 0, 0)
  return v.pipe(
    v.object({
      name: v.pipe(v.string(), v.trim(), v.nonEmpty('This field is required')),
      startDate: v.pipe(
        v.string(),
        v.nonEmpty('This field is required'),
        v.transform(input => new Date(input)),
        v.date(),
        v.minValue(currentDate, 'Trip cannot start before current date'),
      ),
      endDate: v.pipe(
        v.string(),
        v.nonEmpty('This field is required'),
        v.transform(input => new Date(input)),
        v.date(),
        v.minValue(currentDate, 'Trip cannot end before current date'),
      ),
      pictureUrl: v.pipe(v.string(), v.nonEmpty('This field is required')),
      description: v.pipe(v.string(), v.nonEmpty('This field is required')),
      price: v.number('This field is required'),
      userRating: v.pipe(v.number(), v.minValue(0), v.maxValue(5)),
    }),
    v.forward(
      v.check(
        input => new Date(input.endDate) > new Date(input.startDate),
        'Travel cannot end before start',
      ),
      ['endDate'],
    ),
  )
}
