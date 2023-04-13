<script setup>
import { onMounted, watch, ref, reactive, computed } from 'vue';
import { useColorStore } from '../stores/color.js';
import { useMenuCtrl } from '../stores/menu.js';
import { hasBadContrast } from 'color2k';

const color = ref('#000');
const globalColor = useColorStore();
const menuCtrl = useMenuCtrl();

const state = reactive({
	isExpanded: false,
});

onMounted(() => {
	color.value = globalColor.getColor;
	state.isExpanded = menuCtrl.menuOpen;
});

watch(
	() => globalColor.getColor,
	(newColor) => {
		color.value = newColor;
	}
);
function toggleMenu() {
	menuCtrl.toggleMenu();
	state.isExpanded = !state.isExpanded;
}

const blackContrast = computed(() => {
    return hasBadContrast(color.value, 'aa', '#000')
})
const whiteContrast = computed(() => {
    return hasBadContrast(color.value, 'aa', '#fff')
})

</script>

<template>
	<div class="routerContainer">
		<header>
			<button @click="toggleMenu()" :class="{ close: state.isExpanded }">
				<div class="topLine"></div>
				<div class="bottomLine"></div>
			</button>
			<h4>Contrast</h4>
		</header>
		<div class="contrastContainer" :style="{ backgroundColor: color }">
			<div class="infoNotch">
				<svg class="leftArc" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0C8.83594 0 16 7.16309 16 16V0H0Z" fill="white" />
				</svg>
				<div class="statusDisplay">
					<div class="statusContainer">
						<p>Black</p>
						<svg v-if="!blackContrast" class="passedCheck" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="9.75" fill="#5CD276" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M11.5444 15.5224L17.0382 10.2724C17.173 10.1335 17.2489 9.94794 17.25 9.75436C17.2511 9.56086 17.1774 9.37441 17.0442 9.23394C16.9111 9.09354 16.7287 9.00999 16.5355 9.00084C16.3421 8.99169 16.1527 9.05769 16.0069 9.18489L11.0194 13.938L8.78818 11.8099C8.71776 11.7374 8.63341 11.6798 8.54017 11.6406C8.44693 11.6015 8.34675 11.5817 8.24565 11.5823C8.14454 11.5829 8.0446 11.6039 7.95182 11.6441C7.85905 11.6843 7.77535 11.7428 7.70578 11.8162C7.63621 11.8895 7.58219 11.9762 7.54697 12.071C7.51175 12.1658 7.49606 12.2667 7.50084 12.3677C7.50562 12.4687 7.53077 12.5677 7.57478 12.6587C7.61879 12.7497 7.68075 12.8309 7.75694 12.8974L10.5038 15.5224C10.5719 15.5891 10.6525 15.6417 10.741 15.6771C10.8295 15.7125 10.9241 15.73 11.0194 15.7286C11.2144 15.7298 11.4024 15.656 11.5444 15.5224Z"
								fill="white"
							/>
						</svg>
						<svg v-else class="failedCheck" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="9.75" fill="#DF3535" />
							<rect x="7.5" y="8.55566" width="1.49244" height="11.25" rx="0.746219" transform="rotate(-45 7.5 8.55566)" fill="white" />
							<rect x="15.457" y="7.5" width="1.49244" height="11.25" rx="0.746219" transform="rotate(45 15.457 7.5)" fill="white" />
						</svg>
					</div>
					<div class="statusContainer">
						<p>White</p>
						<svg v-if="!whiteContrast" class="passedCheck" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="9.75" fill="#5CD276" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M11.5444 15.5224L17.0382 10.2724C17.173 10.1335 17.2489 9.94794 17.25 9.75436C17.2511 9.56086 17.1774 9.37441 17.0442 9.23394C16.9111 9.09354 16.7287 9.00999 16.5355 9.00084C16.3421 8.99169 16.1527 9.05769 16.0069 9.18489L11.0194 13.938L8.78818 11.8099C8.71776 11.7374 8.63341 11.6798 8.54017 11.6406C8.44693 11.6015 8.34675 11.5817 8.24565 11.5823C8.14454 11.5829 8.0446 11.6039 7.95182 11.6441C7.85905 11.6843 7.77535 11.7428 7.70578 11.8162C7.63621 11.8895 7.58219 11.9762 7.54697 12.071C7.51175 12.1658 7.49606 12.2667 7.50084 12.3677C7.50562 12.4687 7.53077 12.5677 7.57478 12.6587C7.61879 12.7497 7.68075 12.8309 7.75694 12.8974L10.5038 15.5224C10.5719 15.5891 10.6525 15.6417 10.741 15.6771C10.8295 15.7125 10.9241 15.73 11.0194 15.7286C11.2144 15.7298 11.4024 15.656 11.5444 15.5224Z"
								fill="white"
							/>
						</svg>
						<svg v-else class="failedCheck" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="9.75" fill="#DF3535" />
							<rect x="7.5" y="8.55566" width="1.49244" height="11.25" rx="0.746219" transform="rotate(-45 7.5 8.55566)" fill="white" />
							<rect x="15.457" y="7.5" width="1.49244" height="11.25" rx="0.746219" transform="rotate(45 15.457 7.5)" fill="white" />
						</svg>
					</div>
				</div>
				<svg class="rightArc" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16406 0 0 7.16309 0 16V0H16Z" fill="white" />
				</svg>
			</div>
			<div class="blackText textContainer">
				<p class="bigText">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				<p class="smallText">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
			<div class="whiteText textContainer">
				<p class="bigText">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				<p class="smallText">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
		</div>
	</div>
</template>
