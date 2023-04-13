<script setup>
import { readableColor, readableColorIsBlack, parseToHsla } from 'color2k';
import { watch, computed } from 'vue';
import router from '../router/index.js';

const root = document.querySelector(':root');
const props = defineProps({
	icon: String,
	label: String,
	routerTo: String,
	color: String,
});

watch(
	() => props.color,
	(newColor) => {
		let parsedColor = parseToHsla(newColor)
		root.style.setProperty('--dynamic-background', `hsla(${parsedColor[0]}, ${parsedColor[1]*100}%, ${parsedColor[2]*100}%, 1)`);
	}
);

const textColor = computed(() => {
	if (router.currentRoute.value.name == props.routerTo) {
		return readableColor(props.color);
	} else {
		return '#000';
	}
});

const invert = computed(() => {
	if (router.currentRoute.value.name == props.routerTo) {
		if (readableColorIsBlack(props.color)) {
			return 'invert(0)';
		} else {
			return 'invert(1)';
		}
	} else {
		return 'invert(0)';
	}
});
</script>

<template>
	<router-link ref="navItem" class="navItem" :to="'/' + props.routerTo || ''">
		<img :style="{ filter: invert }" class="navIcon" :src="props.icon" />
		<p :style="{ color: textColor }" class="navLabel">{{ props.label }}</p>
	</router-link>
</template>
