import { IntegralParams } from "../../types/math";

/**
 * Обчислення визначеного інтегралу методом Сімпсона (параболічним методом).
 *
 * Вхідні параметри (IntegralParams):
 *  - f: функція f(x), інтеграл якої обчислюємо
 *  - a: ліва межа інтегрування
 *  - b: права межа інтегрування
 *  - n: кількість кроків (ПОВИННО БУТИ ПАРНЕ!)
 *
 * Повертає:
 *  - числове наближення значення інтеграла I
 */
export function simpson({ f, a, b, n }: IntegralParams): number {
    if (n <= 0) {
        throw new Error("Number of steps n must be positive");
    }
    if (a === b) {
        return 0;
    }
    // Метод Сімпсона вимагає парну кількість підвідрізків
    if (n % 2 !== 0) {
        throw new Error("Simpson method requires an even number of steps n");
    }

    const h = (b - a) / n; // ширина одного підвідрізка
    let sum = f(a) + f(b);

    // Формула:
    // I ≈ h/3 * [ f(a) + f(b) + 4 * Σ_{i неч} f(x_i) + 2 * Σ_{i парних} f(x_i) ]
    //
    // де x_i = a + i*h, i = 1..n-1
    for (let i = 1; i < n; i++) {
        const x = a + i * h;

        if (i % 2 === 0) {
            // парні i: коефіцієнт 2
            sum += 2 * f(x);
        } else {
            // непарні i: коефіцієнт 4
            sum += 4 * f(x);
        }
    }

    const I = (h / 3) * sum;
    return I;
}
