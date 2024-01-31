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

                <div class="p-2 hover:bg-gray-400 text-white opacity-65" style="background-color: #242424;"
                    v-for="(svgContent, index) in svgHtmlList" :key="index" v-html="svgContent"></div>

            </div>
        </div>
    </div>
</template>

import { Loading } from 'element-plus/es/components/loading/src/service';

<script>
import opentype from 'opentype.js';
import { onMounted, ref } from 'vue';

export default {
    setup() {
        var font = null;
        const text = ref("也");
        const svgHtml = ref("");
        const textList = ref("我文子中学十步一人");
        const svgHtmlList = ref([]);

        function updateQuery(event) {
            text.value = event.target.value;
            generateSVG();
        }
        function generateSVG() {
            const svgContent = generateSingleSVG(text.value);
            if (svgContent) {
                svgHtml.value = svgContent;
            }
        }

        function generateSingleSVG(svg_text) {
            console.log("generateSVG");
            if (!font || !svg_text) {
                console.log("font or svg_text is null");
                return null;
            }

            const glyph = font.charToGlyph(svg_text);
            if(glyph.unicode == undefined){
                console.log("cannot find glyph for", svg_text);
                return null;
            }
            const path = glyph.getPath(0, 50, 72); // x, y, fontSize
            const bbox = path.getBoundingBox();
            const svgWidth = Math.floor(bbox.x2 - bbox.x1) + 1;
            const svgHeight = Math.floor(bbox.y2 - bbox.y1) + 1;
            const svgPathData = path.toSVG();

            // style="width:100%;height:100%;"  make svg fill the parent container
            return `<svg xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;"  viewBox="${bbox.x1} ${bbox.y1} ${svgWidth} ${svgHeight}">${svgPathData}</svg>`;
        }

        function generateSVGList() {
            for (var i = 0; i < textList.value.length; i++) {
                svgHtmlList.value.push(generateSingleSVG(textList.value[i]));
            }
        }

        onMounted(() => {
            let fontPath = require("@/assets/ebas927.ttf");
            console.log("ha1");
            opentype.load(fontPath, (err, font_content) => {
                console.log("ha2");  // will be execute later , why?
                if (err) {
                    console.error('Font could not be loaded: ' + err);
                } else {
                    console.log("load font success");
                    font = font_content;
                    generateSVG();
                    generateSVGList();
                }
            }
            );
            console.log("ha3");

            console.log('onMounted');
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