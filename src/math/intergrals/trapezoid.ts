import { IntegralParams } from "../../types/math";

/**
 * Обчислення визначеного інтегралу методом трапецій.
 *
 * Вхідні параметри (IntegralParams):
 *  - f: функція f(x), інтеграл якої обчислюємо
 *  - a: ліва межа інтегрування
 *  - b: права межа інтегрування
 *  - n: кількість кроків (розбиття відрізка [a, b] на n підвідрізків)
 *
 * Повертає:
 *  - числове наближення значення інтеграла I
 */
export function trapezoid({ f, a, b, n }: IntegralParams): number {
    if (n <= 0) {
        throw new Error("Number of steps n must be positive");
    }
    if (a === b) {
        return 0;
    }

    const h = (b - a) / n; // ширина одного підвідрізка
    let sum = 0;

    // Формула методу трапецій:
    // I ≈ h * ( f(a)/2 + Σ_{i=1..n-1} f(a + i*h) + f(b)/2 )
    sum += f(a) / 2; // ліва межа з коефіцієнтом 1/2

    for (let i = 1; i < n; i++) {
        const x = a + i * h;
        sum += f(x);
    }

    sum += f(b) / 2; // права межа з коефіцієнтом 1/2

    const I = sum * h;
    return I;
}
