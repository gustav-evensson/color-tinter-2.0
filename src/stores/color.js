import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useColorStore = defineStore('globalColor', () => {
	const getColor = ref('');
	function setColor(newColor) {
		getColor.value = newColor;
	}

	return { getColor, setColor };
});
