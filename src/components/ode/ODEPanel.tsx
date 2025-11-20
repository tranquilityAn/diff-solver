import { useState } from "react";
import { odeOptions } from "../../math/functions/odeOptions";
import { ODEForm } from "./ODEForm";
import { ODEResultsTable } from "./ODEResultsTable";
import { ODEChart } from "./ODEChart";
import { useODECalculator } from "../../hooks/useODECalculator";
import type { ODEMethodId } from "../../math/ode/aggregators";

export function ODEPanel() {
    const [selectedODEId, setSelectedODEId] = useState(odeOptions[0]?.id ?? "");
    const [a, setA] = useState(0);
    const [b, setB] = useState(1);
    const [n, setN] = useState(10);
    const [y0, setY0] = useState(1);
    const [selectedMethodIds, setSelectedMethodIds] = useState<string[]>([
        "euler",
        "rk2",
        "rk3",
        "rk4",
    ]);

    const { results, error, calculate } = useODECalculator();

    const handleSubmit = () => {
        calculate({
            odeId: selectedODEId,
            a,
            b,
            n,
            y0,
            methods: selectedMethodIds as ODEMethodId[],
        });
    };

    return (
        <section>
            <h2 style={{ marginTop: 0, marginBottom: "16px" }}>
                Differential equations
            </h2>

            <ODEForm
                odeOptions={odeOptions}
                selectedODEId={selectedODEId}
                onChangeODE={setSelectedODEId}
                a={a}
                b={b}
                n={n}
                y0={y0}
                onChangeA={setA}
                onChangeB={setB}
                onChangeN={setN}
                onChangeY0={setY0}
                selectedMethodIds={selectedMethodIds}
                onChangeSelectedMethods={setSelectedMethodIds}
                onSubmit={handleSubmit}
                error={error}
            />

            {results && results.length > 0 && (
                <>
                    <ODEResultsTable results={results} />
                    <ODEChart results={results} />
                </>
            )}
        </section>
    );
}
