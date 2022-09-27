<script>
    export default {

        data () {
            return {
                shouldDrawMirrors: true
            }
        },

        methods: {

            drawBackgroundMirrors () {
                if (typeof this.design.backgroundMirrors.draw === 'boolean' && this.design.backgroundMirrors.draw) {
                    this.drawHorizontalMirrors(this.design.backgroundMirrors.y);
                    this.drawVerticalMirrors(this.design.backgroundMirrors.x);
                }
            },

            drawMirrors () {
                if (typeof this.design.mirrors.draw === 'boolean' && this.design.mirrors.draw) {

                    if (typeof this.design.mirrors.startRatio === 'number') {
                        this.design.mirrors.startX = Math.floor (this.canvasHeight * this.design.mirrors.startRatio);
                        this.design.mirrors.startY = Math.floor (this.canvasWidth * this.design.mirrors.startRatio);
                    }

                    this.drawHorizontalMirror();
                    this.drawVerticalMirror();
                }
            },

            drawHorizontalMirrorOnSketch (sketch, start, mirrors)
            {
                // this.notes.push('y mirrors ' + mirrors);
                if (mirrors < 1 || !this.shouldDrawMirrors) {
                    return sketch;
                }
                // sketch.push();

                let pieces = (mirrors + 1);
                let height = Math.round(sketch.height / pieces);

                let piece = sketch.get(0, (start % (sketch.height - height)), sketch.width, (height));

                let newSketch = this.createSketch(sketch.width, sketch.height);
                newSketch.imageMode(newSketch.CORNER);

                newSketch.push();

                for (let p = 0; p < pieces; p++) {

                    if (p % 2 === 0) {
                        newSketch.image(piece, 0, 0, newSketch.width, height);
                    } else {
                        newSketch.push();
                        newSketch.translate(0, height);
                        newSketch.scale(1,-1);
                        newSketch.image(piece, 0, 0, newSketch.width, height);
                        newSketch.pop();
                    }

                    newSketch.translate(0, height);

                }
                newSketch.image(piece, 0, 0, newSketch.width, height);

                newSketch.pop();

                return newSketch;

            },

            drawHorizontalMirrors (mirrors)
            {
                this.notes.push('y ' + mirrors);
                if (mirrors < 1 || !this.shouldDrawMirrors) {
                    return;
                }
                this.sketch.push();
                this.sketch.blendMode(this.sketch.BLEND);
                this.sketch.imageMode(this.sketch.CORNER);

                let pieces = (mirrors + 1);
                let height = Math.round((this.canvasHeight / pieces));

                let start = (typeof this.design.mirrors.startY === 'number') ? this.design.mirrors.startY : this.design.mirrors.start;
                let piece = this.sketch.get(0, (start % (this.canvasHeight - height)), this.canvasWidth, (height));

                for (let p = 0; p < pieces; p++) {
                    if (p % 2 === 0) {
                        this.sketch.image(piece, 0, 0, this.canvasWidth, height);
                    } else {
                        this.sketch.push();
                        this.sketch.translate(0, height);
                        this.sketch.scale(1,-1);
                        this.sketch.image(piece, 0, 0, this.canvasWidth, height);
                        this.sketch.pop();
                    }
                    this.sketch.translate(0, height);
                }
                this.sketch.image(piece, 0, 0, this.canvasWidth, height);
                this.sketch.pop();
            },

            drawHorizontalMirror ()
            {
                let mirrors = parseInt(this.design.mirrors.y);
                this.drawHorizontalMirrors(mirrors);
            },

            drawVerticalMirrorOnSketch (sketch, start, mirrors)
            {
                if (mirrors < 1 || !this.shouldDrawMirrors) {
                    return sketch;
                }

                let pieces = (mirrors + 1);
                let width = Math.round(sketch.width / pieces);
                let piece = sketch.get((start % (sketch.width - width)),0, (width), sketch.height);
                let newSketch = this.createSketch(sketch.width, sketch.height);

                newSketch.imageMode(newSketch.CORNER);
                newSketch.push();

                for (let p = 0; p < pieces; p++) {
                    if (p % 2 === 0) {
                        newSketch.image(piece, 0, 0, width, newSketch.height);
                    } else {
                        newSketch.push();
                        newSketch.translate(width, 0);
                        newSketch.scale(-1,1);
                        newSketch.image(piece, 0, 0, width, newSketch.height);
                        newSketch.pop();
                    }
                    newSketch.translate(width, 0);
                }
                newSketch.image(piece, 0, 0, width, newSketch.height);
                newSketch.pop();
                return newSketch;
            },

            drawVerticalMirrors (mirrors)
            {
                this.notes.push('x  ' + mirrors);
                if (mirrors < 1 || !this.shouldDrawMirrors) {
                    return;
                }
                this.sketch.push();
                this.sketch.imageMode(this.sketch.CORNER);
                this.sketch.blendMode(this.sketch.BLEND);

                let pieces = (mirrors + 1);
                let width = Math.round(this.canvasWidth / pieces);

                let start = (typeof this.design.mirrors.startX === 'number') ? this.design.mirrors.startX : this.design.mirrors.start;
                let piece = this.sketch.get((start % (this.canvasWidth - width)),0, (width), this.canvasHeight);

                for (let p = 0; p < pieces; p++) {

                    if (p % 2 === 0) {
                        this.sketch.image(piece, 0, 0, width, this.canvasHeight);
                    } else {
                        this.sketch.push();
                        this.sketch.translate(width, 0);
                        this.sketch.scale(-1,1);
                        this.sketch.image(piece, 0, 0, width, this.canvasHeight);
                        this.sketch.pop();
                    }
                    this.sketch.translate(width, 0);
                }
                this.sketch.image(piece, 0, 0, width, this.canvasHeight);
                this.sketch.pop();
            },

            drawVerticalMirror ()
            {
                let mirrors = parseInt(this.design.mirrors.x);
                this.drawVerticalMirrors(mirrors);
            },

        }

    }

</script>
