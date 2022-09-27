<script>
import p5 from "p5";
export default {
    // mounted() {
    //     this.loadP5js();
    // },

    methods: {
        loadP5js() {
            // window.p5 = require('p5');

            // Custom method to apply a mask to a createGraphics
            p5.Graphics.prototype.mask = function (inputMask) {
                if (inputMask === undefined) {
                    inputMask = this;
                }
                const currBlend = this.drawingContext.globalCompositeOperation;

                let scaleFactor = 1;
                if (inputMask instanceof p5.Renderer) {
                    scaleFactor = inputMask._pInst._pixelDensity;
                }

                const copyArgs = [
                    inputMask,
                    0,
                    0,
                    scaleFactor * inputMask.width,
                    scaleFactor * inputMask.height,
                    0,
                    0,
                    this.width,
                    this.height,
                ];

                this.drawingContext.globalCompositeOperation = "destination-in";
                p5.Renderer2D.prototype.copy.apply(this, copyArgs);
                this.drawingContext.globalCompositeOperation = currBlend;
            };

            this.launchP5();
        },

        launchP5() {
            console.log("LAUNCHING p5");
            new p5((sketch) => {
                sketch.preload = () => {
                    this.sketch = sketch;
                    this.p5Preload();
                };
                sketch.setup = () => {
                    this.sketch = sketch;
                    this.p5Setup();
                };
                sketch.draw = () => {
                    this.sketch = sketch;
                    this.p5Draw();
                };
            }, this.$refs.sketch);
        },

        p5Preload() {
            this.p5LoadedFont = this.sketch.loadFont(
                "/fonts/ttf/" + this.design.font
            );

            if (this.artImageBackground) {
                this.p5LoadedArtImageBackground = this.sketch.loadImage(
                    this.artImageBackground
                );
            }
        },

        createSketch(w, h) {
            let sketch = this.sketch.createGraphics(w, h, this.sketch.P2D);
            sketch = this.prepareSketch(sketch);
            sketch.clear();
            sketch.colorMode(this.sketch.RGB);
            sketch.background("rgba(0,0,0,0)");
            sketch.colorMode(this.sketch.HSL);

            return sketch;
        },

        prepareSketch(sketch) {
            sketch.pixelDensity(1);
            sketch.angleMode(sketch.DEGREES);
            // sketch.smooth();
            sketch.colorMode(sketch.HSL);
            sketch.textFont(this.p5LoadedFont);
            sketch.textAlign(sketch.CENTER, sketch.CENTER);
            sketch.imageMode(sketch.CENTER);
            sketch.clear();
            // sketch.strokeWeight(0);

            return sketch;
        },

        p5Setup() {
            this.sketch.createCanvas(
                this.canvasWidth,
                this.canvasHeight,
                this.sketch.P2D
            );
            // this.sketch.createCanvas(this.canvasWidth, this.canvasHeight, this.sketch.WEBGL);

            this.sketch.frameRate(30);
            // this.sketch.frameRate(0.05);
            this.sketch.pixelDensity(1);
            this.sketch.angleMode(this.sketch.DEGREES);
            this.sketch.smooth();
            this.sketch.colorMode(this.sketch.HSL);
            this.sketch.textFont(this.p5LoadedFont);
            this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
            // this.sketch.noStroke();
            // this.sketch.stroke(0);
            this.sketch.strokeWeight(0);

            if (this.save || true) {
                this.sketch.noLoop();
            }

            this.settings.filters = [
                // [this.sketch.THRESHOLD, this.randomInteger(40,60) / 100],
                // [this.sketch.GRAY],
                // [this.sketch.OPAQUE],
                [this.sketch.INVERT],
                // [this.sketch.POSTERIZE, this.randomInteger(2,255)],
                // [this.sketch.BLUR, this.randomInteger(1,3)],
                // [this.sketch.BLUR, 1],
                [this.sketch.ERODE],
                [this.sketch.DILATE],
            ];

            this.settings.mutateFilters = [
                // [this.sketch.THRESHOLD, this.randomInteger(40,60) / 100],
                // [this.sketch.THRESHOLD, 0.5],
                // [this.sketch.GRAY],
                // [this.sketch.OPAQUE],
                // [this.sketch.INVERT],
                // [this.sketch.POSTERIZE, this.randomInteger(2,255)],
                // [this.sketch.POSTERIZE, 100],
                // [this.sketch.BLUR, this.randomInteger(1,3)],
                // [this.sketch.BLUR, 1],
                // [this.sketch.ERODE],
                // [this.sketch.DILATE],
            ];

            for (
                let g = 0;
                g < Object.keys(this.p5LoadedFont.font.glyphs.glyphs).length;
                g++
            ) {
                if (this.p5LoadedFont.font.glyphs.glyphs[g].unicode > 20) {
                    this.fontCharString += String.fromCharCode(
                        this.p5LoadedFont.font.glyphs.glyphs[g].unicode
                    ).trim();
                }
            }

            this.settings.blendModes = [
                this.sketch.BLEND, // source-over
                this.sketch.BLEND, // source-over
                this.sketch.BLEND, // source-over
                // this.sketch.DIFFERENCE, // difference
                // this.sketch.MULTIPLY, // multiply
                // this.sketch.LIGHTEST, // lighten
                // this.sketch.DARKEST, // darken
                // this.sketch.ADD, // lighter
                // this.sketch.EXCLUSION, // exclusion
                // this.sketch.SCREEN, // screen
                // this.sketch.REPLACE, // copy
                // this.sketch.OVERLAY, // overlay
                // this.sketch.HARD_LIGHT, // hard-light
                // this.sketch.SOFT_LIGHT, // soft-light
                // this.sketch.DODGE, // color-dodge
                // this.sketch.BURN, // color-burn
            ];
            // console.log(this.settings.blendModes);

            this.settings.blendI = this.randomInteger(
                0,
                this.settings.blendModes.length
            );

            this.settings.strokeCaps = [
                this.sketch.ROUND,
                this.sketch.SQUARE,
                this.sketch.PROJECT,
            ];
        },

        toggleLoop() {
            console.log("toggle design");
            if (this.loop) {
                this.sketch.noLoop();
            } else {
                this.sketch.loop();
            }
            this.loop = !this.loop;
        },
    },
};
</script>
