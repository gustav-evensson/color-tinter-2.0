<script setup>
const props = defineProps({
    color: String
})
</script>

<template>
    <div class="colorContainer" :style="{backgroundColor: props.color}">
        <div class="colorActions">
            
        </div>
    </div>
</template>
