<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/valibot'
import defu from 'defu'
import { getTravelSchema } from '~/schemas/travel'
import type { Travel } from '~~/types/travel'
import { getDateString } from '~/utils'

const props = defineProps<{ travelDetails?: Travel }>()
const emit = defineEmits(['refreshData', 'close'])
const isLoading = ref(false)

const today = new Date()
const currentDate = getDateString(today)

const isEditForm = computed(() => {
  return !!props.travelDetails
})

const getInitialValues = () => {
  const defaultValues = {
    name: '',
    startDate: '',
    endDate: '',
    pictureUrl: '',
    description: '',
    userRating: 5,
  }
  if (!props.travelDetails) {
    return defaultValues
  }
  const { id, userRating, startDate, endDate, ...rest } = props.travelDetails
  return defu(
    {
      ...rest,
      endDate: typeof endDate === 'string' ? endDate : getDateString(endDate),
      startDate:
        typeof startDate === 'string' ? startDate : getDateString(startDate),
    },
    defaultValues,
  )
}

const initialValues = getInitialValues()
const TravelSchema = getTravelSchema()

const { handleSubmit, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(TravelSchema),
  initialValues: initialValues,
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  const { startDate, endDate, ...rest } = values
  const itemData = {
    startDate: getDateString(startDate),
    endDate: getDateString(endDate),
    ...rest,
  }
  const requestData = isEditForm.value
    ? await onEditItem(itemData)
    : await onCreateItem(itemData)
  isLoading.value = false
  if (requestData) {
    emit('refreshData')
  }
})

const onCreateItem = async (item: Omit<Travel, 'id'>) => {
  const data = await $fetch(`/api/travel/`, {
    method: 'POST',
    body: {
      item,
    },
  })
  if (data) {
    alert('Create success')
    resetForm()
  }
  return data
}

const onEditItem = async (item: Omit<Travel, 'id'>) => {
  if (!props.travelDetails) {
    return false
  }
  const { id } = props.travelDetails
  const data = await $fetch(`/api/travel/${id}`, {
    method: 'PUT',
    body: {
      item,
    },
  })
  if (data) {
    alert('Edit success')
    emit('refreshData')
    emit('close')
  }
  return data
}
</script>

<template>
  <h2 v-if="$slots['title']">
    <slot name="title" />
  </h2>
  <form
    class="flex flex-col gap-2"
    @submit.prevent="onSubmit"
  >
    <BaseFormInput
      name="name"
      label="Name"
      custom-class="w-full"
    />
    <BaseFormInput
      name="startDate"
      label="Start"
      :min="currentDate"
      :value="initialValues.startDate"
      type="date"
      custom-class="w-full"
    />
    <BaseFormInput
      name="endDate"
      label="End"
      :min="currentDate"
      :value="initialValues.endDate"
      type="date"
      custom-class="w-full"
    />
    <BaseFormInputFile
      name="pictureUrl"
      label="Picture"
    />
    <BaseFormTextArea
      name="description"
      label="Description"
      custom-class="w-full"
    />
    <BaseFormInput
      name="price"
      type="number"
      label="Price"
      custom-class="w-full"
    />
    <BaseFormInputRange
      name="userRating"
      label="UserRating"
      min="0"
      max="5"
    />
    <div class="flex justify-between">
      <button
        type="button"
        class="flex min-h-10 min-w-20 items-center justify-center rounded bg-blue-800 px-4 text-white transition-all hover:bg-blue-900 disabled:bg-gray-600"
        :disabled="isLoading"
        @click="$emit('close')"
      >
        {{ isEditForm ? "Cancel" : "Close" }}
      </button>
      <button
        type="submit"
        class="flex min-h-10 min-w-20 items-center justify-center rounded bg-blue-800 px-4 text-white transition-all hover:bg-blue-900 disabled:bg-gray-600"
        :disabled="!meta.dirty || isLoading"
      >
        {{ isEditForm ? "Save" : "Create " }}
      </button>
    </div>
  </form>
</template>
