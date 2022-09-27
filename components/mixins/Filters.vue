<script>
    export default {

        methods: {



            applyFilters () {
                this.applyTheseFilters(this.layer.filters);
            },

            applyTheseFilters (filters) {
                for (let f = 0; f < filters.length; f++) {
                    if (typeof filters[f] === 'object') {
                        if (typeof filters[f][1] !== "undefined") {
                            this.sketch.filter(filters[f][0], filters[f][1]);
                        } else {
                            this.sketch.filter(filters[f][0]);
                        }
                    }
                }
            },

            applyTheseFiltersToSketch (filters, sketch) {
                for (let f = 0; f < filters.length; f++) {
                    if (typeof filters[f] === 'object') {
                        this.notes.push('applying filter ' + filters[f][0]);
                        if (typeof filters[f][1] !== "undefined") {
                            sketch.filter(filters[f][0], filters[f][1]);
                        } else {
                            sketch.filter(filters[f][0]);
                        }
                    }
                }
            },


        }

    }

</script>
