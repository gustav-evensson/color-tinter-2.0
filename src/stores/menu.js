import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMenuCtrl = defineStore(
	'menuCtrl',
	() => {
		const menuOpen = ref(false);
		function toggleMenu() {
			menuOpen.value = !menuOpen.value;
		}
		return { menuOpen, toggleMenu };
	},
	{ persist: true }
);
