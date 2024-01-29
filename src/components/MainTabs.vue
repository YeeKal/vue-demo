<template>
    <div>
        <div class="flex items-center justify-center">
            <ul class="flex space-x-2">
                <li v-for="(tab, i) of tabs" :key="tab.title" @click="selectTab(i)" :class="
                    active_index === i 
                        ? 'bg-white text-green-700 border-green-700 border-2 hover:text-green-900' 
                        :  'bg-white text-gray-600 hover:text-gray-900' 
                    "
                    class="flex items-center  font-medium px-6 py-3 rounded-md rounded-tr-md overflow-hidden cursor-pointer ">
                    {{ tab.props.title }}
                </li>
            </ul>
        </div>
        <div class="bg-gray-300 h-1 mt-1"></div>
        <div class="mt-6">
            <slot />
        </div>
    </div>
</template>
  
<script>
import { provide, ref } from 'vue';
export default {
    setup() {
        const tabs = ref([]);
        const active_index = ref(2);
        provide("tabsState", {
            active_index,
            tabs,
        });
        function selectTab(i) {
            active_index.value = i;
        }
        return {
            tabs,
            selectTab,
            active_index
        }

    },
}
</script>
  