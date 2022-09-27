<script>
    export default {

        methods: {

            // Draw the initial background layer and blur it
            drawBaseBackgroundLayer () {
                this.applyBackgroundPoints(this.sketch, this.design.backgroundPoints);
                // this.sketch.filter(this.sketch.BLUR,1);
            },

            // Generate a set of coloured points for the background
            generateBackgroundPoints (minRadius = 10, maxRadius = 40, extraPoints = null) {

                let width = this.randomInteger(40,60);
                let height = width;
                let points = [];

                // Array of canvas corners for finding the nearest corner to extrapoints
                let corners = [
                    [0,0],
                    [width,0],
                    [0, width],
                    [width, width]
                ];

                // set radius of these circles as half of canvas width
                // let radius = width / radiusScale;
                let radius = width * 0.6;

                // pick random colours for each edge colour
                let topCornerColor = this.hexToHSL("#" + this.randomBackgroundColor());
                let rightCornerColor = this.hexToHSL("#" + this.randomBackgroundColor());
                let bottomCornerColor = this.hexToHSL("#" + this.randomBackgroundColor());
                let leftCornerColor = this.hexToHSL("#" + this.randomBackgroundColor());

                // pick random colours for each corner colour
                let topLeftCornerColor = this.hexToHSL("#" + this.randomBackgroundColor());
                let topRightCornerColor = this.hexToHSL("#" + this.randomBackgroundColor());
                let bottomLeftCornerColor = this.hexToHSL("#" + this.randomBackgroundColor());
                let bottomRightCornerColor = this.hexToHSL("#" + this.randomBackgroundColor());

                // Center point
                points.push([width / 2, height / 2, width * 3, topLeftCornerColor[0], topLeftCornerColor[1], topLeftCornerColor[2]]);

                // return {width: width, height: height, points: points};

                // Edge points
                points.push([0, 0, radius, topLeftCornerColor[0], topLeftCornerColor[1], topLeftCornerColor[2]]);
                points.push([width / 2, 0, radius, topCornerColor[0], topCornerColor[1], topCornerColor[2]]);
                points.push([width, 0, radius, topRightCornerColor[0], topRightCornerColor[1], topRightCornerColor[2]]);
                points.push([width, height/2, radius, rightCornerColor[0], rightCornerColor[1], rightCornerColor[2]]);
                points.push([0, height, radius, bottomLeftCornerColor[0], bottomLeftCornerColor[1], bottomLeftCornerColor[2]]);
                points.push([width/2, height, radius, bottomCornerColor[0], bottomCornerColor[1], bottomCornerColor[2]]);
                points.push([width, height, radius, bottomRightCornerColor[0], bottomRightCornerColor[1], bottomRightCornerColor[2]]);
                points.push([0, height/2, radius, leftCornerColor[0], leftCornerColor[1], leftCornerColor[2]]);

                // console.log(points);

                // Random extra points
                if (extraPoints === null) {
                    extraPoints = 2;
                    // extraPoints = this.randomInteger(1, 3);
                }

                let widthPadding = (width / 7);
                let heightPadding = (height / 7);

                for (let i = 1; i < extraPoints; i++) {

                    let colorKey = this.randomInteger(0,3) + ((i * 4) % this.design.backgroundColors.length);
                    let color = this.hexToHSL("#" + this.backgroundColors[colorKey]);

                    let thisPoint = [
                        this.randomInteger(widthPadding, width - widthPadding),
                        this.randomInteger(heightPadding, height - heightPadding)
                    ];

                    // let radius = width / 4;
                    let radius = 0 ;
                    let thisRadius = radius;

                    if (i < 3) {

                        // find farthest circle and use as radius for the first 3 points
                        for (let c = 0; c < corners.length; c++) {
                            thisRadius = this.trig(thisPoint[0], corners[c][0], thisPoint[1], corners[c][1]);
                            // if (thisRadius < radius) {
                            if (thisRadius > radius) {
                                radius = thisRadius;
                            }
                        }

                    } else {
                        // for other points just pick a random radius
                        radius = this.randomInteger(minRadius, maxRadius);
                    }

                    points.push([thisPoint[0], thisPoint[1], radius, color[0], color[1], color[2]]);
                }

                return {width: width, height: height, points: points};

            },

            generateMotifBackgroundPoints (minRadius = 10, maxRadius = 40, extraPoints = null) {

                let width = this.randomInteger(40,60);
                let height = width;
                let points = [];

                // Array of canvas corners for finding the nearest corner to extrapoints
                let corners = [
                    [0,0],
                    [width,0],
                    [0, width],
                    [width, width]
                ];

                // set radius of these circles as half of canvas width
                // let radius = width / radiusScale;
                let radius = width * 4;

                // pick random colours for each edge colour
                let topCornerColor = this.hexToHSL("#" + this.randomColor());
                let rightCornerColor = this.hexToHSL("#" + this.randomColor());
                let bottomCornerColor = this.hexToHSL("#" + this.randomColor());
                let leftCornerColor = this.hexToHSL("#" + this.randomColor());

                // pick random colours for each corner colour
                let topLeftCornerColor = this.hexToHSL("#" + this.randomBackgroundColor());
                let topRightCornerColor = this.hexToHSL("#" + this.randomColor());
                let bottomLeftCornerColor = this.hexToHSL("#" + this.randomColor());
                let bottomRightCornerColor = this.hexToHSL("#" + this.randomColor());

                // Center point
                points.push([width / 2, height / 2, width * 6, topLeftCornerColor[0], topLeftCornerColor[1], topLeftCornerColor[2]]);

                // return {width: width, height: height, points: points};

                // Edge points
                // points.push([0, 0, radius, topLeftCornerColor[0], topLeftCornerColor[1], topLeftCornerColor[2]]);
                // points.push([width / 2, 0, radius, topCornerColor[0], topCornerColor[1], topCornerColor[2]]);
                // points.push([width, 0, radius, topRightCornerColor[0], topRightCornerColor[1], topRightCornerColor[2]]);
                // points.push([width, height/2, radius, rightCornerColor[0], rightCornerColor[1], rightCornerColor[2]]);
                // points.push([0, height, radius, bottomLeftCornerColor[0], bottomLeftCornerColor[1], bottomLeftCornerColor[2]]);
                // points.push([width/2, height, radius, bottomCornerColor[0], bottomCornerColor[1], bottomCornerColor[2]]);
                // points.push([width, height, radius, bottomRightCornerColor[0], bottomRightCornerColor[1], bottomRightCornerColor[2]]);
                // points.push([0, height/2, radius, leftCornerColor[0], leftCornerColor[1], leftCornerColor[2]]);

                // console.log(points);

                // Random extra points
                if (extraPoints === null) {
                    // extraPoints = 2;
                    extraPoints = this.randomInteger(1, 3);
                }

                let widthPadding = (width / 7);
                let heightPadding = (height / 7);

                for (let i = 1; i < extraPoints; i++) {

                    let colorKey = this.randomInteger(0,3) + ((i * 4) % this.design.colors.length);
                    let color = this.hexToHSL("#" + this.colors[colorKey]);

                    let thisPoint = [
                        this.randomInteger(widthPadding, width - widthPadding),
                        this.randomInteger(heightPadding, height - heightPadding)
                    ];

                    let radius = width;
                    // let radius = 0 ;
                    let thisRadius = radius;

                    if (i < 3) {

                        // find farthest circle and use as radius for the first 3 points
                        for (let c = 0; c < corners.length; c++) {
                            thisRadius = this.trig(thisPoint[0], corners[c][0], thisPoint[1], corners[c][1]);
                            if (thisRadius < radius) {
                            // if (thisRadius > radius) {
                                radius = thisRadius;
                            }
                        }

                    } else {
                        // for other points just pick a random radius
                        radius = this.randomInteger(minRadius, maxRadius);
                    }

                    points.push([thisPoint[0], thisPoint[1], radius, color[0], color[1], color[2]]);
                }

                return {width: width, height: height, points: points};

            },

            applyBackgroundPoints(sketch, points) {

                sketch.push();

                // Get the small background size, either a percentage of the canvas size or minimum 4pixels
                let backgroundWidth = sketch.width * 0.0025;
                let backgroundHeight = sketch.height * 0.0025;

                backgroundWidth = Math.max(4, backgroundWidth);
                backgroundHeight = Math.max(4, backgroundHeight);

                backgroundWidth = parseInt(backgroundWidth) + 1;
                backgroundHeight = parseInt(backgroundHeight) + 1;

                let newSketch = this.createSketch(backgroundWidth, backgroundHeight);

                let boxWidth = points.width;
                let boxHeight = points.height;
                points = points.points;

                newSketch.colorMode(this.sketch.HSL);
                sketch.colorMode(this.sketch.HSL);

                for (let i = 0; i < points.length; i++) {

                    newSketch.fill(points[i][3], points[i][4], points[i][5]);
                    newSketch.stroke(points[i][3], points[i][4], points[i][5]);
                    let radius = points[i][2];
                    radius = (radius / boxWidth) * backgroundWidth;
                    if (this.design.version > 7) {
                        radius = Math.max(1, radius);
                    }
                    newSketch.noStroke();

                    let x = points[i][0];
                    let y = points[i][1];

                    x = (x / boxWidth) * backgroundWidth;
                    y = (y / boxHeight) * backgroundHeight;

                    // Use circle or point with a stroke
                    // newSketch.point(x, y);
                    newSketch.circle(x, y, radius);
                }

                // Use replace to overwrite the sketch with this background
                // sketch.blendMode(this.sketch.REPLACE);
                sketch.blendMode(this.sketch.BLEND);

                // Get cover dimensions so to keep ratio
                let size = this.helperCover(backgroundWidth, backgroundHeight, sketch.width, sketch.height);
                sketch.image(newSketch, 0, 0, size.width, size.height);

                // Or just resize the background to the canvas size.
                // sketch.image(newSketch, 0, 0, sketch.width * 1.2, sketch.height * 1.2);

                sketch.pop();

                return sketch;
            },

        }

    }

</script>
