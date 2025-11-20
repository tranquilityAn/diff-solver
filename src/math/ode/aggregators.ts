// src/math/ode/aggregators.ts
import { ODEParams, Point } from "../../types/math.ts";
import { euler } from "./euler.ts";
import { rungeKutta2 } from "./rungeKutta2.ts";
import { rungeKutta3 } from "./rungeKutta3.ts";
import { rungeKutta4 } from "./rungeKutta4.ts";

export interface ODEResult {
    methodId: string;
    methodName: string;
    points: Point[];
}

/**
 * Обчислити наближений розв'язок ОДР усіма доступними методами.
 */
export function solveODEWithAllMethods(params: ODEParams): ODEResult[] {
    return [
        {
            methodId: "euler",
            methodName: "Euler",
            points: euler(params),
        },
        {
            methodId: "rk2",
            methodName: "Runge–Kutta 2",
            points: rungeKutta2(params),
        },
        {
            methodId: "rk3",
            methodName: "Runge–Kutta 3",
            points: rungeKutta3(params),
        },
        {
            methodId: "rk4",
            methodName: "Runge–Kutta 4",
            points: rungeKutta4(params),
        },
    ];
}
