<script setup>
import { onMounted, watch, ref } from 'vue';
import ColorSpectrum from '../components/colorSpectrum.vue';
import { useColorStore } from '../stores/color.js';

const color = ref('#000');
const globalColor = useColorStore();

onMounted(() => {
	color.value = globalColor.getColor;
});

watch(
	() => globalColor.getColor,
	(newColor) => {
		color.value = newColor;
	}
);
</script>

<template>
	<div class="routerContainer">
		<header>
			<button>
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<line x1="5.75" y1="11.25" x2="26.25" y2="11.25" stroke="black" stroke-width="1.5" stroke-linecap="round" />
					<line x1="5.75" y1="19.25" x2="26.25" y2="19.25" stroke="black" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
            <h4>Tints</h4>
		</header>
		<color-spectrum spectrum="tints" :color="color" :key="color" :color-count="6" />
	</div>
</template>
