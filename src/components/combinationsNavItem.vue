<script setup>
import { readableColor, readableColorIsBlack, parseToHsla } from 'color2k';
import { watch, computed, onMounted, ref, onUpdated } from 'vue';
import router from '../router/index.js';
import combinationsLink from './combinationsLink.vue';
import complemenraryIcon from "../../src/assets/Complementary.svg"
import splitComplementaryIcon from "../../src/assets/SplitComplementary.svg"
import analogousIcon from "../../src/assets/Analogous.svg"
import triadicIcon from "../../src/assets/Triadic.svg"
import tetradicIcon from "../../src/assets/Tetradic.svg"
import squareIcon from "../../src/assets/Square.svg"

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
	showCombinations.value = childRoutes.includes(to.name)
});
</script>

<template>
	<router-link ref="navItem" class="navItem combinationsNavItem" :class="{ showCombinations: showCombinations }" :to="'/' + props.routerTo || ''">
		<img :style="{ filter: invert }" class="navIcon" :src="props.icon" draggable="false" />
		<p :style="{ color: textColor }" class="navLabel">{{ props.label }}</p>
		<div class="combinations">
			<combinations-link :color="props.color" :icon="complemenraryIcon" routerTo="complementary" />
			<combinations-link :color="props.color" :icon="splitComplementaryIcon" routerTo="splitComplementary" />
			<combinations-link :color="props.color" :icon="analogousIcon" routerTo="analogous" />
			<combinations-link :color="props.color" :icon="triadicIcon" routerTo="triadic" />
			<combinations-link :color="props.color" :icon="tetradicIcon" routerTo="tetradic" />
			<combinations-link :color="props.color" :icon="squareIcon" routerTo="square" />
		</div>
	</router-link>
</template>
