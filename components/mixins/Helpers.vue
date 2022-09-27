<script>
import md5 from "md5";

export default {
    methods: {
        md5(data) {
            return md5(data);
        },

        notReadyForScreenshot() {
            window.status = "loading";
            // $.holdReady(true);
        },

        readyForScreenshot() {
            window.status = "ready";
            // $.holdReady(false);
        },

        trig(x1, x2, y1, y2) {
            return Math.abs(
                Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            );
        },

        weightedAverage(input) {
            let value = 0;
            let totalWeight = 0;
            for (let i = 0; i < input.length; i++) {
                value = value + input[i][0] * input[i][1];
                totalWeight += input[i][1];
            }
            return value / (totalWeight / input.length) / input.length;
        },

        hexToHSL(H) {
            // Convert hex to RGB first
            let r = 0,
                g = 0,
                b = 0;
            if (H.length == 4) {
                r = "0x" + H[1] + H[1];
                g = "0x" + H[2] + H[2];
                b = "0x" + H[3] + H[3];
            } else if (H.length == 7) {
                r = "0x" + H[1] + H[2];
                g = "0x" + H[3] + H[4];
                b = "0x" + H[5] + H[6];
            }
            // Then to HSL
            r /= 255;
            g /= 255;
            b /= 255;
            let cmin = Math.min(r, g, b),
                cmax = Math.max(r, g, b),
                delta = cmax - cmin,
                h = 0,
                s = 0,
                l = 0;

            if (delta == 0) h = 0;
            else if (cmax == r) h = ((g - b) / delta) % 6;
            else if (cmax == g) h = (b - r) / delta + 2;
            else h = (r - g) / delta + 4;

            h = Math.round(h * 60);

            if (h < 0) h += 360;

            l = (cmax + cmin) / 2;
            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);

            return [h, s, l];
        },

        hslToRgb(h, s, l) {
            let r, g, b;

            if (s == 0) {
                r = g = b = l; // achromatic
            } else {
                let hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };

                let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                let p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }

            return [
                Math.round(r * 255),
                Math.round(g * 255),
                Math.round(b * 255),
            ];
        },

        helperCover(
            contentWidth,
            contentHeight,
            containerWidth,
            containerHeight,
            offsetLeft,
            offsetTop
        ) {
            var contentRatio = contentWidth / contentHeight;
            var containerRatio = containerWidth / containerHeight;
            var resultHeight;
            var resultWidth;
            offsetLeft = typeof offsetLeft === "undefined" ? 0.5 : offsetLeft;
            offsetTop = typeof offsetTop === "undefined" ? 0.5 : offsetTop;
            if (contentRatio > containerRatio) {
                resultHeight = containerHeight;
                resultWidth = containerHeight * contentRatio;
            } else {
                resultWidth = containerWidth;
                resultHeight = containerWidth / contentRatio;
            }
            return {
                width: resultWidth,
                height: resultHeight,
                offsetLeft: (containerWidth - resultWidth) * offsetLeft,
                offsetTop: (containerHeight - resultHeight) * offsetTop,
            };
        },
    },
};
</script>
