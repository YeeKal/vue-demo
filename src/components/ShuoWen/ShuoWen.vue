<template>
    <div class="w-full h-full flex  justify-center" style="background-color: #1a1a1a;">
        <div class="mt-5 w-full mx-10">
            <div class="max-w-96  mx-auto">
                <input type="text" @input="updateQuery($event)" placeholder="说文解字..."
                    class="w-full  bg-zinc-600 space-x-2 px-4 py-2 my-2 rounded-md text-zinc-300 text-md" />
            </div>
            <div class="my-5 mx-auto  w-48 min-w-48 h-60" v-html="svgHtml" style="color: #2c3e50">
            </div>
            <div class="grid gap-6 grid-cols-4 md:grid-cols-6 max-w-4xl min-w-96 mx-auto">
                <div class="flex flex-col p-2 hover:opacity-85 text-white opacity-65 bg-surface" 
                    v-for="(svgContent, index) in svgHtmlList" :key="index">
                    <div class="flex-1" v-html="svgContent.svg">
                    </div>
                    <div class="mt-1 flex-none font-mono text-xs">{{svgContent.letter}}</div>

                </div>

            </div>
        </div>
    </div>
</template>

import { Loading } from 'element-plus/es/components/loading/src/service';

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
// 创建一个 Axios 实例并配置 withCredentials
const instance = axios.create({
  withCredentials: true
});

export default {
    setup() {
        const text = ref("也");
        const svgHtml = ref("");
        const textList = ref("我文子中学十步一人");
        const svgHtmlList = ref([]);
        const url_base = "https://baozi.yeekal.store/shuowen/?q=";

        function updateQuery(event) {
            text.value = event.target.value;
            generateSVG();
        }
        function generateSVG() {
            generateSingleSVG(text.value, svgHtml);
        }

        function removesvgFill(svg_str){
            const parser = new DOMParser();
            const doc = parser.parseFromString(svg_str, "image/svg+xml");
            const paths = doc.querySelectorAll('path');
            
            // set another color
            paths.forEach(function(path) {
                path.setAttribute('fill', 'blue');
                path.setAttribute('stroke', 'red');
            });

            // remove attribute
            paths.forEach(function(path) {
                path.removeAttribute('fill');
                path.removeAttribute('stroke');
            });

            return new XMLSerializer().serializeToString(doc.documentElement);
        }

        async function fetchSvgImage(font_key){
            try {
                const response = await instance.post(url_base+font_key);
                if(response.status != 200 || !response.data){
                    return;
                }
                const data = response.data;

                if(!("res" in data) || data.res.length == 0){
                    return null;
                }
                return data.res;
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        async function generateSingleSVG(font_key, svgHtml) {
            svgHtml.value = "";

            if(!font_key){
                return null;
            }
            if(font_key.length > 1){
                font_key = font_key[0];
            }

            const img_res = await fetchSvgImage(font_key);
            if (!img_res) {
                return;
            }
            svgHtml.value = removesvgFill(img_res[0].image_path);
        }

        async function generateSVGList() {
            const charArray = Array.from(textList.value);
            const promises = charArray.map(async (font_key) => {
                const img_res = await fetchSvgImage(font_key);
                if (!img_res) {
                    return null;
                }
                return {
                    svg: removesvgFill(img_res[0].image_path),
                    letter: font_key
                };
            });

            // Promise.all() 来并发地处理所有的请求
            const results = await Promise.all(promises);
            svgHtmlList.value = results.filter(result => result !== null);
        }

        onMounted(() => {
            generateSVG();
            generateSVGList();
        });
        return {
            text,
            generateSVG,
            svgHtml,
            updateQuery,
            svgHtmlList
        }
    },
}


</script>

<style>
svg {
    fill: currentColor;
}
</style>