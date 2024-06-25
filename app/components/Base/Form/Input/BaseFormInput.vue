<script lang="ts" setup>
import type { HtmlInputType } from '~~/types/general'

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    required?: boolean
    type?: HtmlInputType
    placeholder?: string
    min?: string
    max?: string
    value?: string
    customClass?: string
  }>(),
  { type: 'text' },
)
const { value: fieldValue, errorMessage } = useField(() => props.name)
if (props.type === 'date' && props.value) {
  fieldValue.value = props.value
}
</script>

<template>
  <BaseFormField
    :name="name"
    :label="label"
    :error-message="errorMessage"
    :required="required"
  >
    <input
      :id="name"
      v-model="fieldValue"
      :name="name"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      :type="type"
      :required="required"
      class="min-h-10 min-w-52 rounded-md border border-gray-300 px-4"
      :class="customClass"
    >
  </BaseFormField>
</template>
