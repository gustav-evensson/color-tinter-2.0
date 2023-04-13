<script setup>
import { hsla, parseToHsla, readableColor, toHex } from 'color2k';
import { ref, reactive, onMounted, computed, onUpdated, watch } from 'vue';
import colorInput from './colorInput.vue';
import { useColorStore } from '../stores/color';

const globalColor = useColorStore();
const emit = defineEmits(['emitColor', 'fetchName']);
const colorGraph = ref(null);
const colorPicker = ref(null);
const showPicker = ref(false);
const state = reactive({
	x: 0,
	y: 0,
	hue: 0,
	alpha: 0,
	graphWidth: 400,
	graphHeight: 200,
});

onMounted(() => {
	state.graphWidth = colorPicker.value.offsetWidth - 32;
	try {
		const savedColor = localStorage.getItem('savedColor');
		const savedHslaColor = parseToHsla(savedColor);
		state.hue = savedHslaColor[0] / 3.6;
		state.x = savedHslaColor[1] * state.graphWidth;
		state.y = (1 - savedHslaColor[2] / (1 - savedHslaColor[1] / 2)) * state.graphHeight;
		state.alpha = savedHslaColor[3] * 100;
		console.log('Got your saved Color here: ' + savedColor.toUpperCase());
		emit('fetchName', savedColor);
		globalColor.setColor(savedColor);
	} catch {
		state.hue = 176 / 3.6;
		state.x = 1 * state.graphWidth;
		state.y = (1 - 0.5 / (1 - 1 / 2)) * state.graphHeight;
		state.alpha = 100;
	}
	dragElement(colorGraph.value);
});

// Calculates the current color based on the graph and the sliders
const color = computed(() => {
	try {
		return hsla(3.6 * state.hue, state.x / state.graphWidth, (1 - state.y / state.graphHeight) * (1 - state.x / state.graphWidth / 2), state.alpha / 100);
	} catch {
		return hsla(0, 0, 0, 1);
	}
});

watch(
	() => color.value,
	(newColor) => {
		emit('emitColor', newColor);
		globalColor.setColor(newColor);
	}
);
watch(
	() => globalColor.getColor,
	(newColor) => {
		setIndicatorsNoFetch(newColor)
	}
);

onUpdated(() => {
	localStorage.setItem('savedColor', toHex(color.value));
});

// Returns a gradient that we use for the color graph
const graphGradient = computed(() => {
	return `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), linear-gradient(90deg, #FFFFFF 0%, ${hsla(3.6 * state.hue, 1, 0.5, 1)} 100%)`;
});

// Returns a gradient that we use for the aplha slider
const alphaGradient = computed(() => {
	return `linear-gradient(270deg, ${hsla(3.6 * state.hue, state.x / state.graphWidth, (1 - state.y / state.graphHeight) * (1 - state.x / state.graphWidth / 2), 1)}, rgba(0, 0, 0, 0))`;
});

// Reteurns a readable color solely based on the current color
const readColor = computed(() => {
	try {
		return readableColor(color.value);
	} catch {
		return '#ffffff';
	}
});

// Reteurns a readable color solely based on the hue
const hueReadColor = computed(() => {
	try {
		return readableColor(hsla(3.6 * state.hue, 1, 0.5, 1));
	} catch {
		return '#000000';
	}
});

function setIndicators(inputColor) {
	const hslaArray = parseToHsla(inputColor);
	// Calculateing the x, y, hue and aplha value from the color to the sliders
	state.hue = hslaArray[0] / 3.6;
	state.x = hslaArray[1] * state.graphWidth;
	state.y = (1 - hslaArray[2] / (1 - hslaArray[1] / 2)) * state.graphHeight;
	state.alpha = hslaArray[3] * 100;
	// Fetch the name when we get the input emit
	emit('fetchName', color.value);
}
function setIndicatorsNoFetch(inputColor) {
	const hslaArray = parseToHsla(inputColor);
	// Calculateing the x, y, hue and aplha value from the color to the sliders
	state.hue = hslaArray[0] / 3.6;
	state.x = hslaArray[1] * state.graphWidth;
	state.y = (1 - hslaArray[2] / (1 - hslaArray[1] / 2)) * state.graphHeight;
	state.alpha = hslaArray[3] * 100;
}

function slidersEmit() {
	emit('fetchName', color.value);
}

function dragElement(elmnt) {
	elmnt.onmousedown = dragMouseDown;
	elmnt.ontouchstart = dragMouseDown

	function dragMouseDown(e) {
		document.onmouseup = closeDragElement;
		document.ontouchend = closeDragElement
		// Call the elementDrag function whenever the cursor moves:
		document.onmousemove = elementDrag;
		document.ontouchmove = elementTouchDrag
	}

	function elementDrag(e) {
		var rect = elmnt.getBoundingClientRect();
		// Prevents any other unwanted events to happen while we drag
		e.preventDefault();
		// Setting the states x and y value inside the graph element
		if (e.clientY - rect.top > 0 && e.clientY - rect.top < state.graphHeight) {
			state.y = e.clientY - rect.top;
		} else if (e.clientY - rect.top < 0) {
			state.y = 0;
		} else if (e.clientY - rect.top > state.graphHeight) {
			state.y = state.graphHeight;
		}
		if (e.clientX - rect.left > 0 && e.clientX - rect.left < state.graphWidth) {
			state.x = e.clientX - rect.left;
		} else if (e.clientX - rect.left < 0) {
			state.x = 0;
		} else if (e.clientX - rect.left > state.graphWidth) {
			state.x = state.graphWidth;
		}
	}
	function elementTouchDrag(e) {
		var rect = elmnt.getBoundingClientRect();
		// Setting the states x and y value inside the graph element
		if (e.touches[0].clientY - rect.top > 0 && e.touches[0].clientY - rect.top < state.graphHeight) {
			state.y = e.touches[0].clientY - rect.top;
		} else if (e.touches[0].clientY - rect.top < 0) {
			state.y = 0;
		} else if (e.touches[0].clientY - rect.top > state.graphHeight) {
			state.y = state.graphHeight;
		}
		if (e.touches[0].clientX - rect.left > 0 && e.touches[0].clientX - rect.left < state.graphWidth) {
			state.x = e.touches[0].clientX - rect.left;
		} else if (e.touches[0].clientX - rect.left < 0) {
			state.x = 0;
		} else if (e.touches[0].clientX - rect.left > state.graphWidth) {
			state.x = state.graphWidth;
		}
	}

	function closeDragElement() {
		// Stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
		document.ontouchend = null;
		document.ontouchmove = null

		// Fetch the color name when we releas the mouse button
		emit('fetchName', color.value);
	}
}
</script>

<template>
	<div ref="colorPicker" class="colorPicker" :class="{ showPicker: showPicker }">
		<color-input :key="color" :color="color" @emit-color="setIndicators" @showPicker="showPicker = !showPicker" />
		<div ref="colorGraph" class="colorGraph" :style="{ background: graphGradient }">
			<div class="indicator" :style="{ top: state.y + 'px', left: state.x + 'px', borderColor: readColor }"></div>
		</div>
		<div class="hueSlider">
			<input @mouseup="slidersEmit" v-model="state.hue" type="range" step="0.2" :style="{ color: hueReadColor }" />
		</div>
		<div class="alphaSlider">
			<img src="../assets/alphaBG.jpg" alt="" draggable="false" />
			<div class="aplhGradient" :style="{ background: alphaGradient }"></div>
			<input v-model="state.alpha" type="range" step="1" :style="{ color: readColor }" />
		</div>
	</div>
</template>
