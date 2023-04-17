<script setup>
import { onMounted, watch, ref, reactive } from 'vue';
import ColorSpectrum from '../components/colorSpectrum.vue';
import { useColorStore } from '../stores/color.js';
import { useMenuCtrl } from '../stores/menu.js';

const color = ref('#000');
const globalColor = useColorStore();
const menuCtrl = useMenuCtrl()

const state = reactive({
	isExpanded: false
})

onMounted(() => {
	color.value = globalColor.getColor;
	state.isExpanded = menuCtrl.menuOpen
});

watch(
	() => globalColor.getColor,
	(newColor) => {
		color.value = newColor;
	}
);

function toggleMenu(){
	menuCtrl.toggleMenu()
	state.isExpanded = !state.isExpanded
}
</script>

<template>
	<div class="routerContainer">
		<header>
			<button @click="toggleMenu()" :class="{ close: state.isExpanded }">
				<div class="topLine"></div>
				<div class="bottomLine"></div>
			</button>
            <h4>Tetradic</h4>
		</header>
		<color-spectrum spectrum="tetradic" :color="color" :key="color" :color-count="6" />
	</div>
</template>