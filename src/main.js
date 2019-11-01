import P5 from 'p5'
import PolynomialRegression from "js-polynomial-regression";

const script = function (p5) {
    let coords = [];

    p5.setup = () => {
        p5.createCanvas(500, 500);
        // for (let i = 20; i < p5.width; i += 20) {
        //     coords.push({
        //         x: i,
        //         y: p5.height - 30 + i * (-0.5)
        //     })
        // }
    };

    p5.draw = () => {
        p5.background(250);
        for (let i = 0; i < coords.length; i++) {
          p5.stroke(0, 0, 0, 150);
          p5.strokeWeight(3);
          p5.circle(coords[i].x, coords[i].y, 10)
        }

        if (coords.length > 1) {
            if (isLinear()) {
                let equation = ordinaryLeastSquare(coords);
                p5.stroke(200, 0, 0, 200);
                p5.line(0, straightLine(equation, 0),
                    p5.width, straightLine(equation, p5.width));

                p5.textSize(32);
                p5.stroke(0);
                p5.strokeWeight(1);
                p5.text(toText(equation), 15, 30)
            } else {

                const model = PolynomialRegression.read(coords, 3)
                const terms = model.getTerms()
                for (let x = 0; x < p5.width; x += 10) {
                    let y = model.predictY(terms, x);
                    p5.circle(x, y, 5);
                }
            }
        }
    };

    p5.mouseClicked = () => {
        coords.push({
            x: p5.mouseX,
            y: p5.mouseY
        });
    }
};
new P5(script);

function isLinear() {
    return document.getElementById('linear').checked
}

function straightLine(equation, x) {
    return equation.k * x + equation.m
}

function toText(equation) {
    const precision = 2
    return `y = ${equation.k.toFixed(precision)}x + ${equation.m.toFixed(precision)}`
}

function ordinaryLeastSquare(coords) {
    let xMean = coords.map(c => c.x).reduce((total, e) => total + e) / coords.length;
    let yMean = coords.map(c => c.y).reduce((total, e) => total + e) / coords.length;
    let nominator = 0;
    let denominator = 0;
    for (let i = 0; i < coords.length; i++) {
        nominator += (coords[i].x - xMean) * (coords[i].y - yMean);
        denominator += Math.pow(coords[i].x - xMean, 2)
    }
    let slope = nominator / denominator;
    return {
        k: slope,
        m: yMean - slope * xMean
    }
}

