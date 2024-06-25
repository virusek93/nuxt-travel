<script lang="ts" setup>
const dialogRef = ref<HTMLDialogElement>()
const props = defineProps<{ isModalOpen: boolean }>()
defineEmits(['close'])
watchEffect(() => {
  if (!dialogRef.value) {
    return
  }
  if (props.isModalOpen) {
    dialogRef.value.showModal()
    return
  }
  dialogRef.value.close()
})
</script>

<template>
  <dialog
    ref="dialogRef"
    class="rounded bg-white p-5 backdrop:bg-black/50"
  >
    <div
      class="mb-4 flex items-center"
      data-test="content"
    >
      <slot name="title" />
      <button
        type="button"
        class="ml-auto flex min-h-4 min-w-4 items-center transition-opacity hover:opacity-50"
        @click="$emit('close')"
      >
        X
      </button>
    </div>
    <slot />
  </dialog>
</template>
