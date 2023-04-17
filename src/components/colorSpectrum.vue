<script setup>
import { adjustHue, parseToHsla } from 'color2k';
import { ref, onMounted, watch } from 'vue';
import colorContainer from './colorContainer.vue';
import { useColorStore } from '../stores/color';

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
	pickSpectrum();
});

watch(
	() => globalColor.getColorCount,
	(newCount) => {
		colorCount.value = newCount;
		pickSpectrum();
	}
);

function pickSpectrum() {
	colorArray.value = eval(`${props.spectrum}Array(props.color)`)

}

function tintsArray(clr) {
	let i = 0;
	let returnArray = [];
	const hslaArray = parseToHsla(clr);
	const tintStep = (1 - hslaArray[2]) / colorCount.value;
	while (i < colorCount.value) {
		returnArray.push(`hsla(${hslaArray[0]}, ${hslaArray[1] * 100}%, ${(hslaArray[2] + tintStep * i) * 100}%, ${hslaArray[3]})`);
		i++;
	}
	return returnArray;
}
function shadesArray(clr) {
	let i = 0;
	let returnArray = [];
	const hslaArray = parseToHsla(clr);
	const tintStep = hslaArray[2] / colorCount.value;
	while (i < colorCount.value) {
		returnArray.push(`hsla(${hslaArray[0]}, ${hslaArray[1] * 100}%, ${(hslaArray[2] - tintStep * i) * 100}%, ${hslaArray[3]})`);
		i++;
	}
	return returnArray;
}
function tonesArray(clr) {
	let i = 0;
	let returnArray = [];
	const hslaArray = parseToHsla(clr);
	const tintStep = hslaArray[1] / colorCount.value;
	while (i < colorCount.value) {
		returnArray.push(`hsla(${hslaArray[0]}, ${(hslaArray[1] - tintStep * i) * 100}%, ${hslaArray[2] * 100}%, ${hslaArray[3]})`);
		i++;
	}
	return returnArray;
}
function complementaryArray(clr) {
	return [clr, adjustHue(clr, 180)];
}
function splitComplementaryArray(clr) {
	return [clr, adjustHue(clr, 150), adjustHue(clr, 210)];
}
function analogousArray(clr) {
	return [clr, adjustHue(clr, 330), adjustHue(clr, 30)];
}
function triadicArray(clr) {
	return [clr, adjustHue(clr, 120), adjustHue(clr, 240)];
}
function tetradicArray(clr) {
	return [clr, adjustHue(clr, 60), adjustHue(clr, 180), adjustHue(clr, 240)];
}
function squareArray(clr) {
	return [clr, adjustHue(clr, 90), adjustHue(clr, 180), adjustHue(clr, 270)];
}
</script>

<template>
	<div class="colorSpectrum" :style="{ backgroundColor: props.color }">
		<color-container v-for="(color, idx) in colorArray" :key="color" :color="color" :ani-delay="idx * 50" />
	</div>
</template>

<style scoped></style>
