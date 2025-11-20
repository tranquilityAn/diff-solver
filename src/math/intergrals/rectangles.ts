import type { IntegralParams } from "../../types/math";

/**
 * Обчислення визначеного інтегралу методом лівих прямокутників.
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
export function leftRectangles({ f, a, b, n }: IntegralParams): number {
    if (n <= 0) {
        throw new Error("Number of steps n must be positive");
    }
    if (a === b) {
        return 0;
    }

    const h = (b - a) / n; // довжина одного кроку
    let sum = 0;

    // Метод лівих прямокутників:
    // I ≈ h * Σ f(x_i), де x_i = a + i*h, i = 0..n-1
    for (let i = 0; i < n; i++) {
        const x = a + i * h; // ліва точка i-го підвідрізка
        sum += f(x);
    }

    const I = sum * h;
    return I;
}

/**
 * Обчислення визначеного інтегралу методом правих прямокутників.
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
export function rightRectangles({ f, a, b, n }: IntegralParams): number {
    if (n <= 0) {
        throw new Error("Number of steps n must be positive");
    }
    if (a === b) {
        return 0;
    }

    const h = (b - a) / n; // довжина одного кроку
    let sum = 0;

    // Метод правих прямокутників:
    // I ≈ h * Σ f(x_i), де x_i = a + i*h, i = 1..n
    for (let i = 1; i <= n; i++) {
        const x = a + i * h; // права точка i-го підвідрізка
        sum += f(x);
    }

    const I = sum * h;
    return I;
}

/**
 * Обчислення визначеного інтегралу методом центральних (середніх) прямокутників.
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
export function middleRectangles({ f, a, b, n }: IntegralParams): number {
    if (n <= 0) {
        throw new Error("Number of steps n must be positive");
    }
    if (a === b) {
        return 0;
    }

    const h = (b - a) / n; // довжина одного кроку
    let sum = 0;

    // Метод центральних прямокутників:
    // I ≈ h * Σ f(x_i), де x_i = a + (i + 0.5)*h, i = 0..n-1
    for (let i = 0; i < n; i++) {
        const x = a + (i + 0.5) * h; // центр i-го підвідрізка
        sum += f(x);
    }

    const I = sum * h;
    return I;
}
