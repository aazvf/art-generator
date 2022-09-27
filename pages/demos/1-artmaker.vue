
<template>
    <pattern-maker-uploader
        :save="false"
        :crops="[{x: 400, y: 400, divide: 1}]"
        :downsize_x="0"
        store_is_white_url
        encoded_design
        background
        art-image-background
        storeroute="/store"
        version="12"
    />
</template>

<script setup>
useHead({
    title: "Pattern maker",
});
</script>


<script>
definePageMeta({
    // middleware: "front-redirect",
});

// Object.assign(document.createElement('a'), {download: "my-image.png", href: document.querySelector(".drawing-board-canvas").toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream")}).click();
// Object.assign(document.createElement('a'), {download: document.querySelector('[placeholder="Add prompt"').value.replace(/[^A-Za-z0-9\s]/g,'').replaceAll(' ','+') + ".png", href: document.querySelector(".drawing-board-canvas").toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream")}).click();

// document.querySelector(".drawing-board-canvas").toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream")

// var canvas = document.querySelector(".drawing-board-canvas");
//         var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
//         var link = document.createElement('a');
//         link.download = "my-image.png";
//         link.href = image;
//         link.click();
</script>


  <!-- var canvas = document.querySelector(".drawing-board-canvas");
  image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "my-image.png";
  link.href = image;
  link.innerText = "download";
  canvas.parentNode.insertBefore(link, canvas);

  link.click();

var canvas = document.querySelector(".drawing-board-canvas");
        var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "my-image.png";
        link.href = image;
        link.click(); -->