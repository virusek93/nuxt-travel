<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import type { Travel } from '~~/types/travel'

const search = useRouteQuery('s', '')
const min = useRouteQuery('min', '')
const max = useRouteQuery('max', '')

const {
  data: travels,
  status,
  refresh,
} = useFetch<{ key: string, value: Travel }[]>('/api/travel', {
  lazy: true,
  params: { s: search, min, max },
  watch: [search, min, max],
})
const isModalOpen = ref(false)
const elementToEdit = ref<Travel>()

const filteredTravels = computed(() => {
  if (!search.value) {
    return travels.value ?? []
  }
  return (
    travels.value?.filter(({ value: item }) =>
      item.name.toLocaleLowerCase().includes(search.value.toLowerCase()),
    ) ?? []
  )
})

const onDeleteItem = async (item: Travel) => {
  if (!confirm(`Are you sure you want to delete ${item.name}`)) {
    return false
  }
  try {
    const { id } = item
    await fetch(`/api/travel/${id}`, {
      method: 'DELETE',
    })
    await refresh()
  }
  catch (e) {
    console.error(e)
  }
}
const onEditItem = (item: Travel) => {
  elementToEdit.value = item
  isModalOpen.value = true
}
const onAddNewItem = () => {
  elementToEdit.value = undefined
  isModalOpen.value = true
}
const debouncedSearchByName = useDebounceFn((e) => {
  search.value = e.target.value
}, 300)
</script>

<template>
  <section>
    <div class="mb-3 flex gap-2">
      <button
        type="button"
        data-cy="add-new"
        class="ml-auto rounded bg-green-700 px-4 py-3 text-white transition-all hover:bg-green-800"
        @click="onAddNewItem"
      >
        Add new travel
      </button>
    </div>
    <div class="flex flex-col gap-4 pb-6 lg:flex-row lg:pb-0">
      <div
        class="flex flex-wrap items-center gap-3 lg:basis-1/4 lg:flex-col lg:items-start"
      >
        <div>
          <h3 class="font-bold">
            Filters
          </h3>
          <BaseFormField
            label=""
            name="search"
          >
            <span class="sr-only">Search by name</span>
            <input
              :value="search"
              placeholder="Search by name"
              type="text"
              class="min-h-10 min-w-52 rounded-md border border-gray-300 px-4"
              @input="debouncedSearchByName"
            >
          </BaseFormField>
        </div>
        <div>
          <h4 class="font-bold">
            Price
          </h4>
          <div class="flex items-center gap-3">
            <BaseFormField
              label=""
              name="min"
              class="shrink-0"
            >
              <span class="sr-only">Min price</span>
              <input
                v-model="min"
                type="number"
                placeholder="from"
                :min="0"
                :max="max"
                class="min-h-10 max-w-20 rounded-md border border-gray-300 pl-4"
              >
            </BaseFormField>
            <span> - </span>
            <BaseFormField
              label=""
              name="max"
              class="shrink-0"
            >
              <span class="sr-only">Max price</span>
              <input
                v-model="max"
                type="number"
                placeholder="to"
                :min="min ?? 0"
                class="min-h-10 max-w-20 rounded-md border border-gray-300 pl-4"
              >
            </BaseFormField>
          </div>
        </div>
      </div>
      <div class="relative basis-full overflow-x-auto">
        <template v-if="status === 'pending' && !filteredTravels">
          Loading...
        </template>
        <template v-else-if="filteredTravels.length === 0">
          <p class="font-medium text-red-500">
            {{ search ? "No results" : "No travels data" }}
          </p>
        </template>
        <table
          v-else
          class="w-full table-auto"
        >
          <thead>
            <tr class="text-left">
              <th class="border p-4">
                Name
              </th>
              <th class="border p-4">
                Start date
              </th>
              <th class="border p-4">
                End date
              </th>
              <th class="border p-4">
                Price
              </th>
              <th class="border p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <transition-fade
            group
            tag="tbody"
            appear
            no-move
          >
            <tr
              v-for="{ value: item, key } in travels"
              :key="key"
              data-cy="travel-items"
            >
              <td class="border p-4">
                {{ item.name }}
              </td>
              <td class="text-nowrap border p-4">
                {{ item.startDate }}
              </td>
              <td class="text-nowrap border p-4">
                {{ item.endDate }}
              </td>
              <td class="border p-4">
                {{ item.price }}
              </td>
              <td
                class="flex flex-col items-center justify-center gap-2 border-b border-r p-4 md:flex-row"
              >
                <button
                  type="button"
                  class="min-h-8 rounded bg-blue-800 px-4 text-white transition-all hover:bg-blue-900"
                  @click="onEditItem(item)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="min-h-8 rounded px-4 text-red-500 transition-all hover:bg-red-800 hover:text-white"
                  @click="onDeleteItem(item)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </transition-fade>
        </table>
      </div>
    </div>
    <BaseModal
      :is-modal-open="isModalOpen"
      data-cy="travel-modal"
      @close="isModalOpen = false"
    >
      <template #title>
        <h5 class="font-medium">
          {{ elementToEdit ? `Edit ${elementToEdit.name}` : "Add new travel" }}
        </h5>
      </template>
      <TravelForm
        v-if="isModalOpen"
        :travel-details="elementToEdit"
        @refresh-data="refresh()"
        @close="isModalOpen = false"
      />
    </BaseModal>
  </section>
</template>
