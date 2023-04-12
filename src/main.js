import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue'
import router from './router'

import './style/css/reset.css'
import './style/css/app.css'
import './style/css/colorPicker.css'
import './style/css/navItem.css'
import './style/css/routerContainer.css'
import './style/css/colorContainer.css'
import './style/css/numberSlider.css'
import './style/css/currentColorDisplay.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
