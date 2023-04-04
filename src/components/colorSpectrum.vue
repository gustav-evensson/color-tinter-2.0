<script setup>
import { parseToHsla } from 'color2k';
import { ref, onMounted } from 'vue';
import colorContainer from './colorContainer.vue';

const props = defineProps({
    spectrum: String,
    color: String,
    colorCount: Number
})
const colorArray = ref([])

onMounted(() => {
    if(props.spectrum == 'tints'){
        colorArray.value = tintsArray(props.color)
    }
    else if(props.spectrum == 'shades'){
        colorArray.value = shadesArray(props.color)
    }
    else if(props.spectrum == 'tones'){
        colorArray.value = tonesArray(props.color)
    }
})


function tintsArray(clr){
    let i = 0
    let returnArray = []
    const hslaArray = parseToHsla(clr)
    const tintStep = (1 - hslaArray[2])/(props.colorCount)
    while(i < props.colorCount){
        returnArray.push(`hsla(${hslaArray[0]}, ${hslaArray[1]*100}%, ${(hslaArray[2]+(tintStep*i))*100}%, ${hslaArray[3]}`)
        i++
    }
    return returnArray;
}
function shadesArray(clr){
    let i = 0
    let returnArray = []
    const hslaArray = parseToHsla(clr)
    const tintStep = (hslaArray[2])/(props.colorCount)
    while(i < props.colorCount){
        returnArray.push(`hsla(${hslaArray[0]}, ${hslaArray[1]*100}%, ${(hslaArray[2]-(tintStep*i))*100}%, ${hslaArray[3]}`)
        i++
    }
    return returnArray;
}
function tonesArray(clr){
    let i = 0
    let returnArray = []
    const hslaArray = parseToHsla(clr)
    const tintStep = (hslaArray[1])/(props.colorCount)
    while(i < props.colorCount){
        returnArray.push(`hsla(${hslaArray[0]}, ${(hslaArray[1]-(tintStep*i))*100}%, ${hslaArray[2]*100}%, ${hslaArray[3]}`)
        i++
    }
    return returnArray;
}

</script>

<template>
    <div class="colorSpectrum">
        <color-container v-for="color in colorArray" :key="color" :color="color"/>
    </div>
</template>

<style scoped>
</style>