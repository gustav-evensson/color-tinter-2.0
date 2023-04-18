<script setup>
import { adjustHue, parseToHsla } from 'color2k';
import { ref, onMounted, watch, computed } from 'vue';
import colorContainer from './colorContainer.vue';
import { useColorStore } from '../stores/color';
import {pickSpectrum} from '../spectrums/spectrums'

const globalColor = useColorStore();
const emits = defineEmits(['passFetchName']);
const props = defineProps({
	spectrum: String,
	color: String,
	colorCount: Number,
});
const colorArray = ref([]);
const colorCount = ref(10);

onMounted(() => {
	colorCount.value = globalColor.getColorCount;
	pickSpectrum(props.spectrum, props.color, colorCount.value).then(spectrum => colorArray.value = spectrum)
	// console.log(colorArray.value)
});

const correctOpacity = computed(() => {
	const parsedColor = parseToHsla(props.color)
	if(parsedColor[3] !== 1) {
		return '#ffffff00'
	}
	else{
		return props.color
	}
})

watch(
	() => globalColor.getColorCount,
	async (newCount) => {
		colorCount.value = newCount;
		colorArray.value = await pickSpectrum(props.spectrum, props.color, newCount)
	}
);
</script>

<template>
	<div class="colorSpectrum" :style="{ backgroundColor: correctOpacity }">
		<color-container v-for="(color, idx) in colorArray" :key="color" :color="color" :ani-delay="idx * 50" />
	</div>
</template>

<style scoped></style>
