import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './style/css/reset.css'
import './style/css/app.css'
import './style/css/colorPicker.css'
import './style/css/navItem.css'
import './style/css/routerContainer.css'
import './style/css/colorContainer.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
