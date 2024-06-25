<script lang="ts" setup>
import 'vue3-select-component/dist/style.css'
import VueSelect, { type Option } from 'vue3-select-component'
import type { Travel } from '~~/types/travel'

const props = defineProps<{
  name: string
}>()
const { data: travels } = useFetch<{ key: string, value: Travel }[]>(
  '/api/travel',
  {},
)

type TravelOptions = Option<number>
const travelOptions = computed<TravelOptions[]>(() => {
  if (!travels.value) {
    return []
  }
  return travels.value.map(({ value: travel }) => ({
    label: travel.name,
    value: travel.id,
  }))
})
const { value: selected, errorMessage } = useField<number>(() => props.name)
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- @vue-expect-error: Wrong typings in for generic types -->
    <VueSelect
      v-model="selected"
      :options="travelOptions"
      class="w-full"
      placeholder="Select an travel"
    />
    <BaseFormErrorMessage v-if="errorMessage">
      {{ errorMessage }}
    </BaseFormErrorMessage>
  </div>
</template>
