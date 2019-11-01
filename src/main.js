import P5 from 'p5'
import PolynomialRegression from "js-polynomial-regression";
import {ordinaryLeastSquare, predict, toText} from "./LinearRegression";

const script = function (p5) {
    let data = [];

    p5.setup = () => {
        p5.createCanvas(500, 500);
    };

    p5.draw = () => {
        p5.background(250);
        for (let i = 0; i < data.length; i++) {
          p5.stroke(0, 0, 0, 150);
          p5.strokeWeight(3);
          p5.circle(data[i].x, data[i].y, 10)
        }

        if (data.length > 1) {
            p5.stroke(200, 150, 0, 200);
            if (isLinear()) {
                const equation = ordinaryLeastSquare(data);

                for (let x = 0; x < p5.width; x += 10) {
                    let y = predict(equation, x);
                    p5.circle(x, y, 5);
                }

                p5.textSize(32);
                p5.stroke(0);
                p5.strokeWeight(1);
                p5.text(toText(equation), 15, 30)
            } else {

                const model = PolynomialRegression.read(data, 3);
                const terms = model.getTerms();
                for (let x = 0; x < p5.width; x += 10) {
                    let y = model.predictY(terms, x);
                    p5.circle(x, y, 5);
                }
            }
        }
    };

    p5.mouseClicked = () => {
        data.push({
            x: p5.mouseX,
            y: p5.mouseY
        });
    }
};
new P5(script);

function isLinear() {
    return document.getElementById('linear').checked
}

