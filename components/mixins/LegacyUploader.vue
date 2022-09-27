<script>
    export default {

        props: {

            uploadUrl: {type: String, default: ''}

        },

        methods: {



            uploadToServer () {

                let encodedImage = this.toJpeg();

                this.frames.push({
                    src: encodedImage
                });

                if (this.uploadUrl.length < 1) {
                    console.log('no upload url');
                    return;
                }

                const config = {headers: {'content-type': 'multipart/form-data'}};



                let formData = new FormData();

                // for (let formKey in crop.form.inputs) {
                //     formData.append(formKey, crop.form.inputs[formKey]);
                // }



                // formData.append('file', crop.src);
                formData.append('file', this.dataURItoBlob(encodedImage));
                // formData.append('file', this.dataURItoBlob(this.toPng()));

                console.log(formData);

                window.axios.post(this.uploadUrl, formData, config).then(response => {
                    console.log(response);
                }).catch((error) => {
                    // throw new Error(error.msg);
                    console.error('Upload error', error);
                    reject(error);
                });


            },


            dataURItoBlob(dataURI) {
                var binary = atob(dataURI.split(',')[1]);
                var array = [];
                for(var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
                // return new Blob([new Uint8Array(array)], {type: 'image/png'});
            },

            toPng () {
                return  document.getElementById('defaultCanvas0').toDataURL('image/png');
            },

            toJpeg () {
                return document.getElementById('defaultCanvas0').toDataURL('image/jpeg', 0.95);
            }


        }

    }

</script>
