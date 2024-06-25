<script lang="ts" setup>
const props = defineProps<{
  name: string
  label: string
  placeholder?: string
  customClass?: string
}>()
const { value, errorMessage } = useField<string>(() => props.name)
</script>

<template>
  <BaseFormField
    :name="name"
    :label="label"
    :error-message="errorMessage"
  >
    <textarea
      :id="name"
      v-model="value"
      :name="name"
      :placeholder="placeholder"
      class="min-w-52 rounded-md border border-gray-300 px-4 py-2"
      :class="customClass"
    />
  </BaseFormField>
</template>
