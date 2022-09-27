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
                // let colors = this.getColorsFromHue(dots.hue);
                let colors = this.getColorsFromMode(dots.hue, dots.colorScheme, dots.colorMode);
                let fill = this.hexToHSL("#" + colors[0]);
                fill = this.hslToRgb(fill[0] / 360, fill[1] / 100, fill[2] / 100);

                let r = fill[0];
                let g = fill[1];
                let b = fill[2];

                for (let x = 0; x < this.canvasWidth + pixelIncrement; x += (pixelIncrement)) {
                    for (let y = 0; y < this.canvasHeight + pixelIncrement; y += (pixelIncrement)) {
                        let c = this.sketch.noise(0.01 * x, 0.01 * y);
                        c *= dots.mod;
                        c = c.toFixed(2);
                        this.sketch.fill('rgba(' + r + ', ' + g + ', ' + b + ', ' + c + ')');
                        if (dots.circle) {
                            this.sketch.circle(x,y, dots.pixelSize);
                        } else {
                            this.sketch.rect(x,y, dots.pixelSize, dots.pixelSize);
                        }
                    }
                }

                this.sketch.pop();
            },

        }

    }

</script>
