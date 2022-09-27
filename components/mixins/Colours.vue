<script>
import ColorScheme from "color-scheme";

export default {
    methods: {
        getColours() {
            if (typeof this.design.colors === "object") {
                this.colors = this.design.colors;
                if (typeof this.design.backgroundColors === "object") {
                    this.backgroundColors = this.design.backgroundColors;
                }
                return;
            }

            // Generate lots of hues
            let colors = [];
            for (let hue of this.design.colorHues) {
                colors = colors.concat(this.getColorsFromHue(hue));
            }
            this.colors = colors;
            this.design.colors = colors;
        },

        getColorsFromHue(hue) {
            let scheme = new ColorScheme();
            scheme
                .from_hue(hue)
                .scheme(this.design.colorScheme)
                .variation(this.design.colorMode);
            return scheme.colors();
        },

        getColorsFromMode(hue, colorScheme, colorMode) {
            let scheme = new ColorScheme();
            scheme
                .from_hue(hue)
                .scheme(colorScheme)
                .add_complement(false)
                .variation(colorMode);
            return scheme.colors();
        },

        setColorForMotif(row, col) {
            let colorKey =
                (row +
                    this.layer.pattern.colorColumns[
                        col % this.layer.pattern.colorColumns.length
                    ]) %
                this.layer.pattern.colors.length;
            let color = this.layer.pattern.colors[colorKey];
            this.setFillColor(color);
        },

        setLayerNoiseColorForMotif(row, col, sketch) {
            let colorKey =
                (row +
                    this.layer.pattern.colorColumns[
                        col % this.layer.pattern.colorColumns.length
                    ]) %
                this.layer.pattern.colors.length;
            let color = this.layer.pattern.colors[colorKey];

            let fill = this.hexToHSL("#" + color);
            fill = this.hslToRgb(fill[0] / 360, fill[1] / 100, fill[2] / 100);

            sketch.colorMode(sketch.RGB);

            sketch.noiseSeed(this.layer.pattern.noiseSeed);
            let c = sketch.noise(0.01 * row, 0.01 * col);

            c *= this.layer.pattern.noiseMod;

            let rgba =
                "rgba(" +
                fill[0] +
                ", " +
                fill[1] +
                ", " +
                fill[2] +
                ", " +
                c +
                ")";
            // let rgba = "rgb(" + fill[0] + ", " + fill[1] + ", " + fill[2] + ")";
            // console.log(rgba);
            sketch.fill(rgba);
            sketch.stroke(rgba);
            sketch.colorMode(sketch.HSL);

            return sketch;
        },

        setNoiseColorForMotif(row, col) {
            let colorKey =
                (row +
                    this.layer.pattern.colorColumns[
                        col % this.layer.pattern.colorColumns.length
                    ]) %
                this.layer.pattern.colors.length;
            let color = this.layer.pattern.colors[colorKey];

            let fill = this.hexToHSL("#" + color);
            fill = this.hslToRgb(fill[0] / 360, fill[1] / 100, fill[2] / 100);

            this.sketch.colorMode(this.sketch.RGB);

            this.sketch.noiseSeed(this.layer.pattern.noiseSeed);
            let c = this.sketch.noise(0.01 * row, 0.01 * col);

            c *= this.layer.pattern.noiseMod;

            let rgba =
                "rgba(" +
                fill[0] +
                ", " +
                fill[1] +
                ", " +
                fill[2] +
                ", " +
                c +
                ")";
            // let rgba = "rgb(" + fill[0] + ", " + fill[1] + ", " + fill[2] + ")";
            // console.log(rgba);
            this.sketch.fill(rgba);
            this.sketch.stroke(rgba);
            this.sketch.colorMode(this.sketch.HSL);
        },

        getHexColorForRowCol(row, col, layer) {
            let colorKey =
                (row +
                    layer.pattern.colorColumns[
                        col % layer.pattern.colorColumns.length
                    ]) %
                layer.pattern.colors.length;
            return layer.pattern.colors[colorKey];
        },

        setSketchColor(row, col, sketch, layer) {
            let colorKey =
                (row +
                    layer.pattern.colorColumns[
                        col % layer.pattern.colorColumns.length
                    ]) %
                layer.pattern.colors.length;
            let color = layer.pattern.colors[colorKey];

            let fill = this.hexToHSL("#" + color);

            sketch.noFill();

            sketch.fill(fill[0], fill[1], fill[2]);
            sketch.stroke(fill[0], fill[1], fill[2]);

            return sketch;
        },

        setSketchColorAlphaFromHex(sketch, hex, alpha) {
            let fill = this.hexToHSL("#" + hex);
            fill = this.hslToRgb(fill[0], fill[1], fill[2]);

            sketch.colorMode(this.sketch.RGB);

            // sketch.fill(fill[0], fill[1], fill[2]);
            // sketch.stroke(fill[0], fill[1], fill[2]);
            sketch.fill(
                "rgba(" +
                    fill[0] +
                    ", " +
                    fill[1] +
                    ", " +
                    fill[2] +
                    ", " +
                    alpha +
                    ")"
            );
            sketch.stroke(
                "rgba(" +
                    fill[0] +
                    ", " +
                    fill[1] +
                    ", " +
                    fill[2] +
                    ", " +
                    alpha +
                    ")"
            );
            // sketch.noFill();

            return sketch;
        },

        setSketchColorFromHex(sketch, hex) {
            let fill = this.hexToHSL("#" + hex);

            // sketch.noFill();

            sketch.fill(fill[0], fill[1], fill[2]);
            sketch.stroke(fill[0], fill[1], fill[2]);

            return sketch;
        },

        setColorForSketch(row, col, sketch) {
            let colorKey =
                (row +
                    this.layer.pattern.colorColumns[
                        col % this.layer.pattern.colorColumns.length
                    ]) %
                this.layer.pattern.colors.length;
            let color = this.layer.pattern.colors[colorKey];

            let fill = this.hexToHSL("#" + color);

            sketch.noFill();

            sketch.fill(fill[0], fill[1], fill[2]);
            sketch.stroke(fill[0], fill[1], fill[2]);
        },

        setFillColor(color) {
            let fill = this.hexToHSL("#" + color);

            this.sketch.noFill();

            this.sketch.fill(fill[0], fill[1], fill[2]);
            this.sketch.stroke(fill[0], fill[1], fill[2]);
        },
    },
};
</script>
