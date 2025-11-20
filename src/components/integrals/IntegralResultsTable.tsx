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
                        <th
                            style={{
                                textAlign: "left",
                                borderBottom: "1px solid #ddd",
                                padding: "8px",
                            }}
                        >
                            Method
                        </th>
                        <th
                            style={{
                                textAlign: "right",
                                borderBottom: "1px solid #ddd",
                                padding: "8px",
                            }}
                        >
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((r) => (
                        <tr key={r.methodName}>
                            <td
                                style={{
                                    padding: "8px",
                                    borderBottom: "1px solid #f0f0f0",
                                }}
                            >
                                {r.methodName}
                            </td>
                            <td
                                style={{
                                    padding: "8px",
                                    textAlign: "right",
                                    borderBottom: "1px solid #f0f0f0",
                                }}
                            >
                                {r.value.toFixed(6)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
