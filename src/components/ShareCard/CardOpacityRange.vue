<template>
<div class="mt-4 flex items-center">
    <label class="block mx-4  text-lg font-bold text-slate-600 ">Opacity range</label>
    <input type="range"
        min="0"
        max="100" 
        class="flex-1 "
        v-model="opacityRnage"
    />
</div>
</template>

<script setup>
import { inject } from 'vue';
const opacityRnage = inject("opacityRnage");
</script>