import type { paymentType } from '~~/types/general'

export type BookingCustomer = {
  name: string
  email: string
  phone: string
  age: number
  gender: 'male' | 'female' | 'other'
}

export type Booking = {
  id: number
  tripId: number
  notes: string
  paymentType: paymentType
} & BookingCustomer
