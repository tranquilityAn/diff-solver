import { Integrand } from "../../types/math";

export interface IntegrandOption {
    id: string;
    label: string;
    func: Integrand;
}

export const integrandOptions: IntegrandOption[] = [
    {
        id: "exp_minus_x",
        label: "f(x) = e^{-x}",
        func: (x) => Math.exp(-x),
    },
    {
        id: "sin_x",
        label: "f(x) = sin(x)",
        func: (x) => Math.sin(x),
    },
    {
        id: "exp_minus_x2",
        label: "f(x) = e^{-x²}",
        func: (x) => Math.exp(-x * x),
    },
    {
        id: "exp_minus_4x_minus_x3",
        label: "f(x) = e^{-4x - x³}",
        func: (x) => Math.exp(-4 * x - x * x * x),
    },
];
