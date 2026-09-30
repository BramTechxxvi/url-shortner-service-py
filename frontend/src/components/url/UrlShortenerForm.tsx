import { ArrowRight, Link2, LoaderCircle } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { ShortUrlResult } from './ShortUrlResult'
import type { ShorturlResponse } from '../../types/url'
import { createShortUrl } from '../../services/urlService'
import { getExpiryDate, type ExpiryOption, } from '../../utils/expiry'
import { ExpirySelector } from './ExpirySelector'




export function UrlShortenerForm() {
    const [url, setUrl] = useState('')
    const [expiry, setExpiry] = useState<ExpiryOption>('never')

    const [customDate, setCustomDate] = useState('')
    const [result, setResult] = useState<ShorturlResponse| null>(null)
    const [error, setError] = useState<string |null>(null)
    const [isLoading, setIsLoading] = useState(false)


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null)
        setResult(null)

        if(!url.trim()) {
            setError("Enter a URL to shorten")
            return
        }
        if (expiry === "custom" && !customDate) {
            setError("Choose a custom expiration date")
            return
        }

        try {
            new URL(url)
        }catch {
            setError("Enter valid URL including http:// or https://")
            return
        }

        try {
            setIsLoading(true)
            const expiresAt = getExpiryDate(expiry, customDate)
            const data = await createShortUrl({url, expires_at: expiresAt})
            
            setResult(data)
        } catch(error) {
            if(error instanceof Error) {
                setError(error.message)
            } else {
                setError("Something is wrong. PLease try again later")
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className='mx-auto w-full max-w-3xl'>
            <form onSubmit={handleSubmit}
            className='rounded-3xl border border-slate-200 bg-white 
            p-4 shadow-xl shadow-slate-200/40 sm:p-6'
            >
                <div className='space-y-5'>
                    <div>
                        <label 
                        htmlFor="url"
                        className='mb-2 block text-sm font-semibold text-slate-700'
                        >
                            Long URL
                        </label>

                        <div className='relative'>
                            <Link2 
                            size={19}
                            className='pointer-events-none absolute left-4 
                            top-1/2 -translate-y-1/2 text-slate-400'/>

                            <input
                            id="url"
                            type="url"
                            value={url}
                            onChange={(event)=>
                                setUrl(event.target.value)
                            }
                            placeholder='https://example.com/your/very/long/url'
                            autoComplete='url'
                            className='min-h-14 w-full rounded-xl border border-slate-200
                            bg-white pl-12 pr-4 textt-base text-slate-950 outline-none transition
                            placeholder:text-slate-400 focus:border-slate-400 focus:rinf-slate-100'
                            />
                        </div>
                    </div>

                    <div className='grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end'>
                        <ExpirySelector 
                        value={expiry}
                        customDate={customDate}
                        onChange={setExpiry}
                        onCustomDateChange={setCustomDate} 
                        />

                        <button
                        type="submit"
                        disabled={isLoading}
                        className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl 
                        bg-slate-950 px-6 font-semibold text-white transition hover:bg-slate-800
                        disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-44'
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle 
                                    size={18}
                                    className='animate-spin'
                                    />
                                    Shortening....
                                </>
                            ) : (
                                <>
                                    Shorten URL
                                    <ArrowRight size={18}/>
                                </>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div
                        role="alert"
                        className='rounded=xl border border-red-200 bg-red-50 px-4 py-3 
                        text:sm font=medium text-red-700'
                        >
                            {error}
                        </div>
                    )}
                </div>
            </form>

            {result && <ShortUrlResult result={result} />}
        </div>
    )
    
}