// функція для інтегралу: f(x)
export type Integrand = (x: number) => number;

// функція для ОДР: f(x, y) у рівнянні y' = f(x, y)
export type ODEFunction = (x: number, y: number) => number;

// точка для графіка / таблиці
export interface Point {
    x: number;
    y: number;
}

// результат інтегрування
export interface IntegralResult {
    methodId: "left" | "right" | "middle" | "trapezoid" | "simpson";
    methodName: string;
    value: number;
    exactValue?: number;   // точний / еталонний інтеграл
    absError?: number;     // |I_exact - I_num|
    relError?: number;     // |I_exact - I_num| / |I_exact|
}

// результат розв’язку ОДР (масив точок)
export interface ODEResult {
    methodName: string;
    points: Point[];
    steps: number;
    maxError?: number;   // max_i |y_exact(x_i) - y_i|
    endError?: number;   // |y_exact(b) - y_N|
}

// параметри задачі для інтеграла
export interface IntegralParams {
    f: Integrand;
    a: number;
    b: number;
    n: number;
}

// параметри задачі для ОДР
export interface ODEParams {
    f: ODEFunction;
    a: number;
    b: number;
    y0: number;
    n: number;
}
