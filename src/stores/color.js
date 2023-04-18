import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useColorStore = defineStore('globalColor', () => {
	const getColor = ref('');
	const doFetch = ref(false);
	const getColorCount = ref(5);
	const doExport = ref('')
	function setColor(newColor) {
		getColor.value = newColor;
	}
	function setColorCount(newColorCount) {
		getColorCount.value = newColorCount;
	}
	function setDoFetch(){
		doFetch.value = !doFetch.value
	}
	function setDoExport(){
		doExport.value = !doExport.value
	}
	return { getColor, setColor, setColorCount, getColorCount ,doFetch, setDoFetch, doExport, setDoExport };
}, {persist: true});
