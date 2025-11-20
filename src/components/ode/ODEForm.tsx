import type { ODEOption } from "../../math/functions/odeOptions";
import { NumberInput } from "../common/NumberInput";
import { Select } from "../common/Select";
import { MethodMultiSelect, type MethodOption } from "../common/MethodMultiSelect";
import { ErrorAlert } from "../common/ErrorAlert";

export interface ODEFormProps {
    odeOptions: ODEOption[];

    selectedODEId: string;
    onChangeODE: (id: string) => void;

    a: number;
    b: number;
    n: number;
    y0: number;

    onChangeA: (value: number) => void;
    onChangeB: (value: number) => void;
    onChangeN: (value: number) => void;
    onChangeY0: (value: number) => void;

    selectedMethodIds: string[]; // "euler" | "rk2" | "rk3" | "rk4"
    onChangeSelectedMethods: (ids: string[]) => void;

    onSubmit: () => void;

    error?: string | null;
}

const METHOD_OPTIONS: MethodOption[] = [
    { id: "euler", label: "Euler" },
    { id: "rk2", label: "Runge–Kutta 2" },
    { id: "rk3", label: "Runge–Kutta 3" },
    { id: "rk4", label: "Runge–Kutta 4" },
];

export function ODEForm(props: ODEFormProps) {
    const {
        odeOptions,
        selectedODEId,
        onChangeODE,
        a,
        b,
        n,
        y0,
        onChangeA,
        onChangeB,
        onChangeN,
        onChangeY0,
        selectedMethodIds,
        onChangeSelectedMethods,
        onSubmit,
        error,
    } = props;

    const odeSelectOptions = odeOptions.map((opt) => ({
        value: opt.id,
        label: opt.label,
    }));

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "24px",
            }}
        >
            <Select
                label="Differential equation"
                value={selectedODEId}
                onChange={onChangeODE}
                options={odeSelectOptions}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "12px",
                }}
            >
                <NumberInput
                    label="a (start x)"
                    value={a}
                    onChange={onChangeA}
                />
                <NumberInput label="b (end x)" value={b} onChange={onChangeB} />
                <NumberInput
                    label="N (steps)"
                    value={n}
                    onChange={onChangeN}
                    min={1}
                    step={1}
                />
                <NumberInput
                    label="y0 (initial y)"
                    value={y0}
                    onChange={onChangeY0}
                />
            </div>

            <MethodMultiSelect
                label="Methods"
                options={METHOD_OPTIONS}
                selectedIds={selectedMethodIds}
                onChange={onChangeSelectedMethods}
            />

            <div>
                <button
                    type="submit"
                    style={{
                        marginTop: "8px",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#2563eb",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    Solve
                </button>
            </div>

            <ErrorAlert message={error} />
        </form>
    );
}
