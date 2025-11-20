export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
}

export function Select({ label, value, onChange, options }: SelectProps) {
    return (
        <label
            style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "14px",
            }}
        >
            <span style={{ marginBottom: "4px" }}>{label}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: "6px 8px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                }}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </label>
    );
}
