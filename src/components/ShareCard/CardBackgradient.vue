<template>
    <div class="mt-2">
        <div class="grid grid-cols-4 gap-2">
            <div class="w-full shadow-lg aspect-w-1 aspect-h-1 rounded-xl  h-16 hover:shadow-[rgba(0,0,15,0.5)_4px_4px_4px_0px]"
                v-for="(color,index) in backgroundGradientColors"
                :key="index"
                :style="{backgroundImage: color}"
                @click="card_background= color"
            >

            </div>
        </div>
        
    </div>

</template>

<script setup>
import {reactive, inject} from 'vue';

const backgroundGradientColors = reactive([    
    "linear-gradient(310deg, rgb(30, 33, 34), rgb(30, 33, 34), rgb(31, 34, 36), rgb(31, 34, 36), rgb(51, 0, 72), rgb(75, 0, 59), rgb(75, 0, 24), rgb(78, 0, 0), rgb(78, 20, 0), rgb(78, 27, 0))",
    "linear-gradient(to top, rgb(9, 32, 63) 0%, rgb(83, 120, 149) 100%)",
    "linear-gradient(111.1deg, rgb(0, 40, 70) -4.8%, rgb(255, 115, 115) 82.7%, rgb(255, 175, 123) 97.2%)",
    "linear-gradient(118.4deg, rgb(122, 35, 52) 27.5%, rgb(62, 9, 27) 92.7%)",
    "linear-gradient(135.8deg, rgb(26, 26, 29) 27.1%, rgb(111, 34, 50) 77.5%)",
    "linear-gradient(105.2deg, rgb(255, 78, 78) 11.2%, rgb(253, 176, 71) 117.9%)",
    "linear-gradient(111.4deg, rgb(55, 168, 192) -0.2%, rgb(103, 187, 125) 100.2%)",
    "linear-gradient(109.6deg, rgb(84, 13, 110) 11.2%, rgb(238, 66, 102) 100.2%)"
]);
const card_background = inject("card_background");
if(card_background == null || card_background == ''){
    card_background.value = backgroundGradientColors[0];
}

</script>