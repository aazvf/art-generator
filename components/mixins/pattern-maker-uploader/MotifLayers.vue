<script>
    export default {

        methods: {




            drawColoredMotifOnSketch (sketch, layer, size, color, rotate = 0, opacity = 1) {
                sketch.push();

                if (layer.motif.outline) {

                    if (typeof layer.motif.stroke === 'number') {
                        sketch.strokeWeight(layer.motif.stroke);
                    } else {
                        sketch.strokeWeight(1);
                    }
                    sketch.noFill();
                    this.noFill = 'yes';

                } else {
                    sketch.strokeWeight(0);
                }


                if (opacity < 1) {

                    sketch = this.setSketchColorAlphaFromHex(sketch, 'FFFFFF', 1);
                    sketch.colorMode(this.sketch.RGB);
                    sketch.fill('rgb(255,255,255)');
                    sketch.stroke('rgb(255,255,255)');

                } else {
                    sketch = this.setSketchColorFromHex(sketch, color);
                }


                sketch.textSize(size);

                let centerx = parseInt(sketch.width / 2);
                let centery = parseInt(sketch.height /2);

                sketch.translate(0, 0);
                sketch.translate(centerx, centery);

                sketch.scale(layer.motif.scale);
                sketch.scale(layer.motif.scaleUp);

                sketch.rotate(rotate);
                sketch.rotate(layer.element.rotate);
                for (let o = 0; o < layer.motif.pieces; o++) {

                    sketch.push();
                    sketch.translate(layer.element.translate.x, layer.element.translate.y);
                    if (layer.element.overlayCharacters) {
                        for (let char = 0; char < layer.element.character.length; char++) {
                            sketch.text(layer.element.character.charAt(char), 0, 0);
                        }
                    } else {
                        sketch.text(layer.element.character, 0, 0);
                    }
                    sketch.pop();


                    sketch.rotate(360/layer.motif.pieces);

                }

                sketch.rotate(-layer.element.rotate);
                sketch.translate(-centerx, -centery);
                sketch.pop();

                return sketch;

            },

            makeMultiColorMotif (layer, fontSize, color, w, h, rotate, opacity = 1, iteration = 0) {

                w = Math.round(w);
                h = Math.round(h);

                // let sketch = this.createSketch(w,h);
                let sketch = this.getMotifBackgroundSketch(w,h);

                sketch.imageMode(this.sketch.CORNER); // this fixes shit
                sketch = this.applyBackgroundPoints(sketch, layer.backgrounds[iteration]);

                // let foreground = this.createSketch(w,h);
                let foreground = this.getMotifForegroundSketch(w,h);

                foreground = this.drawColoredMotifOnSketch(foreground, layer, fontSize, color, rotate, 0.01);

                this.logSketchFrame(foreground);
                let img = this.sketch.createImage(sketch.width,sketch.height);
                img.copy(sketch, 0, 0, sketch.width, sketch.height, 0, 0, sketch.width, sketch.height);
                img.mask(foreground);
                return img;
            },


            makeMetaMotifSketch(layer, row, col, w, h) {

                let start = window.performance.now();

                // let sketch = this.createSketch(w,h);
                let sketch = this.getMetaMotifSketch(w,h);


                sketch.translate(w/2,h/2);


                let i = 0;
                this.motifIteration = 0;
                let motifLimit = layer.metamotif.pieces;

                // for each inner colour
                let fontSize = 0 + layer.element.fontSize;

                // let distance = this.randomInteger(fontSize / 5, fontSize * 2);

                // this.notes.push(['metamotif translate ', w,h, layer.metamotif.translate.x , layer.metamotif.translate.y])

                while (i < layer.element.repeatLimit) {

                    // let color = this.getHexColorForRowCol(row + i + layer.element.repeatColorJumpRow, col, layer);
                    let color = this.getHexColorForRowCol(row, col, layer);


                    let rotate = ((layer.element.rotate) * i) % 360;

                    // From version 9 onwards we have a new rotate amount for repeat limit
                    // TODO fix this
                    // if (typeof layer.element.repeatRotate === 'number') {
                    //     rotate = ((layer.element.repeatRotate) * i) % 360;
                    // }

                    // for each motif
                    let opacity = 1;
                    let motif = this.makeMultiColorMotif(layer, fontSize, color, w, h, rotate, opacity, i);
                    for (let m = 0; m < motifLimit; m++) {

                        // let opacity = 0.6;

                        // let motif = this.makeSingleColorMotif(layer, fontSize, color, w, h, rotate, opacity);
                        // let motif = this.makeMultiColorMotif(layer, fontSize, color, w, h, rotate, opacity, i);


                        // this.sketch.image(motif, 0, 0);
                        // return;

                        sketch.rotate(360 / motifLimit);

                        sketch.push();
                        sketch.translate(layer.metamotif.translate.x , layer.metamotif.translate.y );
                        // sketch.translate(layer.metamotif.translate.x , layer.metamotif.translate.y );
                        if (m % 2 === 0) {
                            sketch.scale(-1,1);
                        }

                        sketch.image(motif, 0, 0);
                        sketch.pop();
                    }
                    fontSize *= layer.element.repeatScaleDown;
                    i++;
                }

                let end = window.performance.now();

                console.log('makeMetaMotifSketch ', parseInt(end - start));


                return sketch;

            },

            toSketch (img)
            {
                let sketch = this.createSketch(img.width, img.height);
                sketch.imageMode(sketch.CENTER);
                sketch.image(img, sketch.width / 2, sketch.height / 2);
                return sketch;

            },

            makeSketchLayer(layer) {

                let cw = this.canvasWidth;
                let ch = this.canvasHeight;


                let diagonal = Math.sqrt((cw * cw) + (ch * ch));
                diagonal = Math.floor(diagonal);
                cw = diagonal;
                ch = diagonal;

                let motifw = 4;
                let motifh = 4;

                if (this.version > 8) {
                    motifw = (layer.metamotif.translate.x * (layer.metamotif.pieces )) + (motifw * layer.element.fontSize);
                    motifh = (layer.metamotif.translate.y *  (layer.metamotif.pieces )) + (motifh * layer.element.fontSize);
                } else {
                    motifw = (layer.pattern.translate.x * (layer.metamotif.pieces )) + (motifw * layer.element.fontSize);
                    motifh = (layer.pattern.translate.y *  (layer.metamotif.pieces )) + (motifh * layer.element.fontSize);
                }

                let motif = this.makeMetaMotifSketch(layer, 0, 0, motifw, motifh);
                let limit = 5;

                while (!this.hasTransparentEdges(motif, motifw, motifh) && limit > 0) {
                    limit--;
                    motifw *= 1.4;
                    motifh *= 1.4;

                    if (this.version > 8) {
                        motifw = Math.floor(motifw);
                        motifh = Math.floor(motifh);
                    }

                    motif = this.makeMetaMotifSketch(layer, 0, 0, motifw, motifh);
                    console.log('increasing');
                }

                this.logSketchFrame(motif);

                // this.sketch.image(motif, 0, 0);
                // return;

                let crop = this.getCropCoOrds(motif);
                motif = this.cropSketch(motif, crop);

                motif = this.toSketch(motif);
                motif = this.tileUpSketch(motif);
                this.logSketchFrame(motif);

                // Uncomment thisto draw a box around every metamotif for testing
                if (this.borderMotif) {
                    let image = this.createSketch(motif.width, motif.height);
                    image.translate(motif.width /2, motif.height /2);
                    image.image(motif, 0, 0);
                    image.translate(-(motif.width /2), -(motif.height /2));
                    image.colorMode(this.sketch.RGB);
                    image.stroke('rgba(0,0,0,1)');
                    image.fill('rgba(0,0,0,0)');
                    image.noFill();
                    image.rect(0,0,motif.width,motif.height);
                    motif = image;
                }

                let newMotifW = Math.floor(cw / this.layer.pattern.rows) + 1;

                let newMotifH = Math.floor( (motif.height / motif.width) * newMotifW) + 1;

                console.log('newMotifW, newMotifH', newMotifW, newMotifH);


                motif = motif.get(0, 0, motif.width, motif.height);

                motif.resize(newMotifW, newMotifH);


                let mw = motif.width;
                let mh = motif.height;

                let mmx = layer.pattern.translate.x;
                let mmy = layer.pattern.translate.y;

                let cellw = mw + mmx;
                let cellh = mh + mmy;

                // console.log( layer.pattern.overlapX, layer.pattern.overlapY);
                if (typeof layer.pattern.overlapX === 'number' && typeof layer.pattern.overlapY === 'number') {
                    cellw -= (mw * layer.pattern.overlapX);
                    cellh -= (mh * layer.pattern.overlapY);
                }

                let rows = Math.floor((cw / (cellw)) + 1);
                let cols = Math.floor((ch / (cellh)) + 1);


                let lw = (cellw) * rows;
                let lh = (cellh) * cols;

                let sketch = this.getLayerPatternSketch(lw, lh);
                sketch.push();

                for (let row = 0; row < rows; row++) {

                    for (let col = 0; col < cols; col++) {

                        let cellx = ((row) * cellw);
                        let celly = (col) * cellh;

                        // No need to makea new motif on every loop, costs too much
                        // motif = this.makeMetaMotifSketch(layer, row, col, motifw, motifh);

                        cellx = cellx + (cellw / 2);
                        celly = celly + (cellh / 2);

                        this.sketch.noiseSeed(layer.pattern.noiseSeed);

                        let  c = this.sketch.noise(0.01 * (row * 10), 0.01 * (col * 10));
                        c = ((c / 100) * 30) + 0.7;
                        c *= layer.pattern.noiseMod;

                        let hasNoiseOffset = (typeof layer.pattern.offsetNoiseModifierX === 'number' && layer.pattern.offsetNoiseModifierY === 'number');
                        let cellOffsetX = 0;
                        let cellOffsetY = 0;
                        if (hasNoiseOffset) {
                            cellOffsetX = this.sketch.noise(0.01 * (row * layer.pattern.offsetNoiseModifierX), 0.01 * (col * layer.pattern.offsetNoiseModifierX));
                            cellOffsetY = this.sketch.noise(0.01 * (row * layer.pattern.offsetNoiseModifierY), 0.01 * (col * layer.pattern.offsetNoiseModifierY));
                        }

                        sketch.push();
                        sketch.tint(255, c);

                        if (this.shouldReflect(row, col)) {
                            cellx += Math.floor(cellw * cellOffsetX);
                            celly += Math.floor(cellh * cellOffsetY);
                            sketch.translate(cellx, celly);
                            sketch.scale(-1, 1);
                            sketch.image(motif, 0, 0);
                        } else {
                            cellx -= Math.floor(cellw * cellOffsetX);
                            celly -= Math.floor(cellh * cellOffsetY);
                            sketch.image(motif, cellx, celly);
                        }

                        sketch.pop();
                    }
                }


                this.applyTheseFiltersToSketch(layer.filters, sketch);

                sketch.pop();

                return sketch;

            },




            // Draw a layer on canvas
            drawLayer (key) {

                // Copy the layer settings
                this.layer = JSON.parse(JSON.stringify(this.design.layers[key]));

                // Need to get the actual characters for the motif here
                this.convertLayerCharacterArrayToString();

                // Create layer sketch
                let layer = this.makeSketchLayer(this.layer);
                this.logSketchFrame(layer);

                console.log('MIRRORS', this.layer.mirrors);

                // mirrorize
                if (typeof this.layer.mirrors.drawRotatedX === 'boolean' && typeof this.layer.mirrors.drawRotatedY === 'boolean') {

                    if (this.layer.mirrors.drawRotatedX) {
                        this.notes.push('draw rotated X');
                        layer = this.drawVerticalMirrorOnSketch(layer, this.layer.mirrors.start, this.layer.mirrors.x);
                    }
                    if (this.layer.mirrors.drawRotatedY) {
                        this.notes.push('draw rotated Y');
                        layer = this.drawHorizontalMirrorOnSketch(layer, this.layer.mirrors.start, this.layer.mirrors.y);
                    }

                } else {
                    if (this.layer.mirrors.drawRotated) {
                        layer = this.drawHorizontalMirrorOnSketch(layer, this.layer.mirrors.start, this.layer.mirrors.y);
                        layer = this.drawVerticalMirrorOnSketch(layer, this.layer.mirrors.start, this.layer.mirrors.x);
                    }
                }



                // let layer = this.makeMultiColorMotif(this.layer, 50, this.colors[0], 600, 600, 0, 0.05);
                // this.sketch.image(layer, 0, 0);
                // return;

                this.sketch.push();

                // Set blend mode
                if (typeof this.layer.blendMode === 'string') {
                    this.notes.push(this.layer.blendMode);
                    this.sketch.blendMode(this.layer.blendMode);
                }

                let pattern = this.getLayerSketch();

                let pw = pattern.width;
                let ph = pattern.height;
                let diagonal = Math.sqrt((pw * pw) + (ph * ph));

                let cover = this.helperCover(pw,ph, diagonal, diagonal);

                pattern.imageMode(this.sketch.CENTER);
                pattern.translate(pattern.width / 2, pattern.height / 2);
                pattern.rotate(this.layer.pattern.rotate);

                // pattern.image(layer,pattern.width /2, pattern.height /2,cover.width,cover.height);
                // pattern.image(layer,0,0,cover.width,cover.height);
                pattern.image(layer,0,0,layer.width,layer.height);

                // pattern.colorMode(this.sketch.RGB);
                // pattern.fill('rgb(255,0,0)');
                // pattern.rectMode(this.sketch.CENTER);
                // pattern.rect(0,0, 10, 10);


                // mirrorize here
                // this.notes.push([this.layer.mirrors.y, this.layer.mirrors.x, 'layer mirrors']);
                // this.notes.push([this.layer.mirrors.y, this.layer.mirrors.x, 'layer mirrors']);

                if (typeof this.layer.mirrors.drawStraightX === 'boolean' && typeof this.layer.mirrors.drawStraightY === 'boolean') {

                    if (this.layer.mirrors.drawStraightX) {
                        this.notes.push('draw straight X');
                        pattern = this.drawVerticalMirrorOnSketch(pattern, this.layer.mirrors.start, this.layer.mirrors.x);
                    }

                    if (this.layer.mirrors.drawStraightY) {
                        this.notes.push('draw straight Y');
                        pattern = this.drawHorizontalMirrorOnSketch(pattern, this.layer.mirrors.start, this.layer.mirrors.y);
                    }

                } else {

                    if (this.layer.mirrors.drawStraight) {
                        pattern = this.drawHorizontalMirrorOnSketch(pattern, this.layer.mirrors.start, this.layer.mirrors.y);
                        pattern = this.drawVerticalMirrorOnSketch(pattern, this.layer.mirrors.start, this.layer.mirrors.x);
                    }

                }

                console.log('TINTINTTGGG');



                // this.sketch.tint(this.randomInteger(10,200));
                this.sketch.tint(this.randomHue());

                this.sketch.imageMode(this.sketch.CENTER);

                // Draw transparent boxes over layer. doesnt look great so only happens 1 out of 10 layers
                if (this.layer.windows.draw) {
                    let windowMargin = this.layer.windows.margin;
                    let window = this.createSketch(pattern.width, pattern.height);

                    window.colorMode(this.sketch.RGB);
                    window.fill('rgba(255,255,255,1)');
                    window.noStroke();
                    window.translate(this.layer.windows.translate.x, this.layer.windows.translate.y);

                    let windowX = 0;
                    let windowY = 0;

                    while (windowX < pattern.width + 200) {
                        window.rect(windowX, 0, windowMargin, window.height + 200);
                        windowX += (windowMargin * 2);
                    }

                    while (windowY < pattern.height + 200) {
                        window.rect(0, windowY, window.width + 200, windowMargin);
                        windowY += (windowMargin * 2);
                    }

                    let img = this.sketch.createImage(pattern.width,pattern.height);
                    img.copy(pattern, 0, 0, pattern.width, pattern.height, 0, 0, pattern.width, pattern.height);
                    img.mask(window);

                    this.sketch.image(img, 0, 0, pattern.width, pattern.height);
                } else {
                    // this.moveToCenter();
                    // this.sketch.image(pattern, this.sketch.width / 2, this.sketch.height / 2, pattern.width, pattern.height);
                    this.sketch.image(pattern, 0, 0, pattern.width, pattern.height);
                    // this.sketch.colorMode(this.sketch.RGB);
                    // this.sketch.fill('rgb(255,0,0)');
                    // this.sketch.rectMode(this.sketch.CENTER);
                    // this.sketch.rect(0,0, 10, 10);
                }

                this.sketch.pop();

            },


            shouldReflect(row,col) {
                if (row % 2 === 0) {
                    return col % 2 === 0;
                } else {
                    return col % 2 === 1;
                }
            },

        }

    }

</script>
