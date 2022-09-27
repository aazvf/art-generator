<script>
    export default {

        methods: {

            setCurrentCrop () {
                if (typeof this.crops[this.cropIteration] === 'object') {
                    this.currentCrop = this.crops[this.cropIteration];
                } else {
                    this.currentCrop = {
                        x: 100,
                        y: 100,
                        divide: 12,
                    };
                }
                if (typeof this.currentCrop.divide === 'number') {
                    this.frameDivide = this.currentCrop.divide;
                }

                // this.setCanvasWidthHeight();
                // console.log(this.currentCrop);
            },

            iterateCrop () {
                this.cropIteration++;
            },


            uploadCrops () {

                const config = {headers: {'content-type': 'multipart/form-data'}};
                let promises = [];

                for (let crop of this.crops) {

                    if (typeof crop.form !== 'object') {
                        continue;
                    }

                    let endpoint = crop.form.endpoint

                    promises.push(
                        new Promise((resolve, reject) => {

                            let formData = new FormData();

                            for (let formKey in crop.form.inputs) {
                                formData.append(formKey, crop.form.inputs[formKey]);
                            }

                            formData.append('file', this.dataURItoBlob(crop.src));

                            window.axios.post(endpoint, formData, config).then(response => {
                                console.log('uploaded ' + crop.form.url);
                                crop.form.done = true;
                                resolve();
                            }).catch((error) => {
                                // throw new Error(error.msg);
                                console.error('Upload error', error);
                                reject(error);
                            });

                        })
                    )

                }

                return Promise.all(promises);

                // Promise.all(promises).then((values) => {
                //     console.log('completed uploading all');
                //
                //     this.readyForScreenshot();
                // });

            },

        }

    }

</script>
