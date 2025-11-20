import type { IntegrandOption } from "../../math/functions/integrandOptions";
import { NumberInput } from "../common/NumberInput";
import { Select } from "../common/Select";
import { MethodMultiSelect, type MethodOption } from "../common/MethodMultiSelect";
import { ErrorAlert } from "../common/ErrorAlert";

export interface IntegralFormProps {
    integrandOptions: IntegrandOption[];

    selectedIntegrandId: string;
    onChangeIntegrand: (id: string) => void;

    a: number;
    b: number;
    n: number;

    onChangeA: (value: number) => void;
    onChangeB: (value: number) => void;
    onChangeN: (value: number) => void;

    selectedMethodIds: string[]; // e.g. ["left","right","simpson"]
    onChangeSelectedMethods: (ids: string[]) => void;

    onSubmit: () => void;

    error?: string | null;
}

const METHOD_OPTIONS: MethodOption[] = [
    { id: "left", label: "Left rectangles" },
    { id: "right", label: "Right rectangles" },
    { id: "middle", label: "Middle rectangles" },
    { id: "trapezoid", label: "Trapezoid" },
    { id: "simpson", label: "Simpson" },
];

export function IntegralForm(props: IntegralFormProps) {
    const {
        integrandOptions,
        selectedIntegrandId,
        onChangeIntegrand,
        a,
        b,
        n,
        onChangeA,
        onChangeB,
        onChangeN,
        selectedMethodIds,
        onChangeSelectedMethods,
        onSubmit,
        error,
    } = props;

    const integrandSelectOptions = integrandOptions.map((opt) => ({
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
                label="Integrand function"
                value={selectedIntegrandId}
                onChange={onChangeIntegrand}
                options={integrandSelectOptions}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "12px",
                }}
            >
                <NumberInput label="a (start)" value={a} onChange={onChangeA} />
                <NumberInput label="b (end)" value={b} onChange={onChangeB} />
                <NumberInput
                    label="N (steps)"
                    value={n}
                    onChange={onChangeN}
                    min={1}
                    step={1}
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
                    Compute
                </button>
            </div>

            <ErrorAlert message={error} />
        </form>
    );
}
