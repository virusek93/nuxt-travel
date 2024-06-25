<script lang="ts" setup>
const props = defineProps<{
  name: string
  label: string
  pattern?: string
  placeholder?: string
  required?: boolean
  minlength?: number
  maxlength?: number
  customClass?: string
}>()
const { value, errorMessage } = useField(() => props.name)
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
      v-model="value"
      :name="name"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :required="required"
      type="tel"
      class="min-h-10 min-w-52 rounded-md border border-gray-300 px-4"
      :class="customClass"
    >
  </BaseFormField>
</template>
