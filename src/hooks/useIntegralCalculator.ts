import { useState } from "react";
import { integrandOptions } from "../math/functions/integrandOptions";
import { computeAllIntegrals } from "../math/intergrals/aggregators";
import { type IntegralParams, type IntegralResult } from "../types/math";
import { computeIntegralError } from "../math/error";

export type IntegralMethodId =
    | "left"
    | "right"
    | "middle"
    | "trapezoid"
    | "simpson";

export interface CalculateIntegralArgs {
    integrandId: string;
    a: number;
    b: number;
    n: number;
    methods: IntegralMethodId[];
}

export function useIntegralCalculator() {
    const [results, setResults] = useState<IntegralResult[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const calculate = ({
        integrandId,
        a,
        b,
        n,
        methods,
    }: CalculateIntegralArgs) => {
        // ---- валідація ----
        if (!integrandId) {
            setError("Select integrand function.");
            setResults(null);
            return;
        }

        if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(n)) {
            setError("Parameters a, b, N must be valid numbers.");
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

        // спеціальна перевірка для Сімпсона
        if (methods.includes("simpson") && n % 2 !== 0) {
            setError("Simpson method requires even N.");
            setResults(null);
            return;
        }

        const integrand = integrandOptions.find(
            (opt) => opt.id === integrandId
        );
        if (!integrand) {
            setError("Unknown integrand.");
            setResults(null);
            return;
        }

        let exactValue: number | undefined = undefined;

        if (integrand.exactIntegral) {
            try {
                exactValue = integrand.exactIntegral(a, b);
            } catch {
                exactValue = undefined;
            }
        }

        // ---- обчислення ----
        const params: IntegralParams = {
            f: integrand.func,
            a,
            b,
            n,
        };

        try {
            const all = computeAllIntegrals(params);

            // ---- додати помилки ----  // ADD THIS
            let withError: IntegralResult[] = all;

            if (exactValue !== undefined) {
                withError = all.map((res) => {
                    const absError = Math.abs(exactValue! - res.value);
                    const relError = absError / Math.abs(exactValue!);

                    return {
                        ...res,
                        exactValue,
                        absError,
                        relError,
                    };
                });
            }

            const filtered = withError.filter((res) =>
                methods.includes(res.methodId)
            );

            setError(null);
            setResults(filtered);
        } catch (e) {
            console.error(e);
            setError("Calculation error.");
            setResults(null);
        }
    };

    return { results, error, calculate };
}
