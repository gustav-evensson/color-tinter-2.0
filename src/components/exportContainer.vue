<script setup>
import router from '../router';
import { useColorStore } from '../stores/color';
import { pickSpectrum } from '../spectrums/spectrums';
import { readableColor, toHex } from 'color2k';
import { computed, onMounted, reactive } from 'vue';
import { ajs } from '../main';

const globalColor = useColorStore();
const props = defineProps({
	color: String,
});

const state = reactive({
	displayCode: '',
	showExport: false,
	spectrum: undefined,
	type: '',
});

onMounted(() => {
	if (router.currentRoute.value.name === '') {
		state.spectrum = 'tints';
	} else {
		state.spectrum = router.currentRoute.value.name;
	}
});

router.afterEach((to) => {
	if (to.name === '') {
		state.spectrum = 'tints';
	} else {
		state.spectrum = to.name;
	}
});

function generateSCSS(clrArray, spectrum, clrName) {
	let codeString = '';
	let idx = 0;
	clrArray.forEach((clr) => {
		codeString += `$${clrName}-${spectrum}-${idx > 0 ? idx * 10 : 'base'}: ${toHex(clr)};\n`;
		idx++;
	});
	return codeString;
}
function generateCSS(clrArray, spectrum, clrName) {
	let codeString = ':root{\n';
	let idx = 0;
	clrArray.forEach((clr) => {
		codeString += `    --${clrName}-${spectrum}-${idx > 0 ? idx * 10 : 'base'}: ${toHex(clr)};\n`;
		idx++;
	});
	codeString += '}';
	return codeString;
}
function generateJS(clrArray, spectrum, clrName) {
	let codeString = `const ${clrName}_${spectrum} = {\n`;
	let idx = 0;
	clrArray.forEach((clr) => {
		codeString += `    ${clrName}_${spectrum}_${idx > 0 ? idx * 10 : 'base'}: ${toHex(clr)};\n`;
		idx++;
	});
	codeString += '}';
	return codeString;
}

async function generateCode(type, clrArray, color) {
	let hexFormat = toHex(color).slice(1);
	if (hexFormat.length > 6) {
		hexFormat = hexFormat.slice(0, 6);
	}
	let colorName = undefined;
	await fetch(`https://www.thecolorapi.com/id?hex=${hexFormat}`)
		.then((res) => res.json())
		.then((data) => (colorName = data.name.value))
		.catch((err) => console.error(err));

	const splitName = colorName.split(' ');
	let formattedName = '';
	let i = 0;
	splitName.forEach((word) => {
		if (i > 0) {
			var formattedWord = word.charAt(0).toUpperCase() + word.slice(1);
		} else {
			var formattedWord = word.charAt(0).toLowerCase() + word.slice(1);
		}
		formattedName += formattedWord;
		i++;
	});
	formattedName = formattedName.replace('/', '')
	if (type === 'scss') {
		return generateSCSS(clrArray, state.spectrum, formattedName);
	} else if (type === 'css') {
		return generateCSS(clrArray, state.spectrum, formattedName);
	} else if (type === 'js') {
		return generateJS(clrArray, state.spectrum, formattedName);
	} else {
		console.error('Error: "type" is not accepted!');
	}
}

async function createExport(color, type, count) {
	const colorArray = await pickSpectrum(state.spectrum, color, count);
	state.displayCode = await generateCode(type, colorArray, color);
	state.type = type.toUpperCase();
	state.showExport = true;
}

function copySpectrum() {
	navigator.clipboard.writeText(state.displayCode);
	ajs.createAlert(`Copied ${state.spectrum}`, 'success');
	state.showExport = false;
}

const textColor = computed(() => {
	return readableColor(props.color);
});

defineExpose({
	createExport,
});
</script>

<template>
	<div class="exportContainer" :class="{ showExport: state.showExport }">
		<div @click="state.showExport = false" class="closeExport"></div>
		<div class="exportCard">
			<div class="codeDisplay">
				<pre>{{ state.displayCode }}</pre>
			</div>
			<button @click="copySpectrum" :style="{ backgroundColor: props.color, color: textColor }" class="copyBtn">Copy as {{ state.type }}</button>
		</div>
	</div>
</template>

<style scoped></style>
