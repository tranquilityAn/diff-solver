import { useState } from "react";
import type { ODEResult } from "../../math/ode/aggregators";

export interface ODEResultsTableProps {
    results: ODEResult[];
}

function SingleResultTable({ res }: { res: ODEResult }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const LIMIT = 10;
    const totalPoints = res.points.length;
    const shouldTruncate = totalPoints > LIMIT && !isExpanded;

    const visiblePoints = shouldTruncate
        ? res.points.slice(0, LIMIT)
        : res.points;

    return (
        <div>
            <h3 style={{ marginBottom: "8px" }}>Table: {res.methodName}</h3>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                }}
            >
                <thead>
                    <tr>
                        <th style={headerStyle}>i</th>
                        <th style={headerStyle}>xᵢ</th>
                        <th style={headerStyle}>yᵢ</th>
                    </tr>
                </thead>
                <tbody>
                    {visiblePoints.map((p, idx) => (
                        <tr key={idx}>
                            <td style={cellStyle}>{idx}</td>
                            <td style={cellStyle}>{p.x.toFixed(4)}</td>
                            <td style={cellStyle}>{p.y.toExponential(6)}</td>
                        </tr>
                    ))}

                    {shouldTruncate && (
                        <tr>
                            <td
                                colSpan={3}
                                style={{
                                    ...cellStyle,
                                    textAlign: "center",
                                    color: "#888",
                                    fontStyle: "italic",
                                }}
                            >
                                ... {totalPoints - LIMIT} items hidden ...
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalPoints > LIMIT && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        marginTop: "8px",
                        padding: "6px 12px",
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "13px",
                        color: "#374151",
                        width: "100%",
                        fontWeight: 500,
                    }}
                >
                    {isExpanded
                        ? "Collapse table"
                        : `Show all (${totalPoints})`}
                </button>
            )}
        </div>
    );
}

export function ODEResultsTable({ results }: ODEResultsTableProps) {
    if (!results || results.length === 0) return null;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {results.map((res) => (
                <SingleResultTable key={res.methodId} res={res} />
            ))}
        </div>
    );
}

const headerStyle: React.CSSProperties = {
    textAlign: "right",
    borderBottom: "1px solid #ddd",
    padding: "6px",
    backgroundColor: "#fafafa",
};

const cellStyle: React.CSSProperties = {
    padding: "6px",
    textAlign: "right",
    borderBottom: "1px solid #f0f0f0",
};