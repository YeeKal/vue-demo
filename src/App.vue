<!-- sub-component reference -->
<template> 

  <div>
    <MainTabs>
      <MainTab title="CountButton"> <CountButton/> </MainTab>
      <MainTab title="Memo"><MemoMain/></MainTab>
      <MainTab title="TypingEffect"><TypingEffect/></MainTab>
      <MainTab title="Tab 4">Hello From Tab 4</MainTab>
    </MainTabs>
  </div>
</template>

<script>

import MainTab from './components/MainTab.vue';
import MainTabs from './components/MainTabs.vue';
import CountButton from './components/CountButton.vue';
import MemoMain from './components/ShareCard/MemoMain.vue';
import TypingEffect from './components/TypingEffect.vue';

export default {  
  name: 'App',
  components: {
    MainTab,
    MainTabs,
    CountButton,
    MemoMain,
    TypingEffect
  }
}
</script>

<style>
#app {
  font-family: "Inter var experimental", "Inter var", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
