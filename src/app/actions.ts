"use server";

const N8N_WEBHOOK_URL = "https://n8n.resto.guruweb.com.ar/webhook/carlos-activador";

export async function sendToN8n(data: any) {
    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString()
            }),
        });

        if (!response.ok) {
            console.error("n8n responded with error:", response.status);
            return { success: false };
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to send to n8n:", error);
        return { success: false };
    }
}
