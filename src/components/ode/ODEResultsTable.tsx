import type { ODEResult } from "../../math/ode/aggregators";

export interface ODEResultsTableProps {
    results: ODEResult[];
}

export function ODEResultsTable({ results }: ODEResultsTableProps) {
    if (!results || results.length === 0) return null;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {results.map((res) => (
                <div key={res.methodId}>
                    <h3 style={{ marginBottom: "8px" }}>
                        Table: {res.methodName}
                    </h3>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: "14px",
                        }}
                    >
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        textAlign: "right",
                                        borderBottom: "1px solid #ddd",
                                        padding: "6px",
                                    }}
                                >
                                    i
                                </th>
                                <th
                                    style={{
                                        textAlign: "right",
                                        borderBottom: "1px solid #ddd",
                                        padding: "6px",
                                    }}
                                >
                                    xᵢ
                                </th>
                                <th
                                    style={{
                                        textAlign: "right",
                                        borderBottom: "1px solid #ddd",
                                        padding: "6px",
                                    }}
                                >
                                    yᵢ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.points.map((p, idx) => (
                                <tr key={idx}>
                                    <td
                                        style={{
                                            padding: "6px",
                                            textAlign: "right",
                                            borderBottom: "1px solid #f0f0f0",
                                        }}
                                    >
                                        {idx}
                                    </td>
                                    <td
                                        style={{
                                            padding: "6px",
                                            textAlign: "right",
                                            borderBottom: "1px solid #f0f0f0",
                                        }}
                                    >
                                        {p.x.toFixed(4)}
                                    </td>
                                    <td
                                        style={{
                                            padding: "6px",
                                            textAlign: "right",
                                            borderBottom: "1px solid #f0f0f0",
                                        }}
                                    >
                                        {p.y.toExponential(6)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
