<template>
    <div>
        <p> A simple counter</p>
        <button 
            @click="count++"
            class="bg-slate-900 space-x-2 px-4 py-2 rounded-md text-slate-400 text-md"
        >Click me:{{ count }}</button>
    </div>
</template>

<script>
import {ref} from 'vue';
export default {
    setup() {
        const count = ref(0);
        return {count};
    },
};
</script>


