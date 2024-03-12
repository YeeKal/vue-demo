<template>
    <div>
        <p class="text-bold text-gray-900 dark:text-gray-300"> A simple counter</p>
        <button 
            @click="count++"
            class="bg-surface space-x-2 px-4 py-2 rounded-md text-textOnSurface text-md m-2"
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


