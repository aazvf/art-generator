import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    // target: "static",
    buildModules: ["@nuxtjs/tailwindcss"],
    tailwindcss: {
        cssPath: "~/assets/css/tailwind.css",
        configPath: "tailwind.config.js",
        exposeConfig: true,
        config: {},
        injectPosition: 0,
        viewer: true,
    },
});
