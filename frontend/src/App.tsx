import type { ReactNode } from 'react'
import { CheckCircle2, Clock3, ShieldCheck, } from "lucide-react"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import { UrlShortenerForm } from "./components/url/UrlShortenerForm"





interface FeatureProps {
  icon: ReactNode
  title: string
  description: string
}


function Feature({
  icon,
  title,
  description
}: FeatureProps) {
  return(

    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>
        <p className="text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  )
}



function App() {

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 
          bg-gradient-to-b from-indigo-50 via-slate-50 to-transparent" 
          />
            <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
              <div className="mx-auto max-w-4xl text-center">

                <div className="mb-6 inline-flex items-center gap-2 rounded-full border boder-slate-200 
                bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                  <span className="h-2 w-2 rounded-gull bg-emerald-500" />
                    Fast simple, reliable
                </div>
                <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
                  Short Links.
                  <span className="block text-slate-500">
                    Big possibilities.
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Turm long, messy URLs into clean and reliable short links in seconds.
                  Choose when they expire and share them anywhere.
                </p>
              </div>

              <div className="mt-10 sm:mt-12">
                <UrlShortenerForm/>
              </div>

              <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-col-3">
                <Feature 
                  icon={<CheckCircle2 size={18}/>}
                  title="No signup"
                  description="Shorten instantly"
                />

                <Feature 
                  icon={<Clock3 size={18}/>}
                  title="Custom expiry"
                  description="Control link lifetime"
                />

                <Feature 
                  icon={<ShieldCheck size={18}/>}
                  title="Validated"
                  description="Safe URL handling"
                />
              </div>
            </div>
        </section>
      </main>

      <Footer/>
    </div>
  )
}

export default App








so for the expiry i like the idea of where they can select a option but let's make it broad, how about they select if to be active for some hours or days so they select hours or days then the number as well 
And ALSO IN UrlShortenerForm FOrmEvent is deprciated

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
type 'Dispatch<SetStateAction<ExpiryOption>>' is not assignable to type '(value: string) => void'.
  Types of parameters 'value' and 'value' are incompatible.
    Type 'string' is not assignable to type 'SetStateAction<ExpiryOption>'.ts(2322)
ExpirySelector.tsx(10, 5): The


