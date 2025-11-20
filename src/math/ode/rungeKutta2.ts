import { ODEParams, Point } from "../../types/math";

/**
 * Обчислення розв'язку ОДР методом Рунге–Кутта 2-го порядку (Heun / improved Euler).
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
export function rungeKutta2({ f, a, b, y0, n }: ODEParams): Point[] {
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

    // На кожному кроці:
    // k1 = f(x_n, y_n)
    // k2 = f(x_n + h, y_n + h * k1)
    // y_{n+1} = y_n + h/2 * (k1 + k2)
    // x_{n+1} = x_n + h
    for (let i = 0; i < n; i++) {
        const k1 = f(x, y);
        const k2 = f(x + h, y + h * k1);

        const dy = (h / 2) * (k1 + k2);
        y = y + dy;
        x = x + h;

        points.push({ x, y });
    }

    return points;
}
