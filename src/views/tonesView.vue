<script setup>
import { parseToHsla } from 'color2k';
import { computed, onMounted, reactive, watch } from 'vue';
import { useColorStore } from '../stores/color.js'

const globalColor = useColorStore()
const state = reactive({
    colorArray: [],
    colorCount: 6
})

onMounted(() => {
    state.colorArray = []
    const hslaArray = parseToHsla(globalColor.getColor)
    const tintStep = (hslaArray[1])/(state.colorCount)
    let i = 1
    while(i < state.colorCount){
        state.colorArray.push(`hsla(${hslaArray[0]}, ${(hslaArray[1]-(tintStep*i))*100}%, ${hslaArray[2]*100}%, ${hslaArray[3]}`)
        i++
    }
})

watch(() => globalColor.getColor, (newColor) => {
    state.colorArray = []
    const hslaArray = parseToHsla(newColor)
    const tintStep = (hslaArray[1])/(state.colorCount)
    let i = 1
    while(i < state.colorCount){
        state.colorArray.push(`hsla(${hslaArray[0]}, ${(hslaArray[1]-(tintStep*i))*100}%, ${hslaArray[2]*100}%, ${hslaArray[3]}`)
        i++
    }
})

</script>

<template>
    <div class="routerContainer">
        <div class="overLay" :style="{backgroundColor: globalColor.getColor}"></div>
        <div class="colorContainer currentColor" :style="{backgroundColor: globalColor.getColor}"></div>
        <div class="colorContainer" v-for="color, idx in state.colorArray" :key="color" :style="{backgroundColor: color, animationDelay: `${idx*50}ms`}"></div>
    </div>
</template>

<style scoped>
</style>