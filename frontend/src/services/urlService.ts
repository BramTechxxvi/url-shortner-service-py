import type { CreateShortUrlRequest, ShorturlResponse } from "../types/url";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export async function createShortUrl(
    payload:CreateShortUrlRequest): Promise<ShorturlResponse> {
        const response = await fetch(
            `${API_BASE_URL}/api/v1/urls`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(payload),
            },
        )
        if (!response.ok) {
            let message = "Unable to shorten URL"
            try {
                const errorData = await response.json()

                if (typeof errorData.detail === 'string') {
                    message = errorData.detail
                }
            } catch {
                throw new Error("Unable to shorten URL")
            }
            throw new Error(message)
        }
    return response.json()
}

