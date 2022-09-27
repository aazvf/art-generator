<script>
    export default {

        methods: {

            saveFrame() {

                this.frames.push({
                    src: this.toJpeg(),
                    x: this.sketch.width,
                    y: this.sketch.height,
                });
            },


            toJpeg(quality = 0.97) {
                return this.sketch.canvas.toDataURL('image/jpeg', quality);
                // return document.getElementById('defaultCanvas0').toDataURL('image/jpeg', quality);
            },

            toPng () {
                return this.sketch.canvas.toDataURL('image/png');
                // return document.getElementById('defaultCanvas0').toDataURL('image/png');
            },

            dataURItoBlob(dataURI) {
                var binary = atob(dataURI.split(',')[1]);
                var array = [];
                for(var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
            },

        }

    }

</script>
