<script setup>
import { ajs } from '../main'
import { parseToHsla, readableColor, toHex, toHsla, toRgba, hsla } from 'color2k';
import { computed, reactive } from 'vue';

const props = defineProps({
    color: String,
    colorName: String
})
const state = reactive({
    isExpanded: false
})

const emits = defineEmits(['sendAlert'])

const nonTransparentColor = computed(() => {
    const parsedColor = parseToHsla(props.color)
    return hsla(parsedColor[0], parsedColor[1], parsedColor[2], 1)
})
const hexColor = computed(() => {
    return toHex(props.color).toUpperCase()
})
const rgbaColor = computed(() => {
    return toRgba(props.color)
})
const hslaColor = computed(() => {
    return toHsla(props.color)
})
const textColor = computed(() => {
    return readableColor(props.color)
})

function copyColorCode(colorCode){
    navigator.clipboard.writeText(colorCode);
    ajs.createAlert(`Copied ${colorCode}!`, 'success', 3000)
    
}
</script>

<template>
    <button @click="state.isExpanded = !state.isExpanded" class="currentColorDisplayContainer">
        <div class="currentColorDisplay" :style="{backgroundColor: nonTransparentColor}" :class="{expanded: state.isExpanded}">
            <div class="constantView">
                <h3 :style="{color: textColor}">{{ props.colorName }}</h3>
                <p :style="{color: textColor}">{{ hexColor }}</p>
            </div>
            <div class="colorCodes">
                <div class="codeContainer">
                    <h4 class="codeTitle" :style="{color: textColor}">RGBA</h4>
                    <div class="bottomRow">
                        <p @click="copyColorCode(rgbaColor)" class="colorCode clickEffect" :style="{color: textColor}">{{ rgbaColor }}</p>
                    </div>
                </div>
                <div class="codeContainer">
                    <h4 class="codeTitle" :style="{color: textColor}">HSLA</h4>
                    <div class="bottomRow">
                        <p @click="copyColorCode(hslaColor)" class="colorCode clickEffect" :style="{color: textColor}">{{ hslaColor }}</p>
                    </div>
                </div>
                <div class="codeContainer">
                    <h4 class="codeTitle" :style="{color: textColor}">HEX</h4>
                    <div class="bottomRow">
                        <p @click="copyColorCode(hexColor)" class="colorCode clickEffect" :style="{color: textColor, textTransform: 'uppercase'}">{{ hexColor }}</p>
                    </div>
                </div>
            </div>
        </div>
    </button>
</template>

<style scoped></style>
