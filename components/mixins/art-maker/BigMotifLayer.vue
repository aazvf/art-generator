<script>
    export default {

        methods: {


            makeBigMotifLayer () {

                this.layer = JSON.parse(JSON.stringify(this.design.bigMotifLayer));
                // Need to get the actual characters for the motif here
                this.convertLayerCharacterArrayToString();

                // let backgroundLayer = this.makeSketchLayer(this.layer);
                let backgroundLayer = this.createSketch(this.sketch.width, this.sketch.height);
                backgroundLayer.imageMode(this.sketch.CENTER); // this fixes shit

                // const backgroundImage = this.bigMotifBackground;
                // const backgroundImage = this.p5LoadedArtImageBackground;
                const backgroundImage = this.foregroundPattern ? this.foregroundPattern : this.sketch;

                const tileScale = this.helperCover(backgroundImage.width, backgroundImage.height, backgroundLayer.width , backgroundLayer.height);
                backgroundLayer.image(backgroundImage, backgroundLayer.width / 2, backgroundLayer.height / 2, tileScale.width , tileScale.height);


                let w = Math.floor(backgroundLayer.width);
                let h = Math.floor(backgroundLayer.height);

                backgroundLayer.imageMode(this.sketch.CORNER); // this fixes shit

                let foreground = this.getMotifForegroundSketch(backgroundLayer.width, backgroundLayer.height);

                const limit = this.randomInteger(4,5);
                // let i = 0;
                // while (i < limit) {
                //     i++;
                //     // foreground = this.drawColoredMotifOnSketch(foreground, this.layer, w / (5 + i), '000000', this.layer.element.rotate * i, 0.01);
                //     foreground = this.drawColoredMotifOnSketch(foreground, this.layer, w / (9), '000000', this.layer.element.rotate * i, 0.01);
                // }


                for (let i = 0; i < limit; i++) {
                    let rotate = 360 / limit;

                    foreground = this.drawColoredMotifOnSketch(foreground, this.layer, w / (9), '000000', rotate, 0.01);

                }
                this.logSketchFrame(foreground);

                // tile up the foreground motif
                // foreground = this.autoCropSketch(foreground);
                // let fnforeground = this.createSketch(foreground.width, foreground.height);
                // fnforeground.imageMode(this.sketch.CENTER);
                // fnforeground.translate(foreground.width / 2, foreground.height / 2);
                // fnforeground.image(foreground, 0 ,0);
                // this.logSketchFrame(fnforeground);
                // fnforeground.imageMode(this.sketch.CORNER);
                // fnforeground = this.tileUpSketch(fnforeground);
                // fnforeground.rotate(this.randomHue());
                // this.logSketchFrame(fnforeground);
                //
                // foreground = fnforeground;


                // foreground = this.drawColoredMotifOnSketch(foreground, this.layer, w / 6, '000000', this.layer.element.rotate, 0.01);
                // foreground = this.drawColoredMotifOnSketch(foreground, this.layer, w / 8, '000000', this.layer.element.rotate, 0.01);

                let img = this.sketch.createImage(w, h);
                img.copy(backgroundLayer, 0, 0, w, h, 0, 0, w, h);
                img.mask(foreground);
                return img;

            },


            drawBigMotifLayer () {
                if (typeof this.design.bigMotif === 'object' && this.design.bigMotif.draw) {

                    this.sketch.push();
                    this.moveToCenter();

                    let cWidthHalf = this.canvasWidth / 8;
                    // let bigTranslateX = Math.floor((cWidthHalf * this.design.bigMotif.translate.x) - (cWidthHalf / 2));
                    let bigTranslateX = Math.floor(-(cWidthHalf * this.design.bigMotif.translate.x));

                    let cHeightHalf = this.canvasWidth / 8;
                    // let bigTranslateY = Math.floor( (cHeightHalf * this.design.bigMotif.translate.y) - (cHeightHalf / 2));
                    let bigTranslateY = Math.floor( -(cHeightHalf * this.design.bigMotif.translate.y));

                    // this.sketch.translate(bigTranslateX, bigTranslateY);

                    // this.notes.push('big motif ' + this.design.bigMotifLayer.blendMode);
                    this.sketch.blendMode(this.sketch.BLEND);
                    let bigMotif = this.makeBigMotifLayer(this.design.bigMotifLayer);

                    let trans = this.randomInteger(6,9) / 10;
                    this.sketch.imageMode(this.sketch.CENTER);
                    this.sketch.tint(360,trans);
                    this.sketch.image(bigMotif, 0, 0, bigMotif.width, bigMotif.height);
                    this.sketch.pop();

                }
            },


        }

    }

</script>
