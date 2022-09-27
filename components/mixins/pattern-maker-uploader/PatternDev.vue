<script>
    export default {

        methods: {


            newPattern() {
                this.hasSaved = false;
                this.loadedFromJson = false;
                this.frames = [];
                this.cropIteration = 0;
                this.frameIteration = 0;
                this.patternSizes = [];
                this.determinedIsWhite = false;
                this.setCurrentCrop();
                setTimeout(this.p5Draw, 500);

            },

        }

    }

</script>
