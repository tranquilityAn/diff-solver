import { useState } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import { Header } from "./components/layout/Header";
import { ModeTabs, type AppMode } from "./components/layout/ModeTabs";
import { IntegralPanel } from "./components/integrals/IntegralPanel.tsx";
import { ODEPanel } from "./components/ode/ODEPanel";

function App() {
    const [mode, setMode] = useState<AppMode>("integral");

    return (
        <AppLayout>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Header />
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <ModeTabs mode={mode} onChange={setMode} />
            </div>
            {mode === "integral" ? <IntegralPanel /> : <ODEPanel />}
        </AppLayout>
    );
}

export default App;
