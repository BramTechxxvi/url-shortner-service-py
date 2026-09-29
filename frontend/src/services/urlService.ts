import type { CreateShortUrlRequest, ShorturlResponse } from "../types/url";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export async function createShortUel(
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
            throw new Error("Unable to reach shorten URL")
        }
    return response.json()
}