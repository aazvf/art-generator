<script>
    export default {

        methods: {

            drawDots () {
                if (typeof this.design.overlayDots === 'object') {
                    // console.log(this.design.overlayDots);
                    this.drawDotsLayer(this.design.overlayDots);
                }
            },

            makeDotsLayer (hues) {

                // let pixelSize = this.randomInteger(2,5);
                let pixelSize = this.arrayRandom([2,2,2,3]);


                return {
                    hue: this.arrayRandom(hues),
                    colorScheme: this.arrayRandom(this.settings.colorSchemes),
                    colorMode: this.arrayRandom(this.settings.colorModes),
                    pixelSize: pixelSize,
                    pixelGap: this.randomInteger(pixelSize * 3,pixelSize * 7),
                    mod: this.randomInteger(5,8) / 10,
                    isCircle: this.randomBoolean(),
                    blendMode: this.arrayRandom(this.settings.blendModes),
                    noiseSeed: this.randomInteger(999,99999),
                };
            },



            drawDotsLayer (dots)
            {
                this.sketch.push();
                this.notes.push('dots ' + dots.blendMode);
                this.sketch.blendMode(dots.blendMode);
                this.sketch.noiseSeed(dots.noiseSeed);
                this.sketch.colorMode(this.sketch.RGB);

                let pixelIncrement = (dots.pixelSize + dots.pixelGap);
                let colors = this.getColorsFromMode(dots.hue, dots.colorScheme, dots.colorMode);
                let fill = this.hexToHSL("#" + colors[0]);
                fill = this.hslToRgb(fill[0] / 360, fill[1] / 100, fill[2] / 100);

                let r = fill[0];
                let g = fill[1];
                let b = fill[2];

                let dotsX = Math.floor(this.canvasWidth / pixelIncrement);
                let dotsY = Math.floor(this.canvasHeight / pixelIncrement);

                let dotsLayerWidth = (pixelIncrement * dotsX);
                let dotsLayerHeight = (pixelIncrement * dotsY);

                let dotsLayer = this.createSketch(dotsLayerWidth, dotsLayerHeight);
                dotsLayer.noStroke();
                dotsLayer.rectMode(this.sketch.CORNER);
                dotsLayer.translate((dots.pixelGap / 2) , (dots.pixelGap /2) );

                for (let x = 0; x < (dotsX + 1); x++) {

                    for (let y = 0; y < (dotsY + 1); y++) {

                        let c = this.sketch.noise(0.01 * x, 0.01 * y);
                        c *= dots.mod;
                        c = c.toFixed(2);
                        // c = 1; // remove this
                        dotsLayer.fill('rgba(' + r + ', ' + g + ', ' + b + ', ' + c + ')');

                        let dotX = (x * pixelIncrement);
                        let dotY = (y * pixelIncrement);

                        if (dots.circle) {
                            dotsLayer.circle(dotX,dotY, dots.pixelSize);
                        } else {
                            dotsLayer.rect(dotX,dotY, dots.pixelSize, dots.pixelSize);
                        }

                    }

                }

                this.moveToCenter();
                this.sketch.image(dotsLayer, 0, 0, this.canvasWidth, this.canvasHeight);

                this.sketch.pop();
            },

        }

    }

</script>
