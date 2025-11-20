import { type ODEParams, type Point } from "../../types/math";

/**
 * Обчислення розв'язку ОДР методом Ейлера.
 *
 * Рівняння має вигляд:  y' = f(x, y)
 *
 * Вхідні параметри (ODEParams):
 *  - f: функція f(x, y) — права частина диференціального рівняння
 *  - a: ліва межа відрізка, де шукаємо розв'язок
 *  - b: права межа відрізка
 *  - y0: початкове значення y(a)
 *  - n: кількість кроків
 *
 * Повертає:
 *  - масив точок { x, y } на відрізку [a, b], включаючи початкову точку
 */
export function euler({ f, a, b, y0, n }: ODEParams): Point[] {
    if (n <= 0) {
        throw new Error("Number of steps n must be positive");
    }
    if (a === b) {
        return [{ x: a, y: y0 }];
    }

    const h = (b - a) / n; // довжина одного кроку
    const points: Point[] = [];

    // Початкова точка
    let x = a;
    let y = y0;
    points.push({ x, y });

    // Метод Ейлера:
    // x_{i+1} = x_i + h
    // y_{i+1} = y_i + h * f(x_i, y_i)
    for (let i = 0; i < n; i++) {
        const slope = f(x, y); // наближене значення y' у точці (x_i, y_i)
        y = y + h * slope; // y_{i+1}
        x = x + h; // x_{i+1}
        points.push({ x, y });
    }

    return points;
}
