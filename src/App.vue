<script setup>
import { computed, reactive } from 'vue';
import { toHex, readableColor, toHsla } from 'color2k';
import colorPicker from './components/colorPicker.vue';
import navItem from './components/navItem.vue';

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

const validatedColor = computed(() => {
	try {
		return toHsla(state.currentColor);
	} catch {
		return '#000000';
	}
});

// const hexColor = computed(() => {
//   return toHex(validatedColor.value)
// })

const textColor = computed(() => {
	return readableColor(validatedColor.value);
});
</script>

<template>
	<aside class="sideBar">
		<div class="paddingContainer">
			<div class="colorPickerContainer">
				<color-picker @emitColor="getColor" @fetchName="getColorName" />
			</div>
			<div class="currentColorContainer" :style="{ backgroundColor: validatedColor }">
				<h5 :style="{ color: textColor }">{{ state.colorName }}</h5>
			</div>
		</div>
		<div class="navItems">
			<nav-item icon="src/assets/tints.svg" label="Tints" :color="validatedColor" routerTo="tints" />
			<nav-item icon="src/assets/shades.svg" label="Shades" :color="validatedColor" routerTo="shades" />
			<nav-item icon="src/assets/tones.svg" label="Tones" :color="validatedColor" routerTo="tones" />
		</div>
		<div class="bottomSection">
			<div class="sliderContainer"></div>
			<div class="exportContainer" :style="{ backgroundColor: validatedColor }">
				<div class="topRadius">
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M0 32C17.6731 32 32 17.6731 32 0V32H0Z" :fill="validatedColor" />
					</svg>
				</div>
				<svg class="exportIcon clickEffect" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10.75 7.25L16 2L21.25 7.25" :stroke="textColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M16 16V2" :stroke="textColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					<path
						d="M22 12H25C25.2652 12 25.5196 12.1054 25.7071 12.2929C25.8946 12.4804 26 12.7348 26 13V26C26 26.2652 25.8946 26.5196 25.7071 26.7071C25.5196 26.8946 25.2652 27 25 27H7C6.73478 27 6.48043 26.8946 6.29289 26.7071C6.10536 26.5196 6 26.2652 6 26V13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12H10"
						:stroke="textColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
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