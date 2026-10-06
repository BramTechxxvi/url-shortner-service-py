export type ExpiryOption =
| "never"
| "hours"
| "days"


export function getExpiryDate(
    option: ExpiryOption,
    amount?: number,
): string | null {
    if (option === "never") {
        return null
    }

    if (amount === undefined || !Number.isFinite(amount) || amount <= 0) {
        throw new Error("Expiration duration must be greater thn zero")
    }

    const expiryDate = new Date()

    if(option === 'hours') {
        expiryDate.setHours(expiryDate.getHours() + amount)
    }
    if (option === 'days') {
        expiryDate.setDate(expiryDate.getDay() + amount)
    }
    
    return expiryDate.toISOString()
}