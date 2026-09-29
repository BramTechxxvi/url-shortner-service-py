export type ExpiryOption =
| "never"
| "1-hour"
| "1-day"
| "7-days"
| "30-days"
| "custom"


export function getExpiryDate(
    option: ExpiryOption,
    customDate?: string,
): string | null {
    if (option === "never") {
        return null
    }
    if (option === "custom") {
        if(!customDate) {
            return null
        }

        return new Date(customDate).toISOString()

    }

    const now = new Date()

    switch(option) {
        case "1-hour":
            now.setHours(now.getHours() + 1)
            break
    
        case "1-day":
            now.setDate(now.getDate() + 1)
            break
        
        case "7-days":
            now.setDate(now.getDate() +7)
            break
            
        case "30-days":
            now.setDate(now.getDate() +30)
            break
    }
    return now.toISOString()
}