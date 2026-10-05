import { Clock3 } from "lucide-react";
import type { ExpiryOption } from "../../utils/expiry";




interface ExpirySelectorProps {
    option: ExpiryOption
    amount: number
    onOptionChange: (value: ExpiryOption)=> void
    onAmountChange: (value: number) => void
}


export function ExpirySelector({
    option, amount,
    onOptionChange, onAmountChange
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

            <div
                className={
                option === 'never'
                ? 'grid grid-cols-1 gap-3'
                : 'grid grid-cols-2 gap-3'
                }
            >
                <select 
                id="expiry-option"
                value={option}
                onChange={(event) =>
                onOptionChange(event.target.value as ExpiryOption)
                }
                className="min-h-12 w-full rounded-xl border border-slate-200
                bg-white px-4 text-base text-slate-800 outline-none trasition
                focus:border:slate-400 focus:ring-4 focus:ring-slate-100"
                >
                    <option value="never">Never Expires</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                </select>

                {option !== "never" && (
                    <input 
                        type="number"
                        min="1"
                        step="1"
                            value={amount}
                        onChange={(event)=>
                            onAmountChange(Number(event.target.value))
                        }
                        aria-label="Expiration duration"
                        required
                        className="min-h-12 w-full rounded-xl border border-slate-200
                        bg-white px-4 text-base text-slate-800 outline-none 
                        transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                )}
            </div>

            {option !=='never' && (
                <p className="text-xs text-slate-500">
                    This link will remain active for {' '}
                    <span className="font-semibold">
                        {amount} {option}
                    </span>
                    .
                </p>
            )}
        </div>
    )
}