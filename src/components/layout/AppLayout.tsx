import { ReactNode } from "react";

export interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                padding: "24px",
                backgroundColor: "#f5f5f5",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "960px",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                }}
            >
                {children}
            </div>
        </div>
    );
}
