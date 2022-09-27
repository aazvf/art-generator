<script>
    export default {

        methods: {

            moveToCenter () {
                this.sketch.imageMode(this.sketch.CENTER);
                this.sketch.translate(this.sketch.width / 2, this.sketch.height / 2);
            },

            // Run this at start of every draw
            resetCanvas () {

                this.notes = [];
                this.sketch.clear();


                if (!this.loadedFromJson) {
                    this.generateNewDesign ();
                    // this.loadedFromJson = true;
                } else {
                    this.getColours();
                }

                this.sketch.noiseSeed(this.design.noiseSeed);

                this.loadedFromJson = true;

            },

        }

    }

</script>
