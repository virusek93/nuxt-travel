<script lang="ts" setup>
const props = defineProps<{
  name: string
  label: string
  min?: string
  max?: string
}>()

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <BaseFormField
    :name="name"
    :label="label"
    :error-message="errorMessage"
  >
    <input
      :id="name"
      v-model.number="value"
      :name="name"
      :min="min"
      :max="max"
      type="range"
      class="min-h-8 min-w-52 rounded-md border border-gray-300"
    >
  </BaseFormField>
</template>
