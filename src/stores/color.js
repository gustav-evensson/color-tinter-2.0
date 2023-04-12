import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useColorStore = defineStore('globalColor', () => {
	const getColor = ref('');
	const getColorCount = ref(5);
	function setColor(newColor) {
		getColor.value = newColor;
	}
	function setColorCount(newColorCount) {
		getColorCount.value = newColorCount;
	}

	return { getColor, setColor, setColorCount, getColorCount };
}, {persist: true});
