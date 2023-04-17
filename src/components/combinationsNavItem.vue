<script setup>
import { readableColor, readableColorIsBlack, parseToHsla } from 'color2k';
import { watch, computed, onMounted, ref, onUpdated } from 'vue';
import router from '../router/index.js';
import combinationsLink from './combinationsLink.vue';

const root = document.querySelector(':root');
const showCombinations = ref(true);
// const invert = ref('invert(0)')
// const textColor = ref('#000')
const props = defineProps({
	icon: String,
	label: String,
	routerTo: String,
	color: String,
});
const childRoutes = ['complementary', 'splitComplementary', 'analogous', 'triadic', 'tetradic', 'square'];

// onMounted(() => {
// 	let parsedColor = parseToHsla(props.color);
// 	root.style.setProperty('--combinations-background', `hsla(${parsedColor[0]}, ${parsedColor[1] * 100}%, ${parsedColor[2] * 100}%, 1)`);
// });

watch(
	() => props.color,
	(newColor) => {
		let parsedColor = parseToHsla(props.color);
		root.style.setProperty('--combinations-background', `hsla(${parsedColor[0]}, ${parsedColor[1] * 100}%, ${parsedColor[2] * 100}%, 1)`);
	}
);

const textColor = computed(() => {
	if (childRoutes.includes(router.currentRoute.value.name)) {
		return readableColor(props.color);
	} else {
		return '#000';
	}
});

const invert = computed(() => {
	if (childRoutes.includes(router.currentRoute.value.name)) {
		if (readableColorIsBlack(props.color)) {
			return 'invert(0)';
		} else {
			return 'invert(1)';
		}
	} else {
		return 'invert(0)';
	}
});

router.afterEach((to) => {
	if (childRoutes.includes(to.name)) {
		// let parsedColor = parseToHsla(props.color);
		// root.style.setProperty('--combinations-background', `hsla(${parsedColor[0]}, ${parsedColor[1] * 100}%, ${parsedColor[2] * 100}%, 1)`);
		showCombinations.value = true;
		// textColor.value = readableColor(props.color)
		// if (readableColorIsBlack(props.color)) {
		// 	invert.value = 'invert(0)';
		// } else {
		// 	invert.value = 'invert(1)';
		// }
	} else {
		// root.style.setProperty('--combinations-background', `#fff`);
		showCombinations.value = false;
		// invert.value = 'invert(0)';
		// textColor.value = '#000'
	}
});

</script>

<template>
	<router-link ref="navItem" class="navItem combinationsNavItem" :class="{ showCombinations: showCombinations }" :to="'/' + props.routerTo || ''">
		<img :style="{ filter: invert }" class="navIcon" :src="props.icon" />
		<p :style="{ color: textColor }" class="navLabel">{{ props.label }}</p>
		<div class="combinations">
			<combinations-link :color="props.color" icon="../../src/assets/Complementary.svg" routerTo="complementary"/>
			<combinations-link :color="props.color" icon="../../src/assets/SplitComplementary.svg" routerTo="splitComplementary"/>
			<combinations-link :color="props.color" icon="../../src/assets/Analogous.svg" routerTo="analogous"/>
			<combinations-link :color="props.color" icon="../../src/assets/Triadic.svg" routerTo="triadic"/>
			<combinations-link :color="props.color" icon="../../src/assets/Tetradic.svg" routerTo="tetradic"/>
			<combinations-link :color="props.color" icon="../../src/assets/Square.svg" routerTo="square"/>
			<!-- <router-link class="combinationsLink" to="/complementary" :style="{ color: textColor }">
				<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="12.375" cy="6" r="2.25" :fill="textColor" />
					<circle cx="12.375" cy="18" r="2.25" :fill="textColor" />
				</svg>
			</router-link>
			<router-link class="combinationsLink" to="/splitComplementary" :style="{ color: textColor }">
				<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="12.625" cy="6" r="2.25" :fill="textColor" />
					<circle cx="17.125" cy="18" r="2.25" :fill="textColor" />
					<circle cx="8.125" cy="18" r="2.25" :fill="textColor" />
				</svg>
			</router-link>
			<router-link class="combinationsLink" to="/analogous" :style="{ color: textColor }">
				<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="12.875" cy="10.5" r="2.25" :fill="textColor" />
					<circle cx="19.625" cy="12.75" r="2.25" :fill="textColor" />
					<circle cx="6.125" cy="12.75" r="2.25" :fill="textColor" />
				</svg>
			</router-link>
			<router-link class="combinationsLink" to="/triadic" :style="{ color: textColor }">
				<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="12.125" cy="6.75" r="2.25" :fill="textColor" />
					<circle cx="18.875" cy="17.25" r="2.25" :fill="textColor" />
					<circle cx="5.375" cy="17.25" r="2.25" :fill="textColor" />
				</svg>
			</router-link>
			<router-link class="combinationsLink" to="/tetradic" :style="{ color: textColor }">
				<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="7.875" cy="6" r="2.25" :fill="textColor" />
					<circle cx="16.875" cy="6" r="2.25" :fill="textColor" />
					<circle cx="16.875" cy="18" r="2.25" :fill="textColor" />
					<circle cx="7.875" cy="18" r="2.25" :fill="textColor" />
				</svg>
			</router-link>
			<router-link class="combinationsLink" to="/square" :style="{ color: textColor }">
				<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="6.625" cy="12" r="2.25" :fill="textColor" />
					<circle cx="12.625" cy="6" r="2.25" :fill="textColor" />
					<circle cx="18.625" cy="12" r="2.25" :fill="textColor" />
					<circle cx="12.625" cy="18" r="2.25" :fill="textColor" />
				</svg>
			</router-link> -->
		</div>
	</router-link>
</template>
