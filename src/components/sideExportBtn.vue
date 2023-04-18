<script setup>
import { readableColor } from 'color2k';
import { computed, ref } from 'vue'
import { useColorStore } from '../stores/color';

const globalColor = useColorStore()
const isExpanded = ref(false)
const props = defineProps({
    color: String
})
const emit = defineEmits(['doExport'])

const textColor = computed(() => {
    return readableColor(props.color)
})

function toggleExpand() {
    isExpanded.value = !isExpanded.value
}

function sendExport(type){
    emit('doExport', type)
}
</script>

<template>
	<div class="sideExportBtn" :style="{ backgroundColor: props.color }">
		<div class="arc">
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M0 32C17.6731 32 32 17.6731 32 0V32H0Z" :fill="props.color" />
			</svg>
		</div>
        <button class="toggleExpandBtn clickEffect" @click="toggleExpand()">
            <div class="exportIcon toggleIcon" :class="{ hide: isExpanded }">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.75 7.25L16 2L21.25 7.25" :stroke="textColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16 16V2" :stroke="textColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M22 12H25C25.2652 12 25.5196 12.1054 25.7071 12.2929C25.8946 12.4804 26 12.7348 26 13V26C26 26.2652 25.8946 26.5196 25.7071 26.7071C25.5196 26.8946 25.2652 27 25 27H7C6.73478 27 6.48043 26.8946 6.29289 26.7071C6.10536 26.5196 6 26.2652 6 26V13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12H10"
                        :stroke="textColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="closeIcon toggleIcon" :class="{ show: isExpanded }">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 7L7 25" :stroke="textColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M25 25L7 7" :stroke="textColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </button>
        <div class="exportActions" :class="{ expanded: isExpanded }">
            <button class="exportAction" @click="sendExport('scss')" :style="{ backgroundColor: props.color , color: textColor}">SCSS</button>
            <button class="exportAction" @click="sendExport('css')" :style="{ backgroundColor: props.color , color: textColor}">CSS</button>
            <button class="exportAction" @click="sendExport('js')" :style="{ backgroundColor: props.color , color: textColor}">JS</button>
        </div>
	</div>
</template>

<style scoped></style>
