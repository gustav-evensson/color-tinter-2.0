<script setup>
import { readableColor, readableColorIsBlack, parseToHsla } from 'color2k';
import { watch, computed, onMounted } from 'vue';
import router from '../router/index.js';

const root = document.querySelector(':root');
const props = defineProps({
	icon: String,
	routerTo: String,
	color: String,
});

onMounted(() => {
	let parsedColor = parseToHsla(props.color);
	root.style.setProperty('--dynamic-background', `hsla(${parsedColor[0]}, ${parsedColor[1] * 100}%, ${parsedColor[2] * 100}%, 1)`);
});

// watch(
// 	() => props.color,
// 	(newColor) => {
// 		let parsedColor = parseToHsla(newColor);
// 		root.style.setProperty('--dynamic-background', `hsla(${parsedColor[0]}, ${parsedColor[1] * 100}%, ${parsedColor[2] * 100}%, 1)`);
// 	}
// );

const textColor = computed(() => {
	if (router.currentRoute.value.name == props.routerTo) {
		return readableColor(props.color);
	} else {
		return '#000';
	}
});

const invert = computed(() => {
	if (readableColorIsBlack(props.color)) {
		return 'invert(0)';
	} else {
		return 'invert(1)';
	}
});
</script>

<template>
	<router-link ref="navItem" class="combinationsLink" :to="'/' + props.routerTo || ''">
		<img :style="{ filter: invert }" class="navIcon" :src="props.icon" />
	</router-link>
</template>
