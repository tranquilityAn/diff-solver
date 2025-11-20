export type AppMode = "integral" | "ode";

export interface ModeTabsProps {
    mode: AppMode;
    onChange: (mode: AppMode) => void;
}

export function ModeTabs({ mode, onChange }: ModeTabsProps) {
    return (
        <div
            style={{
                display: "inline-flex",
                borderRadius: "999px",
                border: "1px solid #ddd",
                overflow: "hidden",
                marginBottom: "24px",
            }}
        >
            <TabButton
                active={mode === "integral"}
                onClick={() => onChange("integral")}
            >
                Definite integrals
            </TabButton>
            <TabButton active={mode === "ode"} onClick={() => onChange("ode")}>
                Differential equations
            </TabButton>
        </div>
    );
}

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

function TabButton({ active, onClick, children }: TabButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                padding: "8px 16px",
                border: "none",
                backgroundColor: active ? "#2563eb" : "transparent",
                color: active ? "#fff" : "#444",
                fontSize: "14px",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
            }}
        >
            {children}
        </button>
    );
}
