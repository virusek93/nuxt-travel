<script lang="ts" setup>
import BaseFormField from '~/components/Base/Form/Field/BaseFormField.vue'

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    accept?: string
    required?: boolean
  }>(),
  { accept: 'image/png, image/jpeg' },
)
const { value, errorMessage } = useField<string>(() => props.name)

const convertBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      if (fileReader.result) {
        resolve(fileReader.result.toString())
      }
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
const onFileChange = async (event: Event) => {
  if (!event.currentTarget) {
    return
  }
  const target = event.currentTarget as HTMLInputElement
  const file = target.files![0] ?? null
  if (!file) return
  value.value = await convertBase64(file)
}
</script>

<template>
  <BaseFormField
    :name="name"
    :label="label"
    :error-message="errorMessage"
    :required="required"
    class="flex flex-col"
  >
    <img
      v-if="value"
      :src="value"
      alt="upload-preview"
      class="max-h-24 max-w-40 object-cover object-center"
    >
    <input
      :id="name"
      :name="name"
      type="file"
      :accept="accept"
      class="rounded-md border border-gray-300"
      @change="onFileChange"
    >
  </BaseFormField>
</template>
