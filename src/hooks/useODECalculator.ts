import { useState } from "react";
import { odeOptions } from "../math/functions/odeOptions";
import type { ODEParams } from "../types/math";
import {
    type ODEResult,
    type ODEMethodId,
    solveODEWithSelectedMethods,
} from "../math/ode/aggregators";

export interface CalculateODEArgs {
    odeId: string;
    a: number;
    b: number;
    n: number;
    y0: number;
    methods: ODEMethodId[];
}

export function useODECalculator() {
    const [results, setResults] = useState<ODEResult[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const calculate = ({ odeId, a, b, n, y0, methods }: CalculateODEArgs) => {
        // ---- валідація ----
        if (!odeId) {
            setError("Select differential equation.");
            setResults(null);
            return;
        }

        if (
            !Number.isFinite(a) ||
            !Number.isFinite(b) ||
            !Number.isFinite(n) ||
            !Number.isFinite(y0)
        ) {
            setError("Parameters a, b, N, y0 must be valid numbers.");
            setResults(null);
            return;
        }

        if (!Number.isInteger(n) || n <= 0) {
            setError("N must be a positive integer.");
            setResults(null);
            return;
        }

        if (a === b) {
            setError("a and b must be different.");
            setResults(null);
            return;
        }

        if (methods.length === 0) {
            setError("Select at least one method.");
            setResults(null);
            return;
        }

        const ode = odeOptions.find((opt) => opt.id === odeId);
        if (!ode) {
            setError("Unknown differential equation.");
            setResults(null);
            return;
        }

        let exactSolutionFn: ((x: number) => number) | undefined;

        if (ode?.exactSolution) {
            exactSolutionFn = (x: number) => ode.exactSolution!(x, a, y0);
        }

        const params: ODEParams = {
            f: ode.func,
            a,
            b,
            y0,
            n,
        };

        try {
            const solved = solveODEWithSelectedMethods(params, methods);

            let withError: ODEResult[];

            if (exactSolutionFn) {
                withError = solved.map((res) => {
                    const xs = res.points.map((p) => p.x);
                    const ys = res.points.map((p) => p.y);

                    const errors = xs.map((x, i) =>
                        Math.abs(exactSolutionFn!(x) - ys[i])
                    );

                    const maxError = Math.max(...errors);
                    const endError = errors[errors.length - 1];

                    return {
                        ...res,
                        maxError,
                        endError,
                    };
                });
            } else {
                withError = solved;
            }

            setResults(withError);
        } catch (e) {
            console.error(e);
            setError("Calculation error.");
            setResults(null);
        }
    };

    return { results, error, calculate };
}
