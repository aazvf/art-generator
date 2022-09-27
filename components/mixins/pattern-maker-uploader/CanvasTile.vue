<script>
export default {
    methods: {
        scaleUpToCropSize(force = false) {
            while (
                this.sketch.width < this.currentCrop.x ||
                this.sketch.height < this.currentCrop.y
            ) {
                // this.saveFrame();
                console.log(
                    "TOO SMALL TILING UP!!!!",
                    this.sketch.width,
                    this.currentCrop.x,
                    this.sketch.height,
                    this.currentCrop.y
                );
                this.tileUp();
                this.frameIteration++;
                this.patternSizes.push({
                    x: this.sketch.width,
                    y: this.sketch.height,
                });
            }
        },

        tileAndRotate() {
            if (
                typeof this.design.cropRotations === "object" &&
                typeof this.design.cropRotations[
                    this.cropIteration % this.design.cropRotations.length
                ] === "number"
            ) {
                this.tileAndRotateBy(
                    this.design.cropRotations[
                        this.cropIteration % this.design.cropRotations.length
                    ]
                );
            }
        },

        // Expand canvas to diagonal square and rotate.
        tileAndRotateBy(rotate) {
            let cw = this.sketch.width;
            let ch = this.sketch.height;
            let diagonal = Math.floor(Math.sqrt(cw * cw + ch * ch));
            let canvas = this.sketch.get();
            let tiledCanvas = this.createSketch(diagonal, diagonal);
            let cols = Math.floor(diagonal / cw + 1);
            let rows = Math.floor(diagonal / ch + 1);

            tiledCanvas.imageMode(this.sketch.CORNER);
            for (let col = 0; col < cols; col++) {
                for (let row = 0; row < rows; row++) {
                    let cellX = cw * col;
                    let cellY = ch * row;
                    tiledCanvas.image(canvas, cellX, cellY);
                }
            }

            this.sketch.clear();
            this.sketch.push();
            this.moveToCenter();
            this.sketch.rotate(rotate);
            // if (Math.random() > 0.9) {
            // }
            // tiledCanvas.imageMode(this.sketch.CENTER);
            this.sketch.image(tiledCanvas, 0, 0);
            this.sketch.pop();
        },

        tileUp() {
            let canvas = this.sketch.get();
            let width = this.sketch.width;
            let height = this.sketch.height;

            this.sketch.push();
            this.sketch.resizeCanvas(width * 2, height * 2, true);

            // drop top left image
            this.sketch.image(canvas, 0, 0);

            // Draw top right image
            this.sketch.translate(width * 2, 0);
            this.sketch.push();
            this.sketch.scale(-1, 1);
            this.sketch.image(canvas, 0, 0);
            this.sketch.pop();

            // draw bottom left image
            this.sketch.translate(-(width * 2), height * 2);
            this.sketch.push();
            this.sketch.scale(1, -1);
            this.sketch.image(canvas, 0, 0);
            this.sketch.pop();

            // draw bottom right image
            this.sketch.translate(width * 2, 0);
            this.sketch.scale(-1, -1);
            this.sketch.image(canvas, 0, 0);

            this.sketch.pop();
        },

        doubleUp() {
            let canvas = this.sketch.get();
            let width = this.sketch.width;
            let height = this.sketch.height;

            this.sketch.push();
            // make canvas 4 times bigger
            this.sketch.resizeCanvas(width * 2, height * 2, true);

            // draw top left image
            this.sketch.image(canvas, 0, 0);

            // draw top right image
            this.sketch.translate(width, 0);
            this.sketch.image(canvas, 0, 0);

            // draw bottom left image
            this.sketch.translate(-width, height);
            this.sketch.image(canvas, 0, 0);

            // draw bottom right image
            this.sketch.translate(width, 0);
            this.sketch.image(canvas, 0, 0);

            this.sketch.pop();
        },
    },
};
</script>
