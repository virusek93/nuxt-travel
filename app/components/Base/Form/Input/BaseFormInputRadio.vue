<script lang="ts" setup>
const props = defineProps<{
  name: string
  label?: string
  required?: boolean
  options: { label: string, name: string, value: string }[]
}>()
const { value: radioVal, errorMessage } = useField(() => props.name)
</script>

<template>
  <div>
    <p
      v-if="label"
      class="mb-3 text-sm font-medium text-gray-500"
    >
      <span
        class="after:ml-0.5 after:hidden after:text-red-500 after:content-['*']"
        :class="{ 'after:!inline-block': required }"
      >{{ label }}</span>
    </p>
    <div class="flex gap-4">
      <BaseFormField
        v-for="{ name: optionName, label: optionLabel, value } in options"
        :key="optionName"
        class="flex items-center gap-2"
        :name="optionName"
        :label="optionLabel"
      >
        <input
          :id="optionName"
          v-model="radioVal"
          :name="optionName"
          :value="value"
          type="radio"
          class="rounded-md border border-gray-300 px-4"
        >
      </BaseFormField>
    </div>
    <BaseFormErrorMessage v-if="errorMessage">
      {{ errorMessage }}
    </BaseFormErrorMessage>
  </div>
</template>
