<script setup>
import { toHex, parseToHsla } from 'color2k';
import { onMounted, ref, computed, reactive } from 'vue';

const props = defineProps({
	color: String,
});

// const state = reactive({
// 	inputColor: 'ff0000'
// })

const inputColor = ref('ff0000');
const inputBox = ref(null);

onMounted(() => {
	inputColor.value = toHex(props.color).slice(1);
	inputBox.value.onpaste = () => {
		setTimeout(() => {
			replaceInput()
		}, 10);
	};
});

function replaceInput() {
	inputColor.value = inputColor.value.replace('#', '');
}

const inputBG = computed(() => {
	let parsedColor = parseToHsla(props.color);
	return `hsla(${parsedColor[0]}, ${parsedColor[1] * 100}%, 95%, 1)`;
});
</script>

<template>
	<div class="colorInput" :style="{ backgroundColor: inputBG }">
		<button @click="$emit('showPicker')" class="palletteIcon clickEffect">
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M27.7004 18.675C27.9078 17.7648 28.0085 16.8335 28.0004 15.9C27.9504 9.28749 22.4754 3.93749 15.8754 3.99999C13.0559 4.02972 10.3368 5.05141 8.19533 6.8858C6.05386 8.72019 4.62675 11.2501 4.16439 14.0317C3.70204 16.8133 4.23398 19.6688 5.66687 22.0973C7.09977 24.5258 9.3421 26.3722 12.0004 27.3125C12.4527 27.4754 12.9375 27.5268 13.4138 27.4623C13.8901 27.3978 14.3438 27.2194 14.7364 26.9421C15.129 26.6648 15.4489 26.2969 15.669 25.8696C15.889 25.4422 16.0028 24.9681 16.0004 24.4875V24C15.9988 23.6056 16.0753 23.2147 16.2254 22.85C16.3756 22.4853 16.5965 22.1539 16.8754 21.875C17.1543 21.5961 17.4857 21.3752 17.8504 21.225C18.2152 21.0748 18.606 20.9983 19.0004 21H24.7754C25.4541 21.0004 26.1128 20.7707 26.6441 20.3485C27.1754 19.9262 27.5478 19.3362 27.7004 18.675V18.675Z"
					stroke="#8e8e8e"
					class="stroke"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M16 10.75C16.6904 10.75 17.25 10.1904 17.25 9.5C17.25 8.80964 16.6904 8.25 16 8.25C15.3096 8.25 14.75 8.80964 14.75 9.5C14.75 10.1904 15.3096 10.75 16 10.75Z"
					fill="#8e8e8e"
				/>
				<path
					d="M10.375 14C11.0654 14 11.625 13.4404 11.625 12.75C11.625 12.0596 11.0654 11.5 10.375 11.5C9.68464 11.5 9.125 12.0596 9.125 12.75C9.125 13.4404 9.68464 14 10.375 14Z"
					fill="#8e8e8e"
				/>
				<path
					d="M10.375 20.5C11.0654 20.5 11.625 19.9404 11.625 19.25C11.625 18.5596 11.0654 18 10.375 18C9.68464 18 9.125 18.5596 9.125 19.25C9.125 19.9404 9.68464 20.5 10.375 20.5Z"
					fill="#8e8e8e"
				/>
				<path
					d="M21.625 14C22.3154 14 22.875 13.4404 22.875 12.75C22.875 12.0596 22.3154 11.5 21.625 11.5C20.9346 11.5 20.375 12.0596 20.375 12.75C20.375 13.4404 20.9346 14 21.625 14Z"
					fill="#8e8e8e"
				/>
			</svg>
		</button>
		<span>#</span>
		<input ref="inputBox" v-model="inputColor" type="text" @change="$emit('emitColor', '#' + inputColor)" />
	</div>
</template>

<style scoped></style>
