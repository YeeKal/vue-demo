<template>
    <textarea name="memo" 
        @input="updateMemo($event)" 
        placeholder="输入今日心情..."
        class="w-full shadow-sm border-slate-200 border space-x-2 px-4 py-2 my-2 rounded-md text-slate-900 text-md min-h-32"
    ></textarea>
</template>

<script>
import { inject } from 'vue';
export default {
    name: 'UserInput',
    setup(){
        const memo_text = inject("memo_text");

        function updateMemo(event){
            memo_text.value = event.target.value;
        }
        return {
            updateMemo,
        };
        
    },
}
</script>