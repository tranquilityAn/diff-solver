export interface MethodOption {
    id: string;
    label: string;
    description?: string;
}

export interface MethodMultiSelectProps {
    label: string;
    options: MethodOption[];
    selectedIds: string[];
    onChange: (ids: string[]) => void;
}

export function MethodMultiSelect({
    label,
    options,
    selectedIds,
    onChange,
}: MethodMultiSelectProps) {
    const toggle = (id: string) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter((x) => x !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    return (
        <div style={{ fontSize: "14px" }}>
            <div style={{ marginBottom: "4px" }}>{label}</div>
            <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
                {options.map((opt) => (
                    <label
                        key={opt.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(opt.id)}
                            onChange={() => toggle(opt.id)}
                        />
                        <span>{opt.label}</span>
                        {opt.description && (
                            <span style={{ fontSize: "12px", color: "#666" }}>
                                {opt.description}
                            </span>
                        )}
                    </label>
                ))}
            </div>
        </div>
    );
}
