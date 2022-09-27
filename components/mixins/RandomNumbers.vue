<script>
import md5 from "md5";
export default {
    methods: {
        makeNoiseSeed() {
            return this.randomInteger(999, 99999);
        },

        arrayRandom(array) {
            let min = 0;
            let max = array.length - 1;
            return array[Math.floor(Math.random() * (max - min + 1) + min)];
        },

        shuffle(array) {
            let currentIndex = array.length,
                temporaryValue,
                randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        },

        randomBoolean() {
            return this.randomInteger(0, 1) === 1;
        },

        randomSeededBoolean(seed) {
            return this.seededRandomInteger(0, 1, seed) === 1;
        },

        randomHue() {
            return this.randomInteger(0, 360);
        },

        randomOddInteger(min, max) {
            min = Math.max(2, min);
            let i = this.randomInteger(min, max);
            return i % 2 === 0 ? i - 1 : i;
        },

        randomEvenInteger(min, max) {
            let i = this.randomInteger(min, max);
            return i % 2 === 0 ? i : i + 1;
        },

        randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        seededRandomInteger(min, max, seed) {
            let range = max - min;
            seed = md5(seed);

            let number = seed.substr(0, 2);

            number = parseInt(number, 16);
            number = number / 255;
            number = number * range;
            number = min + number;
            number = Math.round(number);

            return number;
        },
    },
};
</script>
