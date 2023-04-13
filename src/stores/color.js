import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useColorStore = defineStore('globalColor', () => {
	const getColor = ref('');
	const doFetch = ref(false);
	const getColorCount = ref(5);
	function setColor(newColor) {
		getColor.value = newColor;
	}
	function setColorCount(newColorCount) {
		getColorCount.value = newColorCount;
	}
	function setDoFetch(){
		console.log('didFetch')
		doFetch.value = !doFetch.value
	}
	return { getColor, setColor, setColorCount, getColorCount ,doFetch, setDoFetch };
}, {persist: true});
