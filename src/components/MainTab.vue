<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
  import {inject, getCurrentInstance, watchEffect, computed } from 'vue';
  export default {
    props: {
      title: {
        type: String,
        default: 'Tab'
      }
    },
    setup(){
      const instance = getCurrentInstance();
      const tabsState = inject("tabsState");
      const tabs = tabsState.tabs;
      const active_index = tabsState.active_index;
      // const index = computed(() => tabs.value.indexOf(instance));
      const index = computed(() => tabs.value.findIndex((target) => target.uid === instance.uid));
      const isActive = computed(() => index.value === active_index.value);
      watchEffect(() =>{
        if(index.value === -1){
          tabs.value.push(instance);
        }
      });
      return {
            isActive,
      };
    },
  }
</script>