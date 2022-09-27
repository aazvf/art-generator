<script>
    export default {

        data () {
            return {
                layerSketch: null,
                layerPatternSketch: null,
                metamotifSketch: null,
                motifBackgroundSketch: null,
                motifForegroundSketch: null,
                downsizeSketch: null,
            }
        },

        methods: {


            getDownsizeSketch (w, h) {

                // Create sketch if not exists and move to middle
                if (this.downsizeSketch === null) {
                    this.downsizeSketch = this.createSketch(w,h);
                    // this.layerSketch.translate(this.layerSketch.width/2, this.layerSketch.height/2);
                    this.downsizeSketch.push();
                } else {
                    this.downsizeSketch.pop();
                    this.downsizeSketch.resizeCanvas(w,h, true);
                    this.downsizeSketch.clear();
                    this.downsizeSketch.push();
                }

                return this.downsizeSketch;

            },


            getMotifForegroundSketch (w,h) {


                // Create sketch if not exists and move to middle
                if (this.motifForegroundSketch === null) {
                    this.motifForegroundSketch = this.createSketch(w,h);
                    this.motifForegroundSketch.push();
                } else {
                    this.motifForegroundSketch.clear();
                    this.motifForegroundSketch.pop();
                    this.motifForegroundSketch.resizeCanvas(w,h, true);
                    this.motifForegroundSketch.push();
                }

                return this.motifForegroundSketch;

            },

            getMotifBackgroundSketch (w,h) {


                // Create sketch if not exists and move to middle
                if (this.motifBackgroundSketch === null) {
                    this.motifBackgroundSketch = this.createSketch(w,h);
                    this.motifBackgroundSketch.push();
                } else {
                    this.motifBackgroundSketch.clear();
                    this.motifBackgroundSketch.pop();
                    this.motifBackgroundSketch.resizeCanvas(w,h, true);
                    this.motifBackgroundSketch.push();
                }

                return this.motifBackgroundSketch;

            },


            getMetaMotifSketch (w,h) {


                // Create sketch if not exists and move to middle
                if (this.metamotifSketch === null) {
                    this.metamotifSketch = this.createSketch(w,h);
                    this.metamotifSketch.push();
                } else {
                    this.metamotifSketch.clear();
                    this.metamotifSketch.pop();
                    // this.metamotifSketch.push();
                    this.metamotifSketch.resizeCanvas(w,h, true);
                    // this.metamotifSketch.colorMode(this.sketch.RGB);
                    // this.metamotifSketch.fill('rgba(0,0,0,0)');
                    // this.metamotifSketch.background('rgba(0,0,0,0)');
                    // this.metamotifSketch.rect(0,0,this.metamotifSketch.width, this.metamotifSketch.height);


                    // this.metamotifSketch.pop();
                    this.metamotifSketch.push();
                }

                return this.metamotifSketch;

            },


            getLayerPatternSketch (w,h) {

                // Create sketch if not exists and move to middle
                if (this.layerPatternSketch === null) {
                    this.layerPatternSketch = this.createSketch(w,h);
                    this.layerPatternSketch.push();
                } else {
                    this.layerPatternSketch.pop();
                    this.layerPatternSketch.resizeCanvas(w,h, true);
                    this.layerPatternSketch.clear();
                    this.layerPatternSketch.push();
                }

                return this.layerPatternSketch;

            },

            getLayerSketch () {

                // Create sketch if not exists and move to middle
                if (this.layerSketch === null) {
                    this.layerSketch = this.createSketch(this.canvasWidth, this.canvasHeight);
                    // this.layerSketch.translate(this.layerSketch.width/2, this.layerSketch.height/2);
                    this.layerSketch.push();
                } else {
                    this.layerSketch.pop();
                    this.layerSketch.resizeCanvas(this.canvasWidth, this.canvasHeight, true);
                    this.layerSketch.clear();
                    this.layerSketch.push();
                }

                return this.layerSketch;

            },

        }

    }

</script>
