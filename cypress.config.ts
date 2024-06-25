import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on) {
      on('task', {
        async 'db:seed'() {
          return await fetch('http://localhost:3000/api/travel/seed')
        },
      })
    },
  },
})
