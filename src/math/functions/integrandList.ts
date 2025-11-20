import { Integrand } from "../../types/math";

export interface IntegrandOption {
    id: string;
    label: string;
    func: Integrand;
}

export const integrandOptions: IntegrandOption[] = [
    { id: "exp_minus_x", label: "f(x) = exp(-x)", func: (x) => Math.exp(-x) },
    { id: "sin_x", label: "f(x) = sin(x)", func: (x) => Math.sin(x) },
    {
        id: "exp_minus_x2",
        label: "f(x) = exp(-x^2)",
        func: (x) => Math.exp(-x * x),
    },
    // iнші
];
