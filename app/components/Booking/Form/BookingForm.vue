<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/valibot'
import { BookingSchema, type BookingFormType } from '~/schemas/booking'
import BookingFormTravelSelect from '~/components/Booking/Form/Travel/BookingFormTravelSelect.vue'

const emit = defineEmits(['created'])

const steps = ref<
  {
    name: string
    fields: Partial<keyof BookingFormType>[]
  }[]
>([
  {
    name: 'Travel',
    fields: ['tripId'],
  },
  {
    name: 'Customer Information',
    fields: ['name', 'email', 'phone', 'age', 'gender'],
  },
  {
    name: 'Payment',
    fields: ['paymentType', 'notes'],
  },
])

const stepNames = steps.value.map(item => item.name)
const activeStep = ref(0)
const isLoading = ref(false)

const initialValues: Partial<BookingFormType> = {
  name: '',
  email: '',
  phone: '',
  notes: '',
}

const { handleSubmit, validate, resetForm, setErrors } = useForm({
  validationSchema: toTypedSchema(BookingSchema),
  initialValues: initialValues,
})

const goToNextStep = async () => {
  if (await validateStep()) {
    activeStep.value += 1
  }
}
const goToPreviousStep = () => {
  activeStep.value -= 1
}

const validateStep = async () => {
  const { errors } = await validate({ mode: 'silent' })
  const { fields } = steps.value[activeStep.value]
  let isValid = true
  fields.forEach((field) => {
    if (errors[field]) {
      setErrors({ [field]: errors[field] })
      isValid = false
    }
  })
  return isValid
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    const data = await $fetch(`/api/bookings/create`, {
      method: 'POST',
      body: {
        item: {
          ...values,
        },
      },
    })
    if (data) {
      alert('Create success')
      resetForm()
      activeStep.value = 0
      emit('created')
    }
  }
  catch (e) {
    console.error(e)
  }
  isLoading.value = false
})
</script>

<template>
  <div class="flex">
    <BookingFormNav
      :steps="stepNames"
      :active-step="activeStep"
    />
  </div>
  <form
    class="m-auto flex min-h-80 max-w-xl flex-col px-4"
    @submit.prevent="onSubmit"
  >
    <section
      v-show="activeStep === 0"
      data-test="step-1 w-full"
    >
      <BookingFormTravelSelect name="tripId" />
    </section>
    <section
      v-show="activeStep === 1"
      class="flex flex-col gap-4"
      data-test="step-2"
    >
      <BaseFormInput
        name="name"
        label="Name"
        custom-class="w-full"
        required
      />
      <BaseFormInput
        name="email"
        label="E-mail address"
        type="email"
        custom-class="w-full"
        required
      />
      <BaseFormInputTel
        name="phone"
        label="Phone number"
        pattern="[0-9]{9}"
        custom-class="w-full"
        :minlength="9"
        :maxlength="9"
        required
      />
      <BaseFormInput
        custom-class="w-full"
        name="age"
        label="Age"
        type="number"
        required
      />
      <BaseFormInputRadio
        label="Gender"
        name="gender"
        required
        :options="[
          { name: 'Male', value: 'male', label: 'Male' },
          { name: 'Female', value: 'female', label: 'Female' },
          { name: 'Other', value: 'other', label: 'Other' },
        ]"
      />
    </section>
    <section
      v-show="activeStep === 2"
      class="flex flex-col gap-3"
      data-test="step-3"
    >
      <BaseFormInputRadio
        label="Payment type"
        name="paymentType"
        required
        :options="[
          { name: 'card', value: 'card', label: 'Card' },
          { name: 'paypal', value: 'paypal', label: 'Paypal' },
          { name: 'revolut', value: 'revolut', label: 'Revolut' },
        ]"
      />
      <BaseFormTextArea
        label="Notes"
        name="notes"
        custom-class="w-full"
      />
    </section>
    <div class="mt-auto flex gap-4 pt-4">
      <button
        v-if="activeStep !== 0"
        type="button"
        class="rounded bg-blue-500 px-4 py-2 text-white"
        @click="goToPreviousStep"
      >
        Back
      </button>
      <button
        v-if="activeStep < steps.length - 1"
        type="button"
        class="ml-auto rounded bg-blue-500 px-4 py-2 text-white"
        @click="goToNextStep"
      >
        Next
      </button>
      <button
        v-else
        type="submit"
        class="ml-auto rounded bg-blue-500 px-4 py-2 text-white"
      >
        Create
      </button>
    </div>
  </form>
</template>
