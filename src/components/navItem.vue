<script setup>
import { readableColor, readableColorIsBlack } from 'color2k';
import { watch, ref, computed, onMounted } from 'vue';
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
		root.style.setProperty('--dynamic-background', props.color);
	}
);

const textColor = computed(() => {
	if (router.currentRoute.value.name == props.routerTo) {
		return readableColor(props.color);
	} else {
		return '#000';
	}
});

const isActive = computed(() => {
	return router.currentRoute.value.name == props.routerTo;
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
	<router-link ref="navItem" class="navItem" :to="'/' + props.routerTo">
		<div class="navItemContainer">
			<div class="topRadius">
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M0 32C17.6731 32 32 17.6731 32 0V32H0Z" :fill="props.color" />
				</svg>
			</div>
			<img :style="{ filter: invert }" class="navIcon" :src="props.icon" />
			<p :style="{ color: textColor }" class="navLabel">{{ props.label }}</p>
			<div class="bottomRadius">
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0C17.6731 0 32 14.3269 32 32V0H0Z" :fill="props.color" />
				</svg>
			</div>
		</div>
	</router-link>
</template>
