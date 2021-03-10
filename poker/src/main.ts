import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'

import './assets/css/index.css'

createApp(App).use(store, key).mount('#app')
