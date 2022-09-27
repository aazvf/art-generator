<script>
    export default {

        methods: {


            canvasWidthComp () {
                console.log('currentcrop', this.currentCrop);

                if (typeof this.currentCrop.x === 'number') {
                    if (typeof this.design.frameDivide === 'number') {
                        return Math.floor((this.currentCrop.x / this.design.frameDivide) + 1);
                    } else {
                        return Math.floor((this.currentCrop.x / this.frameDivide) + 1);
                    }
                }

                return 100;
            },

            canvasHeightComp () {
                if (typeof this.currentCrop.y === 'number') {
                    if (typeof this.design.frameDivide === 'number') {
                        return Math.floor((this.currentCrop.y / this.design.frameDivide) + 1);
                    } else {
                        return Math.floor((this.currentCrop.y / this.frameDivide) + 1);
                    }
                }
                return 100;
            },

            setCanvasWidthHeight() {
                // Uncomment this if orders dont render right
                // if (this.design.version < 12 && typeof this.design.frameDivide != 'number') {
                //     this.design.frameDivide = 12;
                //     this.frameDivide = 12;
                // }

                this.canvasWidth = this.canvasWidthComp();
                this.canvasHeight = this.canvasHeightComp();

                console.log('setCanvasWidthHeight', this.canvasWidth, this.canvasHeight, this.design.frameDivide, this.frameDivide);

                this.patternSizes.push({
                    x: this.canvasWidth,
                    y: this.canvasHeight
                });
            },



            downSize () {

                if (typeof this.downsize_x === 'number' && this.downsize_x > 1) {
                    let canvas = this.sketch.get();

                    let ratio = this.downsize_x / this.sketch.width;

                    let newHeight = Math.floor(this.sketch.height * ratio) + 1;

                    console.log(ratio, newHeight, 'newHeight');


                    this.sketch.resizeCanvas(this.downsize_x, newHeight, true);

                    this.sketch.image(canvas, 0, 0, this.downsize_x, newHeight);

                }

            },

            downSizeAndEncodeCrops () {

                for (let crop of this.crops) {

                    if (typeof this.downsize_x === 'number' && this.downsize_x > 1) {
                        let canvas = crop.sketch;

                        let ratio = this.downsize_x / crop.x;

                        let newHeight = Math.floor(crop.y * ratio) + 1;

                        console.log(ratio, newHeight, 'newHeight');


                        this.sketch.resizeCanvas(this.downsize_x, newHeight, true);

                        this.sketch.image(canvas, 0, 0, this.downsize_x, newHeight);

                        crop.src = this.sketch.canvas.toDataURL('image/jpeg', 0.97);

                        crop.sketch = null;

                        this.frames.push({
                            src: crop.src,
                            x: this.sketch.width,
                            y: this.sketch.height,
                        });

                    } else {


                        crop.src = crop.sketch.canvas.toDataURL('image/jpeg', 0.97);

                        crop.sketch = null;

                        this.frames.push({
                            src: crop.src,
                            x: crop.x,
                            y: crop.y,
                        });
                    }



                }


            },


            fixExactCanvasSize () {
                // fix size
                // let start = window.performance.now();
                let canvas = this.sketch.get();
                this.sketch.resizeCanvas(this.currentCrop.x, this.currentCrop.y, true);
                this.sketch.image(canvas, 0, 0, this.sketch.width, this.sketch.height);
                // let end = window.performance.now();
                // console.log('fixing ', parseInt(end - start));
            },



        }

    }

</script>
