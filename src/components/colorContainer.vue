<script setup>
import { ajs } from '../main';
import { readableColor, toHex } from 'color2k';
import { computed, onMounted, ref } from 'vue';
import { useColorStore } from '../stores/color';

const colorContainer = ref(null)
const globalColor = useColorStore();
const emits = defineEmits(['fetchName']);
const props = defineProps({
	color: String,
	aniDelay: Number
});

const hexColor = computed(() => {
	return toHex(props.color);
});

const textColor = computed(() => {
	try {
		return readableColor(props.color);
	} catch {
		return '#000';
	}
});

onMounted(() => {
	setTimeout(() => {
		try{
			colorContainer.value.classList.add('show')
		}
		catch{
			
		}
	}, props.aniDelay);
})

function copyColor() {
	navigator.clipboard.writeText(hexColor.value);
	ajs.createAlert(`Copied ${hexColor.value.toUpperCase()}`, 'success');
}
function pickColor() {
	globalColor.setColor(props.color);
	globalColor.setDoFetch();
}
</script>

<template>
	<div ref="colorContainer" class="colorContainer" :style="{ backgroundColor: props.color }">
		<div class="colorActions">
			<button @click="pickColor()" class="pickBtn">
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 20H26C26.2652 20 26.5196 19.8946 26.7071 19.7071C26.8946 19.5196 27 19.2652 27 19V6C27 5.73478 26.8946 5.48043 26.7071 5.29289C26.5196 5.10536 26.2652 5 26 5H12C11.7348 5 11.4804 5.10536 11.2929 5.29289C11.1054 5.48043 11 5.73478 11 6V7"
						:stroke="textColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						/>
						<path d="M13 17L10 20L13 23" :stroke="textColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						<path
						d="M22 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V26C5 26.2652 5.10536 26.5196 5.29289 26.7071C5.48043 26.8946 5.73478 27 6 27H20C20.2652 27 20.5196 26.8946 20.7071 26.7071C20.8946 26.5196 21 26.2652 21 26V25"
						:stroke="textColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						/>
						<path d="M19 15L22 12L19 9" :stroke="textColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>
				<button @click="copyColor()" class="copyBtn">
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M21 21H24C25.6569 21 27 19.6569 27 18V8C27 6.34315 25.6569 5 24 5H14C12.3431 5 11 6.34315 11 8V11"
							:stroke="textColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M18 11H8C6.34315 11 5 12.3431 5 14V24C5 25.6569 6.34315 27 8 27H18C19.6569 27 21 25.6569 21 24V14C21 12.3431 19.6569 11 18 11Z"
							:stroke="textColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			<p :style="{ color: textColor }">{{ hexColor }}</p>
		</div>
	</div>
</template>
