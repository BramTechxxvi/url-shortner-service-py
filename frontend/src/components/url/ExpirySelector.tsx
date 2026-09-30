import { CalendarDays, Clock3 } from "lucide-react";
import type { ExpiryOption } from "../../utils/expiry";




interface ExpirySelectorProps {
    value: ExpiryOption
    customDate: string
    onChange: (value: string) => void
    onCustomDateChange: (value: string) => void
}


export function ExpirySelector({
    value, customDate,
    onChange, onCustomDateChange
}: ExpirySelectorProps) {
    return (
        <div className="space-y-3.">
            <label 
            htmlFor="expiry"
            className="flex items-center gap-2 text-sm
            font-semibold text-slate-700"
            >
                <Clock3 size={16} />
                Expiration
            </label>

            <select 
            id="expiry"
            value={value}
            onChange={(event) =>
                onChange(event.target.value as ExpiryOption)
            }
            className="min-h-12 w-full rounded-xl border border-slate-200
            bg-white px-4 text-base text-slate-800 outline-nonw trasition
            focus:borrder:slate-400 focus:ring-4 focus:ring-slate-100"
            >
                <option value="never">Never Expires</option>
                <option value="1-hour">1 Hour</option>
                <option value="1-day">1 Day</option>
                <option value="7-days">7 Days</option>
                <option value="30-days">30 Days</option>
                <option value="custom">Custom date</option>
            </select>

            {value === "custom" && (
                    <div className="relative">
                        <CalendarDays 
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 
                        -translate-y-1/2 text-late-400"
                    />
                        <input 
                        type="datetime-local"
                        value={customDate}
                        onChange={(event)=>
                            onCustomDateChange(event.target.value)
                        }
                        min={new Date().toISOString().slice(0,16)}
                        required
                        className="min-h-12 w-fullrounded-xl border border-slate-200
                        bg-white pl-11 pr-4 text-base text-slate-800 outline-none 
                        transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                    </div>
                )}
        </div>
    )
}