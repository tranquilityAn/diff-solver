import type { ODEFunction } from "../../types/math";

export interface ODEOption {
    id: string;
    label: string;
    func: ODEFunction; // f(x, y)
}

export const odeOptions: ODEOption[] = [
    {
        id: "ode_minus_x_y",
        label: "y' = -x · y",
        func: (x, y) => -x * y,
    },
    {
        id: "ode_y_plus_x",
        label: "y' = y + x",
        func: (_x, y) => y + _x,
    },
    {
        id: "ode_3x_minus_12x2_y",
        label: "y' = (3x - 12x²) · y",
        func: (x, y) => (3 * x - 12 * x * x) * y,
    },
];
