export function computeIntegralError(exact: number, approx: number) {
    const absError = Math.abs(exact - approx);
    const relError = Math.abs(absError / exact);
    return { absError, relError };
}

export function computeOdeError(
    xs: number[],
    ysNum: number[],
    yExact: (x: number) => number
) {
    const errors = xs.map((x, i) => Math.abs(yExact(x) - ysNum[i]));
    const maxError = Math.max(...errors);
    const endError = errors[errors.length - 1];
    return { maxError, endError };
}
