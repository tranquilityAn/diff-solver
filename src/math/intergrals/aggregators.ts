import { IntegralParams, IntegralResult } from "../../types/math.ts";
import {
    leftRectangles,
    rightRectangles,
    middleRectangles,
} from "./rectangles.ts";
import { trapezoid } from "./trapezoid.ts";
import { simpson } from "./simpson.ts";

export function computeAllIntegrals(params: IntegralParams): IntegralResult[] {
    return [
        {
            methodName: "Left rectangles",
            value: leftRectangles(params),
        },
        {
            methodName: "Right rectangles",
            value: rightRectangles(params),
        },
        {
            methodName: "Middle rectangles",
            value: middleRectangles(params),
        },
        {
            methodName: "Trapezoid",
            value: trapezoid(params),
        },
        {
            methodName: "Simpson",
            value: simpson(params),
        },
    ];
}
