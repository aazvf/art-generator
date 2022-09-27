<script>
    export default {


        props: {

            store_is_white_url: {type: String, default: ''}

        },

        data() {
            return {
                determinedIsWhite: false,
                isWhite: false
            }
        },

        methods: {

            determineIsWhite ()
            {
                if (this.determinedIsWhite) {
                    return;
                }

                let canvas = this.sketch.get();
                let onePixelCanvas = this.createSketch(1,1);

                onePixelCanvas.imageMode(this.sketch.CORNER);
                onePixelCanvas.colorMode(this.sketch.RGB);

                onePixelCanvas.image(canvas, 0, 0, 1,1);

                onePixelCanvas.loadPixels();

                let pixel = onePixelCanvas.pixels;

                let averagePixel = (pixel[0] + pixel[1] + pixel[2]) / 3;

                document.body.style.backgroundColor = 'rgb(' + pixel[0] + ',' + pixel[1] + ',' + pixel[2] + ')';

                console.log('PIXEL', Math.floor(averagePixel));

                this.isWhite = (averagePixel > (147));

                console.log('isWhite', this.isWhite);

                this.determinedIsWhite = true;

            },

            storeIsWhite ()
            {

                return new Promise((resolve) => {
                    if (this.store_is_white_url.length > 1) {
                        window.axios.post(this.store_is_white_url, {
                            'is_white': this.isWhite
                        }).then(response => {
                            console.log(response);

                            resolve();

                        });
                    } else {
                        resolve();
                    }
                });



            },

        }

    }

</script>
