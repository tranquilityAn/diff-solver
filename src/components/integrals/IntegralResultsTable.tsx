import type { IntegralResult } from "../../types/math";

export interface IntegralResultsTableProps {
    results: IntegralResult[];
}

export function IntegralResultsTable({ results }: IntegralResultsTableProps) {
    if (!results || results.length === 0) return null;

    return (
        <div>
            <h3>Results</h3>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                }}
            >
                <thead>
                    <tr>
                        <th style={{ textAlign: "left", padding: "8px" }}>
                            Method
                        </th>
                        <th style={{ textAlign: "right", padding: "8px" }}>
                            Approx. value
                        </th>
                        <th style={{ textAlign: "right", padding: "8px" }}>
                            Exact value
                        </th>
                        <th style={{ textAlign: "right", padding: "8px" }}>
                            Abs. error
                        </th>
                        <th style={{ textAlign: "right", padding: "8px" }}>
                            Rel. error
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((r) => (
                        <tr key={r.methodId}>
                            <td style={{ padding: "8px", textAlign: "left" }}>
                                {r.methodName}
                            </td>
                            <td style={{ padding: "8px", textAlign: "right" }}>
                                {r.value.toFixed(6)}
                            </td>
                            <td style={{ padding: "8px", textAlign: "right" }}>
                                {r.exactValue !== undefined
                                    ? r.exactValue.toFixed(6)
                                    : "—"}
                            </td>
                            <td style={{ padding: "8px", textAlign: "right" }}>
                                {r.absError !== undefined
                                    ? r.absError.toExponential(3)
                                    : "—"}
                            </td>
                            <td style={{ padding: "8px", textAlign: "right" }}>
                                {r.relError !== undefined
                                    ? (r.relError * 100).toFixed(3) + " %"
                                    : "—"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
