import type { ODEResult } from "../../math/ode/aggregators";

export interface ODEChartProps {
    results: ODEResult[];
}

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626"];

// Масив патернів для ліній:
// "" - суцільна
// "6, 4" - довгий штрих (6px лінія, 4px пропуск)
// "2, 4" - крапки (2px лінія, 4px пропуск)
// "10, 4, 2, 4" - штрих-пунктир
const DASH_STYLES = ["", "6, 4", "2, 4", "10, 4, 2, 4"];

export function ODEChart({ results }: ODEChartProps) {
    if (!results || results.length === 0) return null;

    // збираємо всі точки, щоб знайти min/max
    const allPoints = results.flatMap((r) => r.points);
    if (allPoints.length === 0) return null;

    const xs = allPoints.map((p) => p.x);
    const ys = allPoints.map((p) => p.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const width = 640;
    const height = 320;
    const padding = 40;

    const spanX = maxX - minX || 1;
    const spanY = maxY - minY || 1;

    const mapX = (x: number) =>
        padding + ((x - minX) / spanX) * (width - 2 * padding);

    const mapY = (y: number) =>
        height - padding - ((y - minY) / spanY) * (height - 2 * padding);

    return (
        <div style={{ marginTop: "24px" }}>
            <h3 style={{ marginBottom: "8px" }}>Graph y(x)</h3>
            <svg
                width={width}
                height={height}
                style={{ border: "1px solid #ddd", borderRadius: "8px" }}
            >
                {/* осі X/Y */}
                <line
                    x1={padding}
                    y1={height - padding}
                    x2={width - padding}
                    y2={height - padding}
                    stroke="#999"
                    strokeWidth={1}
                />
                <line
                    x1={padding}
                    y1={padding}
                    x2={padding}
                    y2={height - padding}
                    stroke="#999"
                    strokeWidth={1}
                />

                {results.map((res, idx) => {
                    if (!res.points.length) return null;

                    const color = COLORS[idx % COLORS.length];
                    const dashStyle = DASH_STYLES[idx % DASH_STYLES.length];
                    const pathData = res.points
                        .map((p, i) => {
                            const x = mapX(p.x);
                            const y = mapY(p.y);
                            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                        })
                        .join(" ");

                    return (
                        <g key={res.methodId}>
                            <path
                                d={pathData}
                                fill="none"
                                stroke={color}
                                strokeWidth={2}
                                strokeDasharray={dashStyle}
                                strokeOpacity={0.8}
                                style={{ mixBlendMode: "multiply" }}
                            />
                            {/* легенда */}
                            <line 
                                x1={padding + 10} 
                                y1={padding + 20 * idx} 
                                x2={padding + 30} 
                                y2={padding + 20 * idx} 
                                stroke={color} 
                                strokeWidth={2}
                                strokeDasharray={dashStyle}
                            />
                            <text
                                x={padding + 36}
                                y={padding + 20 * idx + 4}
                                fontSize={12}
                                fill="#444"
                                style={{ pointerEvents: 'none' }}
                            >
                                {res.methodName}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
