<script lang="ts" setup>
const props = defineProps<{
  index: number
  active?: boolean
  completed?: boolean
}>()
const accessibilityText = computed(() => {
  if (props.active) {
    return 'Current'
  }
  if (props.completed) {
    return 'Completed'
  }
  return ''
})
</script>

<template>
  <li class="flex flex-col items-center justify-center gap-2">
    <span
      v-if="accessibilityText"
      class="sr-only"
    >{{
      accessibilityText
    }}</span>
    <span
      class="flex min-h-8 min-w-8 items-center justify-center rounded-full border-2 border-blue-500 bg-white"
      :class="{
        '!bg-blue-500 font-medium text-white': active,
        'text-blue-500': completed,
      }"
    >{{ index + 1 }}</span>
    <span
      class="text-sm"
      :class="{
        'font-medium text-blue-500': active,
        'text-blue-500': completed,
      }"
    ><slot /></span>
  </li>
</template>
