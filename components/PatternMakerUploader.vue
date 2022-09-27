<template>
    <div class="fractal-maker__container">
        <!-- <pre class="pre-data pre-crop" v-for="crop in crops">{{ crop.x }} x {{ crop.y }} - {{ crop.divide }}</pre> -->
        <!-- <pre class="pre-data pre-pattern" v-for="pattern in patternSizes">{{ pattern.x }} x {{ pattern.y }}</pre> -->

        <a
            v-on:click="newPattern"
            class="py-1 px-2 m-4 border border-green-500 bg-green-50 hover:bg-green-100 text-green-900 text-lg font-bold rounded block text-center"
            href="#/"
        >New Pattern</a>

        <div class="alert alert-success" v-if="hasSaved">Pattern Saved</div>

        <div
            :class="{'brand-maker__preview-mode': !this.save}"
            ref="container"
            style="display:none"
        >
            <div ref="sketch" class="sketch-canvas" style></div>
        </div>

        <img
            id="fullscreenimg"
            v-if="frames.length > 0"
            :src="latestFrame.src"
            alt="loading"
            class="image-output"
            name="something.jpeg"
        />
        <div v-for="(frame, index) in frames" :key="index" :frame="frame" class="mb-5" v-if="false">
            <img :src="frame.src" alt="loading" class="image-output" name="something.jpeg" />
            <pre class="pre-data">{{ md5(frame.src) }}</pre>
            <pre class="pre-data">{{ frame.x }} x {{ frame.y }}</pre>
        </div>

        <!-- <pre class="pre-data" id="encoded_output">{{ s3Outputs }}</pre> -->
        <!-- <pre class="pre-data" id="encoded_output">{{ JSON.stringify(design, undefined, 4) }}</pre> -->

        <!--        <img v-for="frame in frames" :src="frame.src" alt="loading" class="image-output">-->
        <!--        <img v-for="crop in crops" :src="crop.src" alt="loading" class="image-output">-->
        <!-- <a
            class="d-block"
            v-for="(crop, index) in crops"
            :key="index"
            v-if="typeof crop.form === 'object'"
            :href="crop.form.url"
        >{{ typeof crop.form.done === 'boolean' && crop.form.done ? 'Done -' : '' }} {{crop.form.url}}</a>-->
        <!--        <img :src="imageData" alt="loading" class="image-output">-->

        <!--        <div class="pre-overlay">-->
        <!--            <div class="color-sheme">-->
        <!--                <div class="color" v-for="(color,index) in colors" v-bind:style="{backgroundColor: '#' + color}">{{ index-->
        <!--                    }}-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->

        <!--                <pre class="pre-overlay" v-on:click="toggleLoop()">{{ JSON.stringify(notes) }}</pre>-->
        <!--        <pre style="white-space:pre-line; word-break:break-all;">{{ JSON.stringify(this.design) }}</pre>-->
        <!--        <pre class="pre-overlay">{{ JSON.stringify(design, null, 2) }}</pre>-->
        <!--        <pre class="pre-overlay">{{ design.blendMode }}, {{ design.colorScheme }}, {{ design.colorMode }}, {{ noFill }}</pre>-->
    </div>
</template>

<style scoped>
canvas {
    display: none;
}

.pre-data {
    background: rgb(50, 50, 50);
    color: rgb(200, 200, 200);
    padding: 5px;
    display: block;
    text-align: center;
    font-size: 1.5em;
    margin: 0;
}

.pre-crop {
    background: rgb(50, 100, 50);
}

.pre-pattern {
    background: rgb(50, 50, 100);
}

.sketch-canvas {
    position: relative;
    background: white;
    display: none;
}

.image-output {
    width: 100%;
    height: auto;
    /*margin-bottom: 20px;*/
}
</style>

<script>
import fontList from "~/assets/data/fonts";

import BackgroundLayerVue from "./mixins/BackgroundLayer.vue";
import BigMotifLayerVue from "./mixins/art-maker/BigMotifLayer.vue";
import CanvasDrawingHelpersVue from "./mixins/CanvasDrawingHelpers.vue";
import CanvasSizeVue from "./mixins/pattern-maker-uploader/CanvasSize.vue";
import CanvasTileVue from "./mixins/pattern-maker-uploader/CanvasTile.vue";
import CanvasToImageVue from "./mixins/pattern-maker-uploader/CanvasToImage.vue";
import CropsUploaderVue from "./mixins/pattern-maker-uploader/CropsUploader.vue";
import ColoursVue from "./mixins/Colours.vue";
import CropSketchVue from "./mixins/CropSketch.vue";
import DesignGeneratorVue from "./mixins/DesignGenerator.vue";
import DotsLayerVue from "./mixins/pattern-maker-uploader/DotsLayer.vue";
import EncodedDesignVue from "./mixins/EncodedDesign.vue";
import FiltersVue from "./mixins/Filters.vue";
import HelpersVue from "./mixins/Helpers.vue";
import IsWhiteVue from "./mixins/pattern-maker-uploader/IsWhite.vue";
import MirrorizeSketchVue from "./mixins/pattern-maker-uploader/MirrorizeSketch.vue";
import MotifLayersVue from "./mixins/pattern-maker-uploader/MotifLayers.vue";
import PatternDevVue from "./mixins/pattern-maker-uploader/PatternDev.vue";
import P5JsLoaderVue from "./mixins/P5JsLoader.vue";
import RandomNumbersVue from "./mixins/RandomNumbers.vue";
import SketchCachingVue from "./mixins/pattern-maker-uploader/SketchCaching.vue";

export default {
    props: {
        // fonts: { type: Array, default: fontList },
        save: { type: Boolean, default: false },
        background: { type: String, default: "" },
        storeroute: { type: String, default: "" },
        version: { type: String, default: "5" },
        artImageBackground: { type: String, default: "/art/1.jpg" },
        crops: {
            type: Array,
            default: () => {
                return [
                    {
                        x: 1500,
                        y: 1500,
                        divide: 12,
                    },
                ];
            },
        },
        encoded_design: { type: String, default: "" },
        downsize_x: { type: Number, default: null },
    },

    mixins: [
        BackgroundLayerVue,
        BigMotifLayerVue,
        CanvasDrawingHelpersVue,
        CanvasSizeVue,
        CanvasTileVue,
        CanvasToImageVue,
        CropsUploaderVue,
        ColoursVue,
        CropSketchVue,
        DesignGeneratorVue,
        DotsLayerVue,
        EncodedDesignVue,
        FiltersVue,
        HelpersVue,
        IsWhiteVue,
        MirrorizeSketchVue,
        MotifLayersVue,
        PatternDevVue,
        P5JsLoaderVue,
        RandomNumbersVue,
        SketchCachingVue,
    ],

    data() {
        let data = {
            fonts: fontList,
            frameDivide: 12,
            frameIteration: 0,
            cropIteration: 0,
            currentCrop: {},
            frames: [],
            imageData: "",
            loop: false,
            notes: [],
            p5: null,
            ctx: null,
            sketch: null,
            p5LoadedBackgroundImage: null,
            p5LoadedFont: null,
            colors: [],
            fontCharString: "",
            hasSaved: false, // has saved design to server
            blendMode: null,
            motifIteration: 0,
            borderMotif: false, // dev for drawing box around meta motifs
            layer: {},
            design: {},
            settings: {
                colorSchemes: [
                    "contrast",
                    "triade",
                    "tetrade",
                    "analogic",
                    "monochromatic",
                ],
                colorModes: [
                    // 'default',
                    "pastel",
                    "soft",
                    "light",
                    // 'hard',
                    "pale",
                ],
                backgroundColorSchemes: [
                    // 'contrast',
                    // 'triade',
                    // 'tetrade',
                    // 'analogic',
                    "monochromatic",
                ],
                backgroundColorModes: [
                    // 'default',
                    "pastel",
                    "soft",
                    "light",
                    // 'hard',
                    "pale",
                ],
                filters: [],

                strokeWeights: ["normal", "bold"],
                textStyles: ["normal", "italic"],
                useFilters: false,
                // useFilters: true,
                rng: {
                    minLayerCount: 4,
                    maxLayerCount: 9,

                    drawBigMotif: true,

                    minColorColumn: 2,
                    maxColorColumn: 5,
                    minFontSize: 40,
                    maxFontSize: 250,
                    minElTranslate: 0,
                    maxElTranslate: 70,
                    minTranslate: -30,
                    maxTranslate: 20,
                    minLayerTranslate: -30,
                    maxLayerTranslate: 20,
                    minMotifPieces: 2,
                    maxMotifPieces: 7,
                    minMotifRepeatLimit: 1,
                    maxMotifRepeatLimit: 1,
                    minPatternRows: 1,
                    maxPatternRows: 5,
                    minPatternCols: 1,
                    maxPatternCols: 5,
                    minPatternColorCount: 5,
                    maxPatternColorCount: 10,
                    minPatternExclude: 0,
                    maxPatternExclude: 6,
                    minHueCount: 1,
                    maxHueCount: 3,

                    drawLayerMirrorsRotated: true,
                    drawLayerMirrorsStraight: true,
                    // drawLayerMirrorsRotated: false,
                    // drawLayerMirrorsStraight: false,
                    layerMirrorsMin: 0,
                    layerMirrorsMax: 2,
                },
                blendModes: [],
                strokeCaps: [],
            },
            loadedFromJson: false,
            logged: false,
            noFill: "no",
            onlyBackground: false,
            canvasWidth: 100,
            canvasHeight: 100,
            patternSizes: [],
            sketches: [],
            s3Outputs: "fail",
        };

        data = this.restoreDataDesign(data);

        return data;
    },
    mounted() {
        this.notReadyForScreenshot();

        if (!this.loadedFromJson) {
            // if this is a new design then pick a new random font
            this.design.font = this.arrayRandom(this.fonts);
        }

        this.setCurrentCrop();
        // this.currentCrop = this.crops[this.cropIteration];

        console.log(this.patternSizes);

        // this.setCanvasWidthHeight();
        // console.log(this.patternSizes);

        this.loadP5js();
    },
    computed: {
        latestFrame() {
            return this.frames[this.frames.length - 1];
        },
        // s3Outputs() {
        //
        //     if (this.crops.length === 0) {
        //         if (this.hasSaved) {
        //             return 'success';
        //         } else {
        //             return 'fail';
        //
        //         }
        //     }
        //
        //     let outputs = [];
        //
        //     for (let crop of this.crops) {
        //         outputs.push(crop.form.url);
        //     }
        //
        //     return JSON.stringify(outputs, null, 2);
        //
        // },
    },
    methods: {
        setS3Outputs() {
            let outputs = [];

            for (let crop of this.crops) {
                if (
                    typeof crop.form === "object" &&
                    typeof crop.form.url === "string"
                ) {
                    outputs.push(crop.form.url);
                }
            }

            this.s3Outputs = JSON.stringify(outputs, null, 2);
        },

        p5Draw() {
            this.setCanvasWidthHeight();

            this.sketch.push();
            //
            const foregroundSlice = 0.2;
            //
            // this.foregroundPattern = this.imageToTile(this.p5LoadedArtImageBackground, foregroundSlice, foregroundSlice);
            // // this.logSketchFrame(this.foregroundPattern);
            // this.foregroundPattern = this.tileUpSketch(this.foregroundPattern);
            // console.log('this.foregroundPattern.width < this.sketch.width', this.foregroundPattern.width , this.sketch.width)
            // while ((this.foregroundPattern.width < this.sketch.width) || (this.foregroundPattern.height < this.sketch.height)) {
            //     this.foregroundPattern = this.tileUpSketch(this.foregroundPattern);
            // }
            //
            // this.logSketchFrame(this.foregroundPattern);
            //
            // this.sketch.pop();
            // return;

            this.sketch.resizeCanvas(this.canvasWidth, this.canvasHeight, true);
            // this.sketch.resizeCanvas(this.canvasWidth * this.frameDivide, this.canvasHeight * this.frameDivide, true);

            let drawStart = window.performance.now();

            // Rest canvas, generate design json and move to center.
            this.resetCanvas();

            if (this.save) {
                this.s3Outputs = "success";
                if (!this.hasSaved) {
                    window.axios
                        .post(this.storeDesignUrl, {
                            design_id: this.design.background,
                            encoded_design: this.getEncodedDesign(),
                        })
                        .then((response) => {
                            this.hasSaved = true;
                            this.readyForScreenshot();
                            // $.holdReady(true);
                        });
                }
                return;
            }

            this.setS3Outputs();

            let start = 0;
            let end = 0;

            start = window.performance.now();

            // Draw initial coloured background
            this.sketch.push();
            this.moveToCenter();
            this.drawBaseBackgroundLayer();
            this.sketch.pop();

            end = window.performance.now();

            console.log("drawing background", parseInt(end - start));

            // let bigMotif = this.makeBigMotifLayer(this.design.bigMotifLayer);
            //
            this.logSketchFrame(this.sketch);
            // this.logSketchFrame(bigMotif);
            // return;

            start = window.performance.now();
            // Mirrorize the background
            this.sketch.push();

            console.log("VERSION", this.design.version);

            // this.drawBackgroundMirrors();

            this.sketch.pop();

            // return;

            end = window.performance.now();
            console.log("drawing background mirrors", parseInt(end - start));

            // Stop here if we only want the background.
            if (this.onlyBackground) {
                return;
            }

            // Prepare to draw layers
            this.sketch.push();
            this.moveToCenter();

            // Draw each layer
            for (let l = 0; l < this.design.layers.length; l++) {
                start = window.performance.now();
                this.drawLayer(l);
                end = window.performance.now();
                console.log("drawing layer " + l, parseInt(end - start));
                this.logSketchFrame(this.sketch);
            }

            // this.sketch.translate(-(this.sketch.width / 2), -(this.sketch.height / 2));
            this.sketch.pop();

            // big motif
            if (this.settings.rng.drawBigMotif) {
                this.drawBigMotifLayer();
            }

            start = window.performance.now();
            // Mirror the final canvas into a repeat pattern.
            this.drawMirrors();
            end = window.performance.now();
            console.log("drawing mirrors ", parseInt(end - start));

            start = window.performance.now();
            // Draw the final dots layer
            this.drawDots();
            end = window.performance.now();
            console.log("drawing dots ", parseInt(end - start));

            start = window.performance.now();
            this.scaleUpToCropSize();
            end = window.performance.now();
            console.log("doubling up ", parseInt(end - start));

            this.tileUp();
            this.frameIteration++;
            this.patternSizes.push({
                x: this.sketch.width,
                y: this.sketch.height,
            });

            this.fixExactCanvasSize();

            // THIS WILL MAKE IT ASYMETRICAL
            // this.tileUp();
            this.tileAndRotate();

            let drawEnd = window.performance.now();

            console.log("total draw time ", parseInt(drawEnd - drawStart));

            this.downsizeSketchToUrl(this.sketch);

            start = window.performance.now();
            this.determineIsWhite();
            end = window.performance.now();
            console.log("determineIsWhite timer ", parseInt(end - start));

            // const foregroundSlice = 0.2;

            // this.foregroundPattern = this.imageToTile(
            //     this.p5LoadedArtImageBackground,
            //     foregroundSlice,
            //     foregroundSlice
            // );

            this.foregroundPattern = this.imageToTile(
                this.sketch.get(),
                foregroundSlice,
                foregroundSlice
            );

            // this.logSketchFrame(this.foregroundPattern);
            this.foregroundPattern = this.tileUpSketch(this.foregroundPattern);
            console.log(
                "this.foregroundPattern.width < this.sketch.width",
                this.foregroundPattern.width,
                this.sketch.width
            );

            console.log(
                "this.foregroundPattern.height < this.sketch.height",
                this.foregroundPattern.height,
                this.sketch.height
            );
            while (
                this.foregroundPattern.width < this.sketch.width ||
                this.foregroundPattern.height < this.sketch.height
            ) {
                console.log(
                    "this.foregroundPattern.width < this.sketch.width",
                    this.foregroundPattern.width,
                    this.sketch.width
                );

                console.log(
                    "this.foregroundPattern.height < this.sketch.height",
                    this.foregroundPattern.height,
                    this.sketch.height
                );
                this.foregroundPattern = this.tileUpSketch(
                    this.foregroundPattern
                );
            }

            // this.logSketchFrame(this.foregroundPattern);

            // // this blends
            // this.sketch.blendMode(this.sketch.BLEND);
            // this.sketch.tint(360, 0.2);
            // this.sketch.image(this.foregroundPattern.get(), 0, 0);

            // this.logSketchFrame(this.sketch);

            this.drawBigMotifLayer();

            this.downsizeSketchToUrl(this.sketch);
            //
            // this.tileUp();
            while (this.cropIteration < this.crops.length - 1) {
                this.iterateCrop();
                this.setCurrentCrop();
                this.frameIteration = 0;
                this.tileAndCrop();
            }

            this.sketch.pop();
            // this.downsizeSketchToUrl(this.sketch);

            // this.sketch = this.resizeSketchToWidth(this.sketch, 1920);
            // this.logSketchFrame(this.sketch);

            // this.storeIsWhite().then(() => {
            //     this.uploadCrops().then(() => {
            //         console.log("completed uploading all");
            //         this.readyForScreenshot();
            //     });
            // });
        },

        downsizeSketchToUrl(sketch) {
            let start = window.performance.now();

            let downsize_x = 1;

            if (this.downsize_x > 1) {
                downsize_x = this.downsize_x;
            } else {
                downsize_x = sketch.width;
            }

            let ratio = downsize_x / sketch.width;

            let newHeight = Math.floor(this.currentCrop.y * ratio);

            let newCanvas = this.getDownsizeSketch(downsize_x, newHeight);

            newCanvas.translate(newCanvas.width / 2, newCanvas.height / 2);

            console.log("DOWNSIZE", newCanvas.width, newCanvas.height);

            newCanvas.image(
                sketch.get(),
                0,
                0,
                newCanvas.width,
                newCanvas.height
            );

            this.currentCrop.src = newCanvas.canvas.toDataURL(
                "image/jpeg",
                0.97
            );

            this.frames.push({
                src: this.currentCrop.src,
                x: newCanvas.width,
                y: newCanvas.height,
            });

            newCanvas = null;

            let end = window.performance.now();
            console.log("downsizeSketchToUrl timer ", parseInt(end - start));
        },

        tileAndCrop() {
            let newSketch = this.createSketch(
                this.currentCrop.x,
                this.currentCrop.y
            );

            newSketch.translate(newSketch.width / 2, newSketch.height / 2);

            while (
                newSketch.width > this.sketch.width ||
                newSketch.height > this.sketch.height
            ) {
                this.tileUp();
            }

            newSketch.image(this.sketch.get(), 0, 0);

            this.downsizeSketchToUrl(newSketch);

            newSketch = null;
        },

        resizeSketchToWidth(sketch, resizeWidth) {
            let start = window.performance.now();

            let ratio = resizeWidth / sketch.width;

            let newHeight = Math.floor(this.currentCrop.y * ratio);

            let newCanvas = this.getDownsizeSketch(resizeWidth, newHeight);

            newCanvas.translate(newCanvas.width / 2, newCanvas.height / 2);

            console.log("DOWNSIZE", newCanvas.width, newCanvas.height);

            newCanvas.image(
                sketch.get(),
                0,
                0,
                newCanvas.width,
                newCanvas.height
            );

            this.currentCrop.src = newCanvas.canvas.toDataURL(
                "image/jpeg",
                0.97
            );

            this.frames.push({
                src: this.currentCrop.src,
                x: newCanvas.width,
                y: newCanvas.height,
            });

            // newCanvas = null;

            let end = window.performance.now();
            console.log("downsizeSketchToUrl timer ", parseInt(end - start));
            return newCanvas;
        },

        tileUpSketch(sketch) {
            sketch.imageMode(sketch.CORNER);
            let canvas = sketch.get();
            let width = sketch.width;
            let height = sketch.height;

            sketch.resizeCanvas(
                Math.floor(width * 2),
                Math.floor(height * 2),
                true
            );
            sketch.push();

            // drop top left image
            sketch.image(canvas, 0, 0);

            // Draw top right image
            sketch.translate(width * 2, 0);
            sketch.push();
            sketch.scale(-1, 1);
            sketch.image(canvas, 0, 0);
            sketch.pop();

            // draw bottom left image
            sketch.translate(-(width * 2), height * 2);
            sketch.push();
            sketch.scale(1, -1);
            sketch.image(canvas, 0, 0);
            sketch.pop();

            // draw bottom right image
            sketch.translate(width * 2, 0);
            sketch.scale(-1, -1);
            sketch.image(canvas, 0, 0);

            sketch.pop();
            sketch.imageMode(sketch.CENTER);
            return sketch;
        },

        imageToTile(image, tileSizeW, tileSizeH) {
            const sketch = this.createSketch(image.width, image.height);
            sketch.imageMode(this.sketch.CENTER);
            sketch.push();
            sketch.image(image, sketch.width / 2, sketch.height / 2);
            sketch.pop();
            // this.resizeSketchToWidth(sketch, this.canvasWidth * 0.2);
            sketch.imageMode(this.sketch.CORNER);
            this.tileUpSketch(sketch);
            image = sketch;

            let tileW = image.width * tileSizeW;
            let tileH = image.height * tileSizeH;

            tileH = tileW;
            // if (tileW > (tileH * 1.1)) {
            //     tileW = tileH;
            // }
            // if (tileH > (tileW * 1.1)) {
            //     tileH = tileW;
            // }
            tileW = Math.floor(tileW);
            tileH = Math.floor(tileH);

            let pattern = this.createSketch(tileW, tileH);
            const sx = this.randomInteger(0, image.width - pattern.width);
            const sy = this.randomInteger(0, image.height - pattern.height);

            pattern.imageMode(this.sketch.CORNER);
            pattern.push();
            pattern.translate(pattern.width / 2, pattern.height / 2);
            pattern.imageMode(this.sketch.CENTER);

            const sourceRotate = this.randomHue();
            pattern.rotate(sourceRotate);

            let tileDiagonal = Math.floor(
                Math.sqrt(tileW * tileW + tileH * tileH)
            );
            const tileScale = this.helperCover(
                tileW,
                tileH,
                tileDiagonal,
                tileDiagonal
            );

            pattern.image(
                image,
                0,
                0,
                Math.floor(tileScale.width),
                Math.floor(tileScale.height),
                sx,
                sy,
                pattern.width,
                pattern.height
            );
            pattern.pop();

            this.logSketchFrame(pattern);

            pattern = this.tileUpSketch(pattern);

            return pattern;
        },
        logSketchFrame(sketch) {
            return;
            this.frames.push({
                src: sketch.canvas.toDataURL("image/jpeg", 0.97),
                x: sketch.width,
                y: sketch.height,
            });
            if (this.frames.length > 1) {
                this.frames.shift();
            }
        },
    }, // end of methods
};
</script>
