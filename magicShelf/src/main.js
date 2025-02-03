import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon } from 'oh-vue-icons'

const app = createApp(App)

// Stores
app.use(createPinia())

// Routes
app.use(router)

// Icons
app.component('v-icon', OhVueIcon)

app.mount('#app')
