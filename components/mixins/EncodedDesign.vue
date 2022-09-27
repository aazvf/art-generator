<script>
    export default {

        computed: {

            storeDesignUrl: function () {
                return this.storeroute;
                    // '?design_id=' + this.design.background + '&encoded_design=' + this.getEncodedDesign();
                // return this.storeroute + '?design_id=' + this.design.background + '&encoded_design=' + this.getEncodedDesign();
            }

        },

        methods: {

            convertLayerCharacterArrayToString() {
                this.layer.element.character = this.charsToString(this.layer.element.chars);
            },

            // Puts the encoded design in the url, disabled for now
            putDesignInUrl () {
                // return;
                window.location.hash = this.getEncodedDesign();
            },

            getEncodedDesign () {
                return btoa(JSON.stringify(this.design));
            },

            restoreDataDesign (data) {

                if(window.location.hash && window.location.hash.length > 10) {
                    let design = JSON.parse(atob(window.location.hash.substr(1)));
                    if (design) {
                        data.loadedFromJson = true;
                        data.design = design;
                    }
                }

                if (typeof this.encoded_design === 'string' && this.encoded_design.length > 10) {
                    console.log('loading encoded_design from html');
                    let design = JSON.parse(atob(this.encoded_design));
                    if (design) {
                        data.loadedFromJson = true;
                        data.design = design;
                    }
                }

                return data;

            }


        }

    }

</script>
