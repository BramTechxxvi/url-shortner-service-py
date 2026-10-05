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

    <div className="flex min-w-44 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3
    shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </span>

      <div className="min-w-0 text-left">
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

      <main className='flex-1'>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 
          bg-gradient-to-b from-indigo-50 via-slate-50 to-transparent" 
          />
            <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-18 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">

              <div className="absolute left-4 top-[46%] hidden -translate-y-1/2 lg:block xl:left-10">
                <Feature 
                  icon={<CheckCircle2 size={18}/>}
                  title="No signup"
                  description="Shorten instantly"
                />
              </div>

              <div className='absolute right-4 top-[36%] hidden lg:block xl:right-10'>
                <Feature 
                  icon={<Clock3 size={18}/>}
                  title="Custom expiry"
                  description="Control link lifetime"
                />
              </div>

              <div className='absolute right-4 top-[64%] hidden lg:block xl:right-10'>
                <Feature 
                  icon={<ShieldCheck size={18}/>}
                  title="Validated"
                  description="Safe URL handling"
                />
              </div>


              <div className='mx-auto max-w-4xl text-center'>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border 
                border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Fast, simple and reliable
                </div>

                <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
                  Short links.
            
                  <span className="block text-slate-500">
                    Big possibilities.
                  </span>
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Turn long, messy URLs into clean and sharable links in seconds.
                  Choose when they expire and share them anywhere.
                </p>
              </div>

              <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
                <UrlShortenerForm />
              </div>

              <div className="mx-auto mt-5 grid max-w-3xl gap-3 sm:grid-cols-3 lg:hidden">
                <Feature
                  icon={<CheckCircle2 size={18} />}
                  title="No signup"
                  description="Shorten instantly"
                />

                <Feature
                  icon={<Clock3 size={18} />}
                  title="Custom expiry"
                  description="Control link lifetime"
                />

                <Feature
                  icon={<ShieldCheck size={18} />}
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





