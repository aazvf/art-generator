<script>
export default {
    data() {
        return {
            shouldDrawMirrors: true,
        };
    },

    methods: {
        getCanvasWidth() {
            return this.sketch.width;
        },

        getCanvasHeight() {
            return this.sketch.height;
        },

        drawBackgroundMirrors() {
            if (
                typeof this.design.backgroundMirrors.draw === "boolean" &&
                this.design.backgroundMirrors.draw
            ) {
                let startY = Math.floor(
                    this.getCanvasWidth() *
                        this.design.backgroundMirrors.startRatio
                );
                let startX = Math.floor(
                    this.getCanvasHeight() *
                        this.design.backgroundMirrors.startRatio
                );
                this.drawHorizontalMirrors(
                    this.design.backgroundMirrors.y,
                    startY
                );
                this.drawVerticalMirrors(
                    this.design.backgroundMirrors.x,
                    startX
                );
            }
        },

        drawMirrors() {
            if (
                typeof this.design.mirrors.draw === "boolean" &&
                this.design.mirrors.draw
            ) {
                if (typeof this.design.mirrors.startRatio === "number") {
                    // console.log('drawMirrors STARTY', this.getCanvasWidth(), this.design.mirrors.startRatio, Math.floor (this.getCanvasWidth() * this.design.mirrors.startRatio));

                    this.design.mirrors.startX = Math.floor(
                        this.getCanvasHeight() * this.design.mirrors.startRatio
                    );
                    this.design.mirrors.startY = Math.floor(
                        this.getCanvasWidth() * this.design.mirrors.startRatio
                    );
                }

                // console.log('MIRRORS', this.design.mirrors);
                this.drawHorizontalMirror();
                this.drawVerticalMirror();
            }
        },

        drawHorizontalMirrorOnSketch(sketch, start, mirrors) {
            // this.notes.push('y mirrors ' + mirrors);
            if (mirrors < 1 || !this.shouldDrawMirrors) {
                return sketch;
            }
            // sketch.push();

            // start = (start / (this.cropIteration + 1));

            let pieces = mirrors + 1;
            let height = Math.round(sketch.height / pieces);

            let piece = sketch.get(
                0,
                start % (sketch.height - height),
                sketch.width,
                height
            );

            let newSketch = this.createSketch(sketch.width, sketch.height);
            newSketch.imageMode(newSketch.CORNER);

            newSketch.push();

            for (let p = 0; p < pieces; p++) {
                if (p % 2 === 0) {
                    newSketch.image(piece, 0, 0, newSketch.width, height);
                } else {
                    newSketch.push();
                    newSketch.translate(0, height);
                    newSketch.scale(1, -1);
                    newSketch.image(piece, 0, 0, newSketch.width, height);
                    newSketch.pop();
                }

                newSketch.translate(0, height);
            }
            newSketch.image(piece, 0, 0, newSketch.width, height);

            newSketch.pop();

            return newSketch;
        },

        drawHorizontalMirrors(mirrors, start) {
            this.notes.push("y " + mirrors);
            if (mirrors < 1 || !this.shouldDrawMirrors) {
                return;
            }
            // start = (start / (this.cropIteration + 1));
            this.sketch.push();
            this.sketch.blendMode(this.sketch.BLEND);
            this.sketch.imageMode(this.sketch.CORNER);

            let pieces = mirrors + 1;
            let height = Math.round(this.getCanvasHeight() / pieces);

            // let start = (typeof this.design.mirrors.startY === 'number') ? this.design.mirrors.startY : this.design.mirrors.start;

            // this.frames.push({
            //     src: this.sketch.canvas.toDataURL('image/jpeg', 0.8)
            // })

            // console.log('PIECE', [start, this.getCanvasHeight(), height], 0, (start % (this.getCanvasHeight() - height)), this.getCanvasWidth(), (height));

            let piece = this.sketch.get(
                0,
                start % (this.getCanvasHeight() - height),
                this.getCanvasWidth(),
                height
            );

            // console.log('drawHorizontalMirrors', pieces, height, start);

            // this.frames.push({
            //     src: piece.canvas.toDataURL('image/jpeg', 0.8)
            // })

            this.sketch.clear();
            for (let p = 0; p < pieces; p++) {
                if (p % 2 === 0) {
                    this.sketch.image(
                        piece,
                        0,
                        0,
                        this.getCanvasWidth(),
                        height
                    );
                } else {
                    this.sketch.push();
                    this.sketch.translate(0, height);
                    this.sketch.scale(1, -1);
                    this.sketch.image(
                        piece,
                        0,
                        0,
                        this.getCanvasWidth(),
                        height
                    );
                    this.sketch.pop();
                }
                this.sketch.translate(0, height);
            }
            this.sketch.image(piece, 0, 0, this.getCanvasWidth(), height);
            this.sketch.imageMode(this.sketch.CENTER);
            this.sketch.pop();
        },

        drawHorizontalMirror() {
            let start =
                typeof this.design.mirrors.startY === "number"
                    ? this.design.mirrors.startY
                    : this.design.mirrors.start;
            let mirrors = parseInt(this.design.mirrors.y);
            this.drawHorizontalMirrors(mirrors, start);
        },

        drawVerticalMirrorOnSketch(sketch, start, mirrors) {
            if (mirrors < 1 || !this.shouldDrawMirrors) {
                return sketch;
            }

            // start = (start / (this.cropIteration + 1));

            let pieces = mirrors + 1;
            let width = Math.round(sketch.width / pieces);
            let piece = sketch.get(
                start % (sketch.width - width),
                0,
                width,
                sketch.height
            );
            let newSketch = this.createSketch(sketch.width, sketch.height);

            newSketch.imageMode(newSketch.CORNER);
            newSketch.push();

            for (let p = 0; p < pieces; p++) {
                if (p % 2 === 0) {
                    newSketch.image(piece, 0, 0, width, newSketch.height);
                } else {
                    newSketch.push();
                    newSketch.translate(width, 0);
                    newSketch.scale(-1, 1);
                    newSketch.image(piece, 0, 0, width, newSketch.height);
                    newSketch.pop();
                }
                newSketch.translate(width, 0);
            }
            newSketch.image(piece, 0, 0, width, newSketch.height);
            newSketch.pop();
            return newSketch;
        },

        drawVerticalMirrors(mirrors, start) {
            this.notes.push("x  " + mirrors);
            if (mirrors < 1 || !this.shouldDrawMirrors) {
                return;
            }
            // start = (start / (this.cropIteration + 1));
            this.sketch.push();
            this.sketch.imageMode(this.sketch.CORNER);
            this.sketch.blendMode(this.sketch.BLEND);

            let pieces = mirrors + 1;
            let width = Math.round(this.getCanvasWidth() / pieces);

            // let start = (typeof this.design.mirrors.startX === 'number') ? this.design.mirrors.startX : this.design.mirrors.start;
            let piece = this.sketch.get(
                start % (this.getCanvasWidth() - width),
                0,
                width,
                this.getCanvasHeight()
            );

            // console.log('drawVerticalMirrors', pieces, width, start);

            this.sketch.clear();
            for (let p = 0; p < pieces; p++) {
                if (p % 2 === 0) {
                    this.sketch.image(
                        piece,
                        0,
                        0,
                        width,
                        this.getCanvasHeight()
                    );
                } else {
                    this.sketch.push();
                    this.sketch.translate(width, 0);
                    this.sketch.scale(-1, 1);
                    this.sketch.image(
                        piece,
                        0,
                        0,
                        width,
                        this.getCanvasHeight()
                    );
                    this.sketch.pop();
                }
                this.sketch.translate(width, 0);
            }
            this.sketch.image(piece, 0, 0, width, this.getCanvasHeight());
            this.sketch.imageMode(this.sketch.CENTER);
            this.sketch.pop();
        },

        drawVerticalMirror() {
            let start =
                typeof this.design.mirrors.startX === "number"
                    ? this.design.mirrors.startX
                    : this.design.mirrors.start;
            let mirrors = parseInt(this.design.mirrors.x);
            this.drawVerticalMirrors(mirrors, start);
        },
    },
};
</script>
