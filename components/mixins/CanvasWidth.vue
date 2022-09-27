<script>
    export default {

        computed: {

            canvasWidth: function () {

                // return 250;

                return this.$refs.container.clientWidth;
            },

            canvasHeight: function () {

                // return 250;

                return this.$refs.container.clientHeight;
            },

        },

    }

</script>
