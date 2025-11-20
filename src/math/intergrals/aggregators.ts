import { type IntegralParams, type IntegralResult } from "../../types/math.ts";
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
            methodId: "left",
            methodName: "Left rectangles",
            value: leftRectangles(params),
        },
        {
            methodId: "right",
            methodName: "Right rectangles",
            value: rightRectangles(params),
        },
        {
            methodId: "middle",
            methodName: "Middle rectangles",
            value: middleRectangles(params),
        },
        {
            methodId: "trapezoid",
            methodName: "Trapezoid",
            value: trapezoid(params),
        },
        {
            methodId: "simpson",
            methodName: "Simpson",
            value: simpson(params),
        },
    ];
}
