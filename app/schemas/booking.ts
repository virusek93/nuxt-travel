import * as v from 'valibot'

export const BookingSchema = v.object({
  tripId: v.number('This field is required'),
  name: v.pipe(v.string(), v.trim(), v.nonEmpty('This field is required')),
  email: v.pipe(v.string(), v.nonEmpty('This field is required'), v.email()),
  phone: v.pipe(
    v.string(),
    v.nonEmpty('This field is required'),
    v.regex(/^[0-9]{9}$/i),
  ),
  age: v.pipe(
    v.number('Please provide your age'),
    v.minValue(0),
    v.maxValue(150),
  ),
  gender: v.picklist(['male', 'female', 'other'], 'Please choose gender'),
  paymentType: v.picklist(
    ['card', 'paypal', 'revolut'],
    'Please choose payment method',
  ),
  notes: v.string(),
})

export type BookingFormType = v.InferOutput<typeof BookingSchema>
