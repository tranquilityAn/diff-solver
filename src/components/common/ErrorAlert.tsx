export interface ErrorAlertProps {
    message?: string | null;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
    if (!message) return null;

    return (
        <div
            style={{
                marginTop: "16px",
                padding: "12px 16px",
                borderRadius: "8px",
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                fontSize: "14px",
            }}
        >
            {message}
        </div>
    );
}
