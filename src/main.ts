import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createClient } from "contentful"
const pinia = createPinia()

import './style.scss'
import App from '@/App.vue'
import router from './router'

createApp(App)
.use(router)
.use(pinia)
.mount('#app')

export const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE || '',
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN || ''
});
