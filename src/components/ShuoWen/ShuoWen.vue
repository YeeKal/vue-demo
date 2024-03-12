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

export default {
    setup() {
        const text = ref("也");
        const svgHtml = ref("");
        const textList = ref("我文子中学十步一人");
        const svgHtmlList = ref([]);
        const url_base = "http://baozi.yeekal.store/shuowen/?q=";

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

        function generateSingleSVG(font_key, svgHtml) {
            svgHtml.value = "";

            if(!font_key || font_key.length > 1){
                return null;
            }

            try {
                axios.post(url_base+font_key)
                .then(response => {
                    if(response.status != 200){
                        return;
                    }
                    const data = response.data;

                    if(!("res" in data) || data.res.length == 0){
                        return;
                    }
                    console.log(response);
                    svgHtml.value = removesvgFill(data.res[0].image_path);
                    return ;
                    
                    // return response.data;
                })
            } catch (error) {
                console.error(error);
            }
            
            //  read svg from ttf font
            // console.log("generateSVG");
            // if (!font || !svg_text) {
            //     console.log("font or svg_text is null");
            //     return null;
            // }

            // const glyph = font.charToGlyph(svg_text);
            // if (glyph.unicode == undefined) {
            //     console.log("cannot find glyph for", svg_text);
            //     return null;
            // }
            // const path = glyph.getPath(0, 50, 72); // x, y, fontSize
            // const bbox = path.getBoundingBox();
            // const svgWidth = Math.floor(bbox.x2 - bbox.x1) + 1;
            // const svgHeight = Math.floor(bbox.y2 - bbox.y1) + 1;
            // const svgPathData = path.toSVG();

            // // style="width:100%;height:100%;"  make svg fill the parent container
            // return `<svg xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;"  viewBox="${bbox.x1} ${bbox.y1} ${svgWidth} ${svgHeight}">${svgPathData}</svg>`;
        }

        function generateSVGList() {
            for (var i = 0; i < textList.value.length; i++) {
                const font_key = textList.value[i];
                axios.post(url_base+font_key)
                .then(response => {
                    if(response.status != 200){
                        return;
                    }
                    const data = response.data;

                    if(!("res" in data) || data.res.length == 0){
                        return;
                    }

                    svgHtmlList.value.push({
                        svg: removesvgFill(data.res[0].image_path),
                        letter: font_key
                    });
 
                })
            }
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