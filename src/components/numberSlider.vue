<script setup>
import { readableColor } from 'color2k';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useColorStore } from '../stores/color';
import router from '../router';

const visibleOnRoutes = ['', 'shades', 'tones']
const globalColor = useColorStore()
const props = defineProps({
	step: Number,
	min: Number,
	max: Number,
	color: String,
});
const emits = defineEmits(['emitValue']);

const disableSlider = ref(false)
const numberSlider = ref(null);
const state = reactive({
	sliderValue: undefined,
	sliderWidth: 0,
	step: 1,
	min: 0,
	max: 100,
});

router.afterEach((to) => {
	disableSlider.value = !(visibleOnRoutes.includes(to.name))
})

onMounted(() => {
	state.step = props.step || state.step;
	state.max = props.max || state.max;
	state.min = props.min || state.min;
	state.sliderWidth = numberSlider.value.offsetWidth;
	state.sliderValue = ((globalColor.getColorCount - state.min) / (state.max - state.min)) * state.sliderWidth
	dragElement(numberSlider.value);
});

const calcValue = computed(() => {
	return (state.sliderValue / state.sliderWidth) * (state.max - state.min) + state.min;
});

const steppedValue = computed(() => {
	return Math.round(calcValue.value / state.step) * state.step;
});

const textColor = computed(() => {
	try{
		return readableColor(props.color)
	} catch{
		return '#000'
	}
})

watch(
	() => steppedValue.value,
	(newVal) => {
		emits('emitValue', steppedValue);
	}
);

function dragElement(elmnt) {
	elmnt.onmousedown = dragMouseDown;
	elmnt.ontouchstart = dragMouseDown;
	elmnt.onmouseover = readyToScroll;
	function dragMouseDown(e) {
		elmnt.childNodes[1].style.transition = 'none'
		document.onmouseup = closeDragElement;
		document.ontouchend = closeDragElement
		// Call the elementDrag function whenever the cursor moves:
		document.onmousemove = elementDrag;
		document.ontouchmove = elementTouchDrag;
	}

	function readyToScroll() {
		document.onwheel = elementScroll;
		document.onmouseout = closeScrollElement;
	}

	function elementDrag(e) {
		var rect = elmnt.getBoundingClientRect();
		// Prevents any other unwanted events to happen while we drag
		e.preventDefault();
		if (e.clientX - rect.left > 0 && e.clientX - rect.left < state.sliderWidth) {
			state.sliderValue = e.clientX - rect.left;
		} else if (e.clientX - rect.left < 0) {
			state.sliderValue = 0;
		} else if (e.clientX - rect.left > state.sliderWidth) {
			state.sliderValue = state.sliderWidth;
		}
	}
	function elementTouchDrag(e) {
		var rect = elmnt.getBoundingClientRect();
		if (e.touches[0].clientX - rect.left > 0 && e.touches[0].clientX - rect.left < state.sliderWidth) {
			state.sliderValue = e.touches[0].clientX - rect.left;
		} else if (e.touches[0].clientX - rect.left < 0) {
			state.sliderValue = 0;
		} else if (e.touches[0].clientX - rect.left > state.sliderWidth) {
			state.sliderValue = state.sliderWidth;
		}
	}

	function elementScroll(e) {
		if (state.sliderValue >= 0 && state.sliderValue <= state.sliderWidth) {
			state.sliderValue = state.sliderValue + e.deltaY;
			if (state.sliderValue < 0) {
				state.sliderValue = 0;
			} else if (state.sliderValue > state.sliderWidth) {
				state.sliderValue = state.sliderWidth;
			}
		}
	}

	function closeDragElement() {
		// Stop moving when mouse button is released:
		elmnt.childNodes[1].style.transition = 'left 100ms'
		document.onmouseup = null;
		document.onmousemove = null;
		document.ontouchmove = null;
		document.ontouchend = null;
	}

	function closeScrollElement() {
		document.onmouseleave = null;
		document.onwheel = null;
	}
}
</script>

<template>
	<div :class="{ disable: disableSlider }" ref="numberSlider" class="numberSlider">
		<div class="sliderTrack"></div>
		<div class="sliderThumb" :style="{ left: state.sliderValue + 'px'}">
			<p class="sliderValue" :style="{color: textColor}">{{ steppedValue }}</p>
		</div>
	</div>
</template>
