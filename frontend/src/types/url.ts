export interface CreateShortUrlRequest {
    url: string
    expires_at?: string | null
}

export interface ShorturlResponse {
    original_url: string
    short_code: string
    short_url: string
    created_at: string
    expires_at: string  | null
}