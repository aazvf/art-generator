<script>
    export default {

        data () {
            return {
                cropPixelStep: 4,
                cropPadding: 2,
                cropSafetyPadding: 20
            };
        },

        methods: {

            cropSketch(sketch, crop) {
                return sketch.get(crop.x, crop.y, crop.width, crop.height);
            },

            getLeftCrop(sketch) {
                for (let x = this.cropPadding; x < (sketch.width - this.cropPadding); x += this.cropPixelStep) {
                    for (let y = this.cropPadding; y < (sketch.height - this.cropPadding); y += this.cropPixelStep) {
                        if (this.isPixelFilled(sketch, x, y)) {
                            return Math.max(0, x - this.cropSafetyPadding);
                        }
                    }
                }
                return 0;
            },

            getTopCrop(sketch){
                for (let y = this.cropPadding; y < (sketch.height - this.cropPadding); y += this.cropPixelStep) {
                    for (let x = this.cropPadding; x < (sketch.width - this.cropPadding); x += this.cropPixelStep) {
                        if (this.isPixelFilled(sketch, x, y)) {
                            return Math.max(0, y - this.cropSafetyPadding);
                        }
                    }
                }
                return 0;
            },

            getRightCrop(sketch){
                for (let x = (sketch.width - this.cropPadding) ; x > this.cropPadding; x -= this.cropPixelStep) {
                    for (let y = (sketch.height - this.cropPadding); y > this.cropPadding; y -= this.cropPixelStep) {
                        if (this.isPixelFilled(sketch, x, y)) {
                            return Math.min(sketch.width, x + this.cropSafetyPadding);
                        }
                    }
                }
                return sketch.width;
            },

            getBottomCrop(sketch){
                for (let y = (sketch.height - this.cropPadding); y > this.cropPadding; y -= this.cropPixelStep) {
                    for (let x = (sketch.width - this.cropPadding); x > this.cropPadding; x -= this.cropPixelStep) {
                        if (this.isPixelFilled(sketch, x, y)) {
                            return Math.min(sketch.height, y + this.cropSafetyPadding);
                        }
                    }
                }
                return sketch.height;
            },

            isPixelFilled (sketch, x, y) {
                let pixel = sketch.get(x,y);
                return (pixel[0] + pixel[1] + pixel[2] + pixel[3]) > 0;
            },

            hasTransparentEdges (sketch, width, height) {

                for (let x = this.cropPadding; x < sketch.width; x += this.cropPixelStep) {
                    if (this.isPixelFilled(sketch, x, this.cropPadding) || this.isPixelFilled(sketch, x, height - this.cropPadding)) {
                        return false;
                    }
                }

                for (let y = this.cropPadding; y < sketch.height; y += this.cropPixelStep) {
                    if (this.isPixelFilled(sketch, this.cropPadding, y) || this.isPixelFilled(sketch, width - this.cropPadding, y)) {
                        return false;
                    }
                }

                console.log('has transparent edges');
                return true;

            },

            getCropCoOrds(sketch) {

                let start = window.performance.now();

                let x = this.getLeftCrop(sketch);
                let y = this.getTopCrop(sketch);

                let width = (this.getRightCrop(sketch)) - x;
                let height = (this.getBottomCrop(sketch)) - y;

                let end = window.performance.now();

                let timer = (end - start).toFixed(2);

                console.log('cropping ', parseInt(timer));

                // this.notes.push('timer', timer);

                return {
                    x: x,
                    y: y,
                    width: width,
                    height: height
                };
            },

            autoCropSketch(sketch) {

                let c = this.getCropCoOrds(sketch);

                sketch = sketch.get(c.x,c.y,c.width,c.height);

                return sketch;
            },

        }
    }
</script>
