<script setup>
import { readableColor, readableColorIsBlack, parseToHsla } from 'color2k';
import { watch, computed, onMounted, ref } from 'vue';
import router from '../router/index.js';

const root = document.querySelector(':root');
// const invert = ref('invert(0)');
const props = defineProps({
	icon: String,
	routerTo: String,
	color: String,
});

onMounted(() => {
	let parsedColor = parseToHsla(props.color);
	root.style.setProperty('--dynamic-background', `hsla(${parsedColor[0]}, ${parsedColor[1] * 100}%, ${parsedColor[2] * 100}%, 1)`);
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

watch(
	() => props.color,
	(newColor) => {
		if (router.currentRoute.value.name == props.routerTo) {
			if (readableColorIsBlack(props.color)) {
				return 'invert(0)';
			} else {
				return 'invert(1)';
			}
		} else {
			return 'invert(0)';
		}
	}
);

// router.afterEach((to) => {
// 	console.log(router.currentRoute.name, props.routerTo)
// 	if (to.name == props.routerTo) {
// 		if (readableColorIsBlack(props.color)) {
// 			invert.value = 'invert(0)';
// 		} else {
// 			invert.value = 'invert(1)';
// 		}
// 	}
// 	else{
// 		invert.value = 'invert(0)'
// 	}
// })
</script>

<template>
	<router-link ref="navItem" class="combinationsLink" :to="'/' + props.routerTo || ''">
		<img :style="{ filter: invert }" class="navIcon" :src="props.icon" />
	</router-link>
</template>
