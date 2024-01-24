<template>
    <div id="container" class="w-full flex items-center justify-center">
        <div id="bbox" class="w-full shadow-[rgba(0,0,15,0.5)_10px_6px_4px_0px]"
        :style="{backgroundImage:card_background}" >
          <div id="textbox"   class="rounded-md text-left bg-slate-900 font-bold text-white"
          :class="opacityUpdate"
          >
            <p>{{memoGenerate}}</p>
          </div>
        </div>

      </div>

</template>

<script>
import { inject, computed } from 'vue';

export default {
    name: 'MmeoCard',
    props: {
        title: {
            type: String,
            default: 'Tab'
        }
    },
    setup(){
        const memo_text = inject("memo_text");
        const card_background = inject("card_background");
        const opacityRnage = inject("opacityRnage");
        const opacityUpdate = computed(() => {
            return "bg-opacity-"+Math.round(opacityRnage.value / 10) * 10;
        });

        const memoGenerate = computed(() => 
        memo_text.value == null || memo_text.value == '' ? '今天的心情是...' : memo_text.value);
        return {
            memoGenerate,
            opacityUpdate,
            card_background,
            opacityRnage
        };
    },
}

</script>

<style>
#container {
  background: #ffffff;
}


#textbox{
  margin: 40px;
  margin-top: 40px;
  padding: 20px;
}
p{
  line-height: 26px;
  letter-spacing: .4px;
  white-space: pre-wrap;
  word-break: break-word;
  color: #c1bcb5;
}
#ex1{
  background-image: linear-gradient(to bottom right, #FF512F, #DD2476);
}
#ex2{
  background-image: linear-gradient(to bottom right, #FF61D2, #FE9090);
}
#ex3{
  background-image: linear-gradient(to bottom right, #72FFB6, #10D164);
}
#ex4{
  background-image: linear-gradient(to bottom right, #FD8451, #FFBD6F);
}
</style>
