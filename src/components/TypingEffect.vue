<template>
    <div>
        <div class="h-screen w-full  py-2 my-10">
            <div class=" h-full rounded-lg bg-slate-900 flex items-center justify-center">
                <div>
                    <div class="">
                        <p class="mb-2 font-bold text-green-600"> Typing effect 1: single line by css </p>
                        <p id="effect1" class="font-bold font-mono text-4xl">
                            console.log('Hello world')
                        </p>
                    </div>
                    <div class="mt-10">
                        <p class="mb-2 font-bold text-green-600"> Typing effect 2: single line by vue </p>
                        <p id="effect2" class="typingEffect font-bold font-mono text-4xl">
                            {{ typing_text }}
                        </p>
                    </div>
                    <div class="mt-10">
                        <p class="mb-2 font-bold text-green-600"> Typing effect 3: multiple line by vue </p>
                        <p  id="effect3"
                            v-for="(line, index) in typing_text3"
                            :key="index"
                            :style="{color: typingColors[index]}"
                            class="font-bold font-mono text-4xl">
                            {{ line }}
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// effect2 variables
const type_text = "console.log('Hello world')";
const typing_text = ref("");
let isDeleting = false;

// effect3 variables
const type_text3 = [
    "Personal notes, about:",
    "AI",
    "Robotics",
    "Technology"
];
const typing_text3 = ref([]);
let isDeleting3 = false;
let index3 = 0;
const typingColors = reactive([ 
    "#d1d5db",   
    "#7c2d12",
    "#713f12",
    // "#9a3412",
    // "#164e63",
    "#3f6212",
]);


// effect3 function


const multiLineTypeEffect = () =>{
    if(isDeleting3){
        if(index3 == typing_text3.value.length-2){
            typing_text3.value.pop();
        }
        typing_text3.value[index3] = type_text3[index3].substring(0, typing_text3.value[index3].length - 1);
        console.log(index3, typing_text3.value[index3].length);
        let sleep_time = 100;
        if(typing_text3.value[index3].length == 0){
            index3 --;
            sleep_time = 1100; // execute when Line Break
        }
        if(index3 <0){
            isDeleting3 = false;
            index3 ++;
            sleep_time = 1100; // execute when Line Break
        }
        setTimeout(multiLineTypeEffect, sleep_time);

    }else{
        if(typing_text3.value.length == index3){
            typing_text3.value.push("");
        }
        typing_text3.value[index3] += type_text3[index3].charAt(typing_text3.value[index3].length);
        let sleep_time = 100;
        if(typing_text3.value[index3].length == type_text3[index3].length){
            index3 ++;
            sleep_time = 1100; // execute when Line Break
        }
        if(index3 == type_text3.length){
            index3 --;
            isDeleting3 = true;
            sleep_time = 2100; // execute when reverse
        }
        setTimeout(multiLineTypeEffect, sleep_time);
    }

};
multiLineTypeEffect();

// effect2 function
const typeEffect = () => {
    if(isDeleting){
        typing_text.value = type_text.substring(0, typing_text.value.length - 1);
        isDeleting = !(typing_text.value.length == 0);
        if(!isDeleting){
            setTimeout(typeEffect, 100 + 1000);
        }else{
            setTimeout(typeEffect, 100); // execute every 100ms
        }
    }else{
        typing_text.value += type_text.charAt(typing_text.value.length);
        isDeleting = (typing_text.value.length == type_text.length);
        if(isDeleting){
            setTimeout(typeEffect, 100 + 2000);
        }else{
            setTimeout(typeEffect, 100); // execute every 100ms
        }
    }
};
typeEffect();
</script>

<style scoped>
#effect1 {
    width: 0;
    overflow: hidden;
    /* Ensure the text is not visible until the typewriter effect*/
    white-space: nowrap;
    /* Keeps the text on a single line */
    animation: typing 3s steps(30) infinite alternate, blink 1s infinite;
}

#effect2 {
    animation: blink 1s linear infinite;
}

/* The typing animation */
@keyframes typing {
    from {
        width: 0
    }

    to {
        width: 100%
    }
}

@keyframes blink {

    0%,
    45% {
        border-color: transparent;
    }

    50%,
    100% {
        border-color: white;
    }
}</style>