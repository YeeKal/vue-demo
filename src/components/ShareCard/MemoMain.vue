<template>
    <div class="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 my-10">   
        <main class="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-2 sm:mt-4">
            <h1 class="text-center text-2xl font-bold text-slate-900" >Create your delicate memo</h1> 

            <div class="max-w-xl w-full">

                <div class="flex justify-start space-x-3 mb-3 items-center ">
                    <img alt="1 icon" src="~@/assets/1-black.png" width="30" height="30" decoding="async" data-nimg="1" loading="lazy" style="color:transparent">
                    <p class="text-left font-medium text-slate-900">Type memo</p>
                </div>
                <UserInput></UserInput>
                <div class="flex justify-start space-x-3 mb-5 items-center ">
                    <img alt="1 icon" src="~@/assets/2-black.png" width="30" height="30" decoding="async" data-nimg="1" loading="lazy" style="color:transparent">
                    <p class="text-left font-medium text-slate-900">Choose style</p>
                </div>
                <MemoCard></MemoCard>
                <CardOpacityRange></CardOpacityRange>
            <CardBackgradient></CardBackgradient>
            </div>
    </main>
    </div>

</template>
    
<script>
import MemoCard from './MemoCard.vue';
import UserInput from './UserInput.vue';
import CardBackgradient from './CardBackgradient.vue';
import CardOpacityRange from './CardOpacityRange.vue';
import { provide, ref } from 'vue';

export default {
    name: 'MemoMain',
    components: {
        MemoCard,
        UserInput,
        CardBackgradient,
        CardOpacityRange
    },
    setup(){
        const memo_text = ref("");
        const card_background = ref("");
        const opacityRnage = ref(40);
        provide("opacityRnage", opacityRnage);
        provide("memo_text", memo_text);
        provide("card_background", card_background);
        card_background.value="linear-gradient(310deg, rgb(30, 33, 34), rgb(30, 33, 34), rgb(31, 34, 36), rgb(31, 34, 36), rgb(51, 0, 72), rgb(75, 0, 59), rgb(75, 0, 24), rgb(78, 0, 0), rgb(78, 20, 0), rgb(78, 27, 0))";
        

    },
}

</script>