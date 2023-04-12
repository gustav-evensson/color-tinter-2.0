<script setup>
import AlertsJS from 'alerts.js'
import { computed, reactive } from 'vue';
import { toHex, readableColor, toHsla } from 'color2k';
import { useColorStore } from './stores/color';
import colorPicker from './components/colorPicker.vue';
import navItem from './components/navItem.vue';
import numberSlider from './components/numberSlider.vue';
import currentColorDisplay from './components/currentColorDisplay.vue';

const alertsJS = new AlertsJS({
  position: 'top-right',
  wallGap: 32,
  scaling: 0.8,
//   colors: {
//     textColor: { dark: '#FFFFFF', light: '#000000' },
//     bgColor: { dark: '#303030', light: '#FFFFFF' },
//     error: '#d64747',
//     warning: '#d27722',
//     success: '#0ba808',
//     alert: '#5274ca',
//   },
});

const globalColor = useColorStore()
const state = reactive({
	currentColor: '',
	colorName: '',
	isActive: false,
});
function getColor(emitColor) {
	state.currentColor = emitColor;
}

function getColorName(emitColor) {
	let hexFormat = toHex(emitColor).slice(1);
	if (hexFormat.length > 6) {
		hexFormat = hexFormat.slice(0, 6);
	}
	fetch(`https://www.thecolorapi.com/id?hex=${hexFormat}`)
		.then((res) => res.json())
		.then((data) => (state.colorName = data.name.value))
		.catch((err) => console.error(err));
}

function getCount(count){
	globalColor.setColorCount(count.value)
}

const validatedColor = computed(() => {
	try {
		return toHsla(state.currentColor);
	} catch {
		return '#000000';
	}
});

const textColor = computed(() => {
	return readableColor(validatedColor.value);
});

function sendAlert(msg){
	console.log('sendAlert')
	alertsJS.createAlert(msg, 'success', 3000)
}
</script>

<template>
	<aside class="sideBar">
		<div class="colorPickerContainer">
			<color-picker @emitColor="getColor" @fetchName="getColorName" />
		</div>
		<current-color-display @sendAlert="sendAlert" :color="validatedColor" :colorName="state.colorName"/>
		<div class="divider"></div>
		<div class="navItems">
			<nav-item icon="src/assets/tints.svg" label="Tints" :color="validatedColor" routerTo="tints" />
			<nav-item icon="src/assets/shades.svg" label="Shades" :color="validatedColor" routerTo="shades" />
			<nav-item icon="src/assets/tones.svg" label="Tones" :color="validatedColor" routerTo="tones" />
		</div>
		<div class="bottomSection">
			<div class="sliderContainer">
				<number-slider @emit-value="getCount" :step="1" :min="2" :max="10" :color="validatedColor"/>
			</div>
		</div>
	</aside>
	<div class="colorDisplay" :style="{ backgroundColor: validatedColor }">
		<router-view v-slot="{ Component }">
			<transition name="fade">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<style>
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>