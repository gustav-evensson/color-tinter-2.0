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
	showCombinations.value = childRoutes.includes(to.name)
	// if (childRoutes.includes(to.name)) {
	// 	showCombinations.value = true;

	// 	// }
	// } else {
	// 	// root.style.setProperty('--combinations-background', `#fff`);
	// 	showCombinations.value = false;
	// 	// invert.value = 'invert(0)';
	// 	// textColor.value = '#000'
	// }
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
		</div>
	</router-link>
</template>
