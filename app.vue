<template>
    <div class="mx-auto">
        <!-- <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>-->

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
    </div>
</template>



<script setup>
// https://v3.nuxtjs.org/guide/features/head-management/
useHead({
    titleTemplate: "Original pattern maker - %s",
    title: "Pattern maker",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1.5",
    charset: "utf-8",
    meta: [
        {
            name: "Original pattern maker",
            content: "Randomly generated 'art' in all sorts of colours.",
        },
    ],
    htmlAttrs: {
        class: "dark",
    },
    bodyAttrs: {
        // class: "bg-lime-100 dark:bg-gray-900 font-sans",
    },
});
</script>


<script>
export default defineComponent({
    computed: {
        containerClassList() {
            return ["p-1 md:p-5"];
        },
        themeClassList() {
            const { bg1, text1, align, transform } = this.$theme;
            return [
                "w-full min-h-screen subpixel-antialiased",
                "bg-slate-100",
                "text-slate-900",
                "text-left",
            ];
        },
    },
    mounted() {},
});
</script>
