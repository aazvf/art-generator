<script>
    export default {

        methods: {


            makeBigMotifLayer () {

                this.layer = JSON.parse(JSON.stringify(this.design.bigMotifLayer));
                // Need to get the actual characters for the motif here
                this.convertLayerCharacterArrayToString();

                let backgroundLayer = this.makeSketchLayer(this.layer);
                let w = Math.floor(backgroundLayer.width);
                let h = Math.floor(backgroundLayer.height);

                backgroundLayer.imageMode(this.sketch.CORNER); // this fixes shit

                let foreground = this.getMotifForegroundSketch(backgroundLayer.width, backgroundLayer.height);
                foreground = this.drawColoredMotifOnSketch(foreground, this.layer, w / 6, '000000', this.layer.element.rotate, 0.01);
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
                    this.sketch.blendMode(this.design.bigMotifLayer.blendMode);
                    let bigMotif = this.makeBigMotifLayer(this.design.bigMotifLayer);
                    this.sketch.imageMode(this.sketch.CENTER);
                    this.sketch.tint(360,0.5);
                    this.sketch.image(bigMotif, 0, 0, bigMotif.width, bigMotif.height);
                    this.sketch.pop();

                }
            },


        }

    }

</script>
