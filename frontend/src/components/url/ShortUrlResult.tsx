import { Check, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import type { ShorturlResponse } from '../../types/url'




interface ShorturlResultProps {
    result: ShorturlResponse
}

export function ShortUrlResult({
    result,
}: ShorturlResultProps) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        try{
            await navigator.clipboard.writeText(
                result.short_url,
            )
            setCopied(true)
            window.setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch {
            setCopied(false)
        }
    }

    return (
        <section className='mt-6 overflow-hidden rounded-2xl border 
        border-slate-200 bg-white shadow-sm'>
            <div className='border-b border-slate-100 px-5 py-4 sm:py-6'>
                <p className='text-sm font-semibold text-slate-500'>
                    Your Shortened URL
                </p>
            </div>

            <div className='space-y-5 p-5 sm:p-6'>
                <div className='flex flex-col gap-3 rounded-xl bg-slate-50 p-4
                sm:flex-row sm:items-center sm:justify-between'>

                    <a 
                    href={result.short_url}
                    target="_blank"
                    rel="noreferrer"
                    className='min-w-0 break-all text-base font-semibold 
                    text-slate-950 hover:underline'
                    >
                        {result.short_url}
                    </a>

                    <button
                    type="button"
                    onClick={handleCopy}
                    className='inline-flex min-h-11 shrink-0 items-center 
                    justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm
                    font-semibold text-white transition hover:bg-slate-800'
                    >
                        {copied ? (
                            <>
                            <Check size={17}/>
                            Copied
                            </>
                        ): (
                            <>
                            <Copy size={17}/>
                            Copy
                            </>
                        )}
                    </button>
                </div>
                <div className='grid gap-4 text-sm sm:grid-cols-2'>
                    <div>
                        <p className='mb-1 font-medium text-slate-500'>
                            Original URL
                        </p>

                        <a 
                        href={result.original_url}
                        target="_blank"
                        rel="noreferrer"
                        className='flex items-start gap-1 break-all font-medium 
                        text-slate-700 hover:text-slate-950'
                        >
                            {result.original_url}
                            <ExternalLink size={14} className='mt-1 shrink-0'/>
                        </a>
                    </div>

                    <div>
                        <p className='mb-1 font-medium text-slate-500'>
                            Expires
                        </p>

                        <p className='font-medium text-slate-700'>
                            {result.expires_at
                                ? new Date(result.expires_at,).toISOString() : 'Never'
                            }
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}