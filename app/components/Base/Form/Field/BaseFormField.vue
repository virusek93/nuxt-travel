<script lang="ts" setup>
defineProps<{
  name: string
  label: string
  required?: boolean
  errorMessage?: string
  customClass?: string
}>()
</script>

<template>
  <div>
    <label
      :for="name"
      data-test="form-label"
      class="flex cursor-pointer flex-col items-start gap-0.5 text-sm font-medium text-gray-500"
      :class="customClass"
    >
      <span
        class="after:ml-0.5 after:hidden after:text-red-500 after:content-['*']"
        :class="{ 'after:!inline-block': required }"
      >{{ label }}</span>
    </label>
    <slot />
    <BaseFormErrorMessage
      v-if="errorMessage"
      data-test="error"
    >
      {{ errorMessage }}
    </BaseFormErrorMessage>
  </div>
</template>
