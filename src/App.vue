<script setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { toHex, readableColor, toHsla } from 'color2k';
import { useColorStore } from './stores/color';
import { useMenuCtrl } from './stores/menu';
import colorPicker from './components/colorPicker.vue';
import navItem from './components/navItem.vue';
import numberSlider from './components/numberSlider.vue';
import currentColorDisplay from './components/currentColorDisplay.vue';
import sideExportBtn from './components/sideExportBtn.vue';
import CombinationsNavItem from './components/combinationsNavItem.vue';

const menuCtrl = useMenuCtrl();
const globalColor = useColorStore();
const state = reactive({
	currentColor: '',
	colorName: '',
	isActive: false,
	isMenuOpen: false,
});
function getColor(emitColor) {
	state.currentColor = emitColor;
}

onMounted(() => {
	state.isMenuOpen = menuCtrl.menuOpen;
	if (window.innerWidth > 1500) {
		state.isMenuOpen = false;
	}
});

watch(
	() => menuCtrl.menuOpen,
	(menuOpen) => {
		state.isMenuOpen = menuOpen;
	}
);
watch(
	() => globalColor.getColor,
	(newCount) => {
		state.currentColor = newCount;
	}
);
watch(
	() => globalColor.doFetch,
	(newCount) => {
		console.log(toHex(state.currentColor));
		fetch(`https://www.thecolorapi.com/id?hex=${toHex(state.currentColor).slice(1)}`)
			.then((res) => res.json())
			.then((data) => (state.colorName = data.name.value))
			.catch((err) => console.error(err));
	}
);

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

function getCount(count) {
	globalColor.setColorCount(count.value);
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
</script>

<template>
	<aside class="sideBar">
		<div class="colorPickerContainer">
			<color-picker @emitColor="getColor" @fetchName="getColorName" />
		</div>
		<current-color-display :color="validatedColor" :colorName="state.colorName" />
		<div class="navItems">
			<nav-item icon="src/assets/tints.svg" label="Tints" :color="validatedColor" routerTo="" />
			<nav-item icon="src/assets/shades.svg" label="Shades" :color="validatedColor" routerTo="shades" />
			<nav-item icon="src/assets/tones.svg" label="Tones" :color="validatedColor" routerTo="tones" />
			<nav-item icon="src/assets/contrast.svg" label="Contrast" :color="validatedColor" routerTo="contrast" />
			<combinations-nav-item icon="src/assets/combinations.svg" label="Combinations" :color="validatedColor" routerTo="complementary" />
		</div>
		<div class="bottomSection">
			<div class="sliderContainer">
				<number-slider @emit-value="getCount" :step="1" :min="2" :max="10" :color="validatedColor"/>
			</div>
			<side-export-btn :color="validatedColor" />
		</div>
	</aside>
	<div class="colorDisplay" :class="{ menuOpen: state.isMenuOpen }">
		<router-view />
	</div>
</template>
