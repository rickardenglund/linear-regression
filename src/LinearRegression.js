export function ordinaryLeastSquare(coords) {
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
    };
}

export function predict(equation, x) {
    return equation.k * x + equation.m
}

export function toText(equation) {
    const precision = 2
    return `y = ${equation.k.toFixed(precision)}x + ${equation.m.toFixed(precision)}`
}
