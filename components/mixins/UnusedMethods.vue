<script>
    export default {

        methods: {

            makeSingleColorMotif(layer, fontSize, color, w, h, rotate, opacity = 1) {
                let sketch = this.createSketch(w, h);
                sketch = this.drawColoredMotifOnSketch(sketch, layer, fontSize, color, rotate, opacity);
                return sketch;
            },

            makeMotifSketch(layer, row = 0, col = 0, w = 500, h = 500) {

                let fontSize = 0 + layer.element.fontSize;
                let color = this.getHexColorForRowCol(row, col, layer);
                let sketch = this.createSketch(w, h);

                sketch = this.drawColoredMotifOnSketch(sketch, layer, fontSize, color, 0);

                return sketch;

            },


        }

    }

</script>
