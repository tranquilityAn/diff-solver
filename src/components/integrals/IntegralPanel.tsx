import { useState } from "react";
import { integrandOptions } from "../../math/functions/integrandOptions";
import { IntegralForm } from "./IntegralForm";
import { IntegralResultsTable } from "./IntegralResultsTable";
import {
    useIntegralCalculator,
    type IntegralMethodId,
} from "../../hooks/useIntegralCalculator";

export function IntegralPanel() {
    const [selectedIntegrandId, setSelectedIntegrandId] = useState(
        integrandOptions[0]?.id ?? ""
    );
    const [a, setA] = useState(0);
    const [b, setB] = useState(1);
    const [n, setN] = useState(10);
    const [selectedMethodIds, setSelectedMethodIds] = useState<string[]>([
        "left",
        "right",
        "middle",
        "trapezoid",
        "simpson",
    ]);

    const { results, error, calculate } = useIntegralCalculator();

    const handleSubmit = () => {
        calculate({
            integrandId: selectedIntegrandId,
            a,
            b,
            n,
            methods: selectedMethodIds as IntegralMethodId[],
        });
    };

    return (
        <section>
            <h2 style={{ marginTop: 0, marginBottom: "16px" }}>
                Definite integrals
            </h2>

            <IntegralForm
                integrandOptions={integrandOptions}
                selectedIntegrandId={selectedIntegrandId}
                onChangeIntegrand={setSelectedIntegrandId}
                a={a}
                b={b}
                n={n}
                onChangeA={setA}
                onChangeB={setB}
                onChangeN={setN}
                selectedMethodIds={selectedMethodIds}
                onChangeSelectedMethods={setSelectedMethodIds}
                onSubmit={handleSubmit}
                error={error}
            />

            {results && <IntegralResultsTable results={results} />}
        </section>
    );
}
