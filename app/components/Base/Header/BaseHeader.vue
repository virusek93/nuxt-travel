<script setup lang="ts"></script>

<template>
  <nav class="flex min-h-20 items-center">
    <ul class="flex list-none gap-5 p-0">
      <li>
        <NuxtLink
          to="/"
          class="underline-offset-2 hover:underline"
          active-class="text-lime-600"
        >
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/booking"
          class="underline-offset-2 hover:underline"
          active-class="text-lime-600"
        >
          Bookings
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/travel"
          class="underline-offset-2 hover:underline"
          active-class="text-lime-600"
        >
          Travel
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
