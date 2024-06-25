<script lang="ts" setup>
defineProps<{
  steps: string[]
  activeStep: number
}>()
</script>

<template>
  <ol
    class="relative mx-auto my-4 flex list-none gap-4 justify-self-center px-4"
  >
    <BookingFormNavItem
      v-for="(step, index) in steps"
      :key="index"
      :index="index"
      :active="index === activeStep"
      :completed="index < activeStep"
    >
      {{ step }}
    </BookingFormNavItem>
  </ol>
</template>
