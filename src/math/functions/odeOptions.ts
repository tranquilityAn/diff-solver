import type { ODEFunction } from "../../types/math";

export interface ODEOption {
    id: string;
    label: string;
    func: ODEFunction; // f(x, y)
    exactSolution?: (x: number, a: number, y0: number) => number;
}

export const odeOptions: ODEOption[] = [
    {
        id: "ode_minus_x_y",
        label: "y' = -x · y",
        func: (x, y) => -x * y,
        exactSolution: (x, a, y0) => {
            const C = y0 / Math.exp(-a * a / 2);
            return C * Math.exp(-x * x / 2);
        },
    },
    {
        id: "ode_y_plus_x",
        label: "y' = y + x",
        func: (_x, y) => y + _x,
        exactSolution: (x, a, y0) => {
            const C = (y0 + a + 1) / Math.exp(a);
            return C * Math.exp(x) - x - 1;
        },
    },
    {
        id: "ode_3x_minus_12x2_y",
        label: "y' = (3x - 12x²) · y",
        func: (x, y) => (3 * x - 12 * x * x) * y,
        exactSolution: (x, a, y0) => {
            const phi = (t: number) => 1.5 * t * t - 4 * t * t * t;
            const C = y0 / Math.exp(phi(a));
            return C * Math.exp(phi(x));
        },
    },
];
