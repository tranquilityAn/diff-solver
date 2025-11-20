import type { ODEResult } from "../../math/ode/aggregators";

export interface ODEChartProps {
    results: ODEResult[];
}

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626"];

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
    const padding = 32;

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
                            />
                            {/* легенда */}
                            <text
                                x={padding + 12}
                                y={padding + 16 * (idx + 1)}
                                fontSize={12}
                                fill={color}
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
