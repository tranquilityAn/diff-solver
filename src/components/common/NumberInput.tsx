export interface NumberInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    step?: number;
    min?: number;
    max?: number;
}

export function NumberInput({
    label,
    value,
    onChange,
    step,
    min,
    max,
}: NumberInputProps) {
    return (
        <label
            style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "14px",
            }}
        >
            <span style={{ marginBottom: "4px" }}>{label}</span>
            <input
                type="number"
                value={Number.isNaN(value) ? "" : value}
                onChange={(e) =>
                    onChange(
                        e.target.value === "" ? NaN : Number(e.target.value)
                    )
                }
                step={step}
                min={min}
                max={max}
                style={{
                    padding: "6px 8px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                }}
            />
        </label>
    );
}
