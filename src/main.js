import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import AlertsJS from 'alerts.js';

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
import './style/css/sideExportBtn.css'
import './style/css/contrastContainer.css'
import './style/css/exportContainer.css'

export const ajs = new AlertsJS({
	position: 'bottom-right',
	wallGap: 32,
	scaling: 1,
	hideCountdown: true
});

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
