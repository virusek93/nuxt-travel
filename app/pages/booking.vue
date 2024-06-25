<script lang="ts" setup>
import type { Booking } from '~~/types/booking'

const isBookingModalOpen = ref(false)
const elementToEdit = ref<Booking>()

const {
  data: bookings,
  status,
  refresh,
} = useFetch<{ key: string, value: Booking }[]>('/api/bookings')

const onDeleteItem = async (item: Booking) => {
  if (!confirm(`Are you sure you want to delete booking ${item.id}`)) {
    return false
  }
  try {
    const { id } = item
    await fetch(`/api/bookings/${id}`, {
      method: 'DELETE',
    })
    await refresh()
  }
  catch (e) {
    console.error(e)
  }
}
const onAddNewItem = () => {
  elementToEdit.value = undefined
  isBookingModalOpen.value = true
}

const onCreate = () => {
  refresh()
  isBookingModalOpen.value = false
}
</script>

<template>
  <section>
    <div class="mb-4 flex gap-2">
      <button
        type="button"
        class="ml-auto rounded bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-900"
        @click="onAddNewItem"
      >
        Add new booking
      </button>
    </div>
    <div class="relative basis-full overflow-x-auto">
      <template v-if="status === 'pending' && !bookings">
        Loading...
      </template>
      <template v-else-if="bookings?.length === 0">
        <p class="font-medium text-red-500">
          No bookings
        </p>
      </template>
      <table
        v-else
        class="w-full table-auto"
      >
        <thead>
          <tr class="text-left">
            <th class="border p-4">
              ID
            </th>
            <th class="border p-4">
              Travel ID
            </th>
            <th class="border p-4">
              Customer
            </th>
            <th class="border p-4">
              Email
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
            v-for="{ value: item, key } in bookings"
            :key="key"
          >
            <td class="border p-4">
              {{ item.id }}
            </td>
            <td class="border p-4">
              {{ item.tripId }}
            </td>
            <td class="border p-4">
              {{ item.name }}
            </td>
            <td class="border p-4">
              {{ item.email }}
            </td>
            <td
              class="flex items-center justify-center gap-2 border-b border-r p-4"
            >
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
    <BaseModal
      :is-modal-open="isBookingModalOpen"
      @close="isBookingModalOpen = false"
    >
      <BookingForm @created="onCreate" />
    </BaseModal>
  </section>
</template>
