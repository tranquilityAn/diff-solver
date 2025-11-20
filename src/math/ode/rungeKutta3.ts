import { type ODEParams, type Point } from "../../types/math";

/**
 * Обчислення розв'язку ОДР методом Рунге–Кутта 3-го порядку.
 *
 * Рівняння: y' = f(x, y)
 *
 * Вхідні параметри (ODEParams):
 *  - f: функція f(x, y) — права частина диференціального рівняння
 *  - a: ліва межа відрізка
 *  - b: права межа відрізка
 *  - y0: початкове значення y(a)
 *  - n: кількість кроків
 *
 * Повертає:
 *  - масив точок { x, y } на відрізку [a, b]
 */
export function rungeKutta3({ f, a, b, y0, n }: ODEParams): Point[] {
    if (n <= 0) {
        throw new Error("Number of steps n must be positive");
    }
    if (a === b) {
        return [{ x: a, y: y0 }];
    }

    const h = (b - a) / n; // довжина кроку
    const points: Point[] = [];

    let x = a;
    let y = y0;
    points.push({ x, y });

    for (let i = 0; i < n; i++) {
        const k1 = f(x, y);
        const k2 = f(x + h / 2, y + (h / 2) * k1);
        const k3 = f(x + h, y - h * k1 + 2 * h * k2);

        const dy = (h / 6) * (k1 + 4 * k2 + k3);
        y = y + dy;
        x = x + h;

        points.push({ x, y });
    }

    return points;
}
