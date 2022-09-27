<script>
export default {
    methods: {
        generateNewDesign() {
            let hueCount = this.randomInteger(
                this.settings.rng.minHueCount,
                this.settings.rng.maxHueCount
            );

            let backgroundHue = this.randomHue();

            // let backgroundColors = this.getColorsFromMode(
            //     backgroundHue,
            //     this.arrayRandom(this.settings.backgroundColorSchemes),
            //     this.arrayRandom(this.settings.backgroundColorModes),
            // );

            let backgroundColors = [];

            for (let c = 0; c < 4; c++) {
                backgroundColors = backgroundColors.concat(
                    this.getColorsFromMode(
                        this.randomHue(),
                        this.arrayRandom(this.settings.backgroundColorSchemes),
                        this.arrayRandom(this.settings.backgroundColorModes)
                    )
                );
            }

            let colorHues = [];
            colorHues.push(backgroundHue);
            for (let c = 0; c < hueCount; c++) {
                colorHues.push(this.randomHue());
            }

            let colors = [];
            colors = colors.concat(backgroundColors);
            for (let hue of colorHues) {
                let colorScheme = this.arrayRandom(this.settings.colorSchemes);
                let colorMode = this.arrayRandom(this.settings.colorModes);
                // this.notes.push([hue, colorScheme, colorMode]);
                colors = colors.concat(
                    this.getColorsFromMode(hue, colorScheme, colorMode)
                );
            }

            this.colors = colors;
            this.backgroundColors = backgroundColors;

            let layers = [];

            let layerCount = this.randomInteger(
                this.settings.rng.minLayerCount,
                this.settings.rng.maxLayerCount
            );

            if (hueCount < 1) {
                layerCount = Math.max(
                    this.settings.rng.maxLayerCount,
                    layerCount + 2
                );
            }

            // let motifOperations = JSON.parse(JSON.stringify(this.settings.patternOperations));
            // let patternOperations = JSON.parse(JSON.stringify(this.settings.patternOperations));
            //
            // motifOperations = this.shuffle(motifOperations);
            // patternOperations = this.shuffle(patternOperations);

            let frameDivide =
                typeof this.currentCrop.divide === "number"
                    ? this.currentCrop.divide
                    : 20;
            // console.log('frameDivide', frameDivide);
            this.design = {
                colors: colors,
                backgroundColors: backgroundColors,
                font: this.design.font,
                // layers: layers,
                mirrors: {},
                background: this.background,
                version: this.version,
                blendMode: this.arrayRandom(this.settings.blendModes),
                // underlayDots: underlayDots,
                // overlayDots: overlayDots,
                noiseSeed: this.randomInteger(999, 99999),
                strokeCap: this.arrayRandom(this.settings.strokeCaps),
                useFilters: this.randomBoolean(),
                frameDivide: frameDivide,
                cropRotations: [
                    this.randomHue(),
                    this.randomHue(),
                    this.randomHue(),
                    this.randomHue(),
                    this.randomHue(),
                ],
            };

            this.getColours();

            let mirrorChance = 50 / layerCount;

            for (let l = 0; l < layerCount; l++) {
                layers.push(this.generateLayer(l, colorHues));
            }

            // Sort layers so it renders largest font sizes then smallest.
            layers.sort(function (a, b) {
                const bandA = b.element.fontSize * b.motif.scaleUp;
                const bandB = a.element.fontSize * a.motif.scaleUp;
                let comparison = 0;
                if (bandA > bandB) {
                    comparison = 1;
                } else if (bandA < bandB) {
                    comparison = -1;
                }
                return comparison;
            });

            this.design.layers = layers;

            this.design.bigMotifLayer = this.generateLayer(
                layerCount,
                colorHues
            );
            // this.design.bigMotifLayer.motif.scaleUp = 1.2;
            this.design.bigMotifLayer.motif.scaleUp = 3;
            this.design.bigMotifLayer.pattern.noiseMod = 1.2;
            this.design.bigMotifLayer.blendMode = this.sketch.BLEND;

            this.design.bigMotif = {
                // draw: this.randomInteger(0,100) < 75,
                draw: true,
                translate: {
                    x: this.randomInteger(0, 100) / 100,
                    y: this.randomInteger(0, 100) / 100,
                },
            };

            // let underlayDots = this.makeDotsLayer(colorHues);
            // let overlayDots = this.makeDotsLayer(colorHues);

            this.design.underlayDots = this.makeDotsLayer(colorHues);
            // this.design.overlayDots = this.makeDotsLayer(colorHues);
            this.design.overlayDots = false;

            // let mirrorStart = this.randomInteger(0, (this.canvasWidth / 25)) * (this.design.overlayDots.pixelSize + (this.design.overlayDots.pixelGap / 2));

            this.design.mirrors = {
                // x: this.arrayRandom(this.settings.mirrorXChances),
                // y: this.arrayRandom(this.settings.mirrorYChances),
                x: 1,
                y: 1,
                // x: this.randomOddInteger(1, 6),
                // y: this.randomOddInteger(1, 6),
                // x: 0,
                // y: 0,
                // x: this.randomInteger(0,100) > 80 ?  1 : 0,
                // x: 1,
                // x: this.randomInteger(0,100) > 50 ? this.randomOddInteger(0,5) : 1,
                // y: this.randomInteger(0,100) > 50 ? this.randomOddInteger(0,5) : 0,
                // x: this.randomInteger(0,1),
                // y: this.randomBoolean() ? this.randomOddInteger(0,5) : 0,
                // y: 1,
                start: this.randomInteger(0, 100),
                startRatio: this.randomInteger(25, 75) / 100,
                // start: mirrorStart,
                draw: false,
            };

            this.pickNewLayerColors();

            this.design.backgroundPoints = this.generateBackgroundPoints();
            this.design.backgroundMirrors = {
                draw: true,
                // x: this.arrayRandom(this.settings.mirrorXChances),
                // y: this.arrayRandom(this.settings.mirrorYChances),
                x: this.randomOddInteger(1, 5),
                y: this.randomOddInteger(1, 5),
                // x: 1,
                // y: 1,
                // x: 0,
                // y: 0,
                // x: this.randomInteger(0,1),
                // y: this.randomInteger(0,1),
                // start: 0,
                startRatio: this.randomInteger(25, 75) / 100,
                start: this.randomInteger(0, 100),
            };

            //
            // let blendModes = JSON.parse(JSON.stringify(this.settings.blendModes));
            // let blendMode = '';
            // for (let layerKey = 0; layerKey < layers.length; layerKey++) {
            //
            //     if ((this.randomInteger(0,100) > 25) || (layerKey >= (layers.length - 1))) {
            //         blendMode = this.arrayRandom(this.settings.safeBlendModes);
            //     } else {
            //         blendMode = this.arrayRandom(blendModes);
            //     }
            //
            //     // if (layerKey >= 1) {
            //     //     blendMode = this.arrayRandom(this.settings.safeBlendModes);
            //     // } else {
            //     //     blendMode = this.arrayRandom(blendModes);
            //     // }
            //     if (this.settings.unsafeBlendModes.indexOf(blendMode) > -1) {
            //         let index = blendModes.indexOf(blendMode);
            //         if (index > -1) {
            //             blendModes.splice(index, 1);
            //         }
            //         if (layerKey > (layers.length / 3)) {
            //             blendMode = this.arrayRandom(blendModes);
            //         }
            //     }
            //     layers[layerKey].blendMode = blendMode;
            // }
            //

            let blendModes = JSON.parse(
                JSON.stringify(this.settings.blendModes)
            );
            let blendMode = "";

            for (let layerKey = 0; layerKey < layers.length; layerKey++) {
                if (blendModes.length > 0) {
                    blendMode = this.arrayRandom(blendModes);
                } else {
                    blendMode = this.sketch.BLEND;
                }

                // layers[layerKey].mirrors.drawRotated = this.randomInteger(0,100) > (70 + (mirrorChance * (layerKey+1)));
                // layers[layerKey].mirrors.drawStraight = this.randomInteger(0,100) > (70 + (mirrorChance * (layerKey+1)));

                layers[layerKey].blendMode = blendMode;
                layers[layerKey].backgrounds = [];
                layers[layerKey].pattern.noiseMod = (10 - layerKey) / 10;

                for (let l = 0; l < layers[layerKey].element.repeatLimit; l++) {
                    layers[layerKey].backgrounds.push(
                        this.generateMotifBackgroundPoints(4, 8, 3)
                    );
                }

                let index = blendModes.indexOf(blendMode);
                if (index > -1) {
                    blendModes.splice(index, 1);
                }
            }
        },

        generateLayer(l, colorHues) {
            let colorColumns = [];
            let colorColumnCount = this.randomInteger(
                this.settings.rng.minColorColumn,
                this.settings.rng.maxColorColumn
            );

            for (let c = 0; c < colorColumnCount; c++) {
                colorColumns.push(this.randomInteger(1, 100));
            }

            // Lets not have 4 of things... you know why
            let piecesCount = this.randomInteger(
                this.settings.rng.minMotifPieces,
                this.settings.rng.maxMotifPieces
            );
            while (piecesCount === 4) {
                piecesCount = this.randomInteger(
                    this.settings.rng.minMotifPieces,
                    this.settings.rng.maxMotifPieces
                );
            }

            let rowColumnCount = this.randomInteger(
                this.settings.rng.minPatternRows,
                this.settings.rng.maxPatternRows
            );
            let columnCount = this.randomInteger(
                this.settings.rng.minPatternCols,
                this.settings.rng.maxPatternCols
            );

            let charCount = this.arrayRandom(1, 1, 1, 1, 2, 2, 2, 3, 3);

            // Lets not repeat motifs by 4 times.
            let repeatCount = this.randomInteger(
                this.settings.rng.minMotifRepeatLimit,
                this.settings.rng.maxMotifRepeatLimit
            );
            while (repeatCount === 4) {
                repeatCount = this.randomInteger(
                    this.settings.rng.minMotifRepeatLimit,
                    this.settings.rng.maxMotifRepeatLimit
                );
            }

            let elementFontSize = this.randomInteger(
                this.settings.rng.minFontSize,
                this.settings.rng.maxFontSize
            );

            // avoid 90 degree rotation
            let elementRotate = this.randomHue();
            while (this.isNear90Degrees(elementRotate)) {
                elementRotate = this.randomHue();
            }

            // avoid 90 degree rotation
            let elementRepeatRotate = this.randomHue();
            while (this.isNear90Degrees(elementRepeatRotate)) {
                elementRepeatRotate = this.randomHue();
            }

            let backgrounds = [];
            for (let b = 0; b < repeatCount; b++) {
                backgrounds.push(this.generateMotifBackgroundPoints(1, 2, 20));
            }

            let layerColors = [];
            let colorCount = this.randomInteger(
                this.settings.rng.minPatternColorCount,
                this.settings.rng.maxPatternColorCount
            );
            for (let c = 0; c < colorCount; c++) {
                layerColors.push(this.randomColor());
            }

            return {
                element: {
                    chars: this.randomCharArray(charCount),
                    character: "",
                    // overlayCharacters: this.randomBoolean(),
                    overlayCharacters: false,
                    fontSize: elementFontSize,
                    strokeWeight: this.arrayRandom(this.settings.strokeWeights),
                    textStyle: this.arrayRandom(this.settings.textStyles),
                    translate: {
                        x: this.randomInteger(
                            this.settings.rng.minElTranslate,
                            this.settings.rng.maxElTranslate
                        ),
                        y: this.randomInteger(
                            this.settings.rng.minElTranslate,
                            this.settings.rng.maxElTranslate
                        ),
                    },
                    rotate: elementRotate,
                    repeatLimit: repeatCount,
                    repeatRotate: elementRepeatRotate,
                    repeatScaleDown: this.randomInteger(60, 95) / 100,
                    repeatColorJumpRow: this.randomInteger(1, 5),
                    repeatColorJumpCol: this.randomInteger(1, 5),
                },
                motif: {
                    scale: 1,
                    // scale: this.randomInteger(2, 3),
                    // operation: this.arrayRandom(this.settings.patternOperations),
                    // operation: motifOperations[l % motifOperations.length],
                    pieces: piecesCount,
                    translate: {
                        x: this.randomInteger(
                            this.settings.rng.minTranslate,
                            this.settings.rng.maxTranslate
                        ),
                        y: this.randomInteger(
                            this.settings.rng.minTranslate,
                            this.settings.rng.maxTranslate
                        ),
                    },
                    rotate: this.randomHue(),
                    outline: this.randomInteger(0, 100) < 25,
                    // stroke: this.randomInteger(1,5),
                    stroke: 0,
                    // scaleUp: 1,
                    scaleUp: this.randomInteger(10, 15) / 10,
                },
                metamotif: {
                    pieces: 1,
                    // pieces: this.arrayRandom([1,2,3,5]),
                    translate: {
                        // x: this.randomInteger(-10,100),
                        // y: this.randomInteger(-10,100),
                        x: this.randomInteger(
                            -10,
                            Math.floor(elementFontSize * 0.6)
                        ),
                        y: this.randomInteger(
                            -10,
                            Math.floor(elementFontSize * 0.6)
                        ),
                    },
                },
                pattern: {
                    // operation: this.arrayRandom(this.settings.patternOperations),
                    // operation: patternOperations[l % patternOperations.length],
                    colors: layerColors,
                    colorColumns: colorColumns,
                    rows: rowColumnCount,
                    // rows: this.randomInteger(this.settings.rng.minPatternRows, this.settings.rng.maxPatternRows),
                    // columns: rowColumnCount,
                    columns: columnCount,
                    // columns: this.randomInteger(this.settings.rng.minPatternCols, this.settings.rng.maxPatternCols),
                    translate: {
                        x: this.randomInteger(
                            this.settings.rng.minLayerTranslate,
                            this.settings.rng.maxLayerTranslate
                        ),
                        y: this.randomInteger(
                            this.settings.rng.minLayerTranslate,
                            this.settings.rng.maxLayerTranslate
                        ),
                    },
                    rotate: this.randomHue(),
                    exclude: this.randomInteger(
                        this.settings.rng.minPatternExclude,
                        this.settings.rng.maxPatternExclude
                    ),
                    noiseSeed: this.makeNoiseSeed(),
                    noiseMod: (10 - l) / 10,
                    // noiseMod: this.randomInteger((9 - l), 9)
                    // overlapX: this.randomInteger(10,40) / 100,
                    // overlapY: this.randomInteger(10,40) / 100,
                    overlapX: 0,
                    overlapY: 0,
                    offsetNoiseModifierX: this.randomInteger(1, 300),
                    offsetNoiseModifierY: this.randomInteger(1, 300),
                },
                background: null,
                backgrounds: backgrounds,
                blendMode: this.arrayRandom(this.settings.blendModes),

                filters: this.randomFilters(),
                // tint: (this.randomBoolean() ? this.randomInteger(0,5) : 255),
                dots: this.makeDotsLayer(colorHues),
                windows: {
                    draw: false,
                    // draw: this.randomInteger(0,100) < 10,
                    margin: this.randomInteger(5, 30),
                    translate: {
                        x: -this.randomInteger(50, 100),
                        y: -this.randomInteger(50, 100),
                    },
                },
                mirrors: {
                    x: this.randomOddInteger(
                        this.settings.rng.layerMirrorsMin,
                        this.settings.rng.layerMirrorsMax
                    ),
                    y: this.randomOddInteger(
                        this.settings.rng.layerMirrorsMin,
                        this.settings.rng.layerMirrorsMax
                    ),
                    start: this.randomInteger(0, 50),
                    drawRotated: true,
                    drawRotatedX: true,
                    drawRotatedY: true,
                    drawStraight: false,
                    drawStraightX: false,
                    drawStraightY: false,

                    // drawRotated: this.randomBoolean(),
                    // drawRotatedX: this.randomBoolean(),
                    // drawRotatedY: this.randomBoolean(),
                    // drawStraight: this.randomBoolean(),
                    // drawStraightX: this.randomBoolean(),
                    // drawStraightY: this.randomBoolean(),
                },
                // blendMode: this.arrayRandom(this.settings.blendModes),
            };
        },

        isNear90Degrees(number) {
            return number % 90 < 5 || number % 90 > 85;
        },

        // ------------------------------ pickers

        pickNewLayerColors() {
            this.getColours();
            for (let l = 0; l < this.design.layers.length; l++) {
                let layerColors = [];
                let colorCount = this.randomInteger(
                    this.settings.rng.minPatternColorCount,
                    this.settings.rng.maxPatternColorCount
                );
                for (let c = 0; c < colorCount; c++) {
                    layerColors.push(this.randomColor());
                }
                this.design.layers[l].pattern.colors = layerColors;
            }
        },

        pickNewElementExclude() {
            for (let l = 0; l < this.design.layers.length; l++) {
                this.design.layers[l].pattern.exclude = this.randomInteger(
                    this.settings.rng.minPatternExclude,
                    this.settings.rng.maxPatternExclude
                );
            }
        },

        pickNewElementChars() {
            for (let l = 0; l < this.design.layers.length; l++) {
                this.design.layers[l].element.chars = this.randomCharArray();
            }
        },

        pickNewElementRotate() {
            for (let l = 0; l < this.design.layers.length; l++) {
                this.design.layers[l].motif.rotate = this.randomHue();
                this.design.layers[l].element.rotate = this.randomHue();
            }
        },

        // ------------------------------ random helpers

        randomBackgroundColor() {
            if (typeof this.design.backgroundColors === "object") {
                return this.design.backgroundColors[
                    this.randomInteger(
                        0,
                        this.design.backgroundColors.length - 1
                    )
                ];
            } else {
                console.log("cant find background colors");
                return this.randomColor();
            }
        },

        randomColor() {
            return this.colors[this.randomInteger(0, this.colors.length - 1)];
        },

        charsToString(chars) {
            let response = "";
            for (let c = 0; c < chars.length; c++) {
                response += this.fontCharString[chars[c]];
            }
            return response;
        },

        randomCharacter() {
            let response = "";
            response += this.randomSingleCharacter();
            if (this.randomBoolean()) {
                response += this.randomSingleCharacter();
                if (this.randomBoolean()) {
                    response += this.randomSingleCharacter();
                }
            }
            return response;
        },

        randomCharArray(charCount = 3) {
            let response = [];
            for (let c = 0; c < charCount; c++) {
                response.push(this.randomSingleChar());
            }
            return response;
        },

        randomSingleChar() {
            return Math.floor(Math.random() * this.fontCharString.length);
        },

        randomSingleCharacter() {
            let char = Math.floor(Math.random() * this.fontCharString.length);
            return this.fontCharString[char];
        },

        randomMutateFilters() {
            let filters = [];

            if (this.randomBoolean()) {
                filters.push(this.arrayRandom(this.settings.mutateFilters));
                if (this.randomBoolean()) {
                    filters.push(this.arrayRandom(this.settings.mutateFilters));
                }
            }
            return filters;
        },

        randomFilters() {
            let filters = [];

            if (!this.settings.useFilters) {
                return filters;
            }

            // if (this.randomBoolean()) {
            if (this.randomInteger(0, 100) < 25) {
                filters.push(this.arrayRandom(this.settings.filters));
                // if (this.randomBoolean()) {
                //     filters.push(this.arrayRandom(this.settings.filters));
                // }
            }
            return filters;
        },
    },
};
</script>
