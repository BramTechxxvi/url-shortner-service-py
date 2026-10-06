
import type { ReactNode } from 'react'

import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Zap,
} from 'lucide-react'

import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { UrlShortenerForm } from './components/url/UrlShortenerForm'

interface FeatureProps {
  icon: ReactNode
  title: string
  description: string
}

function Feature({
  icon,
  title,
  description,
}: FeatureProps) {
  return (
    <div
      className="
        flex w-full min-w-0 items-center gap-3
        rounded-2xl border border-slate-200
        bg-white/90 px-3 py-3
        shadow-sm backdrop-blur
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
      "
    >
      <span
        className="
          flex h-9 w-9 shrink-0
          items-center justify-center
          rounded-xl bg-slate-100 text-slate-700
        "
      >
        {icon}
      </span>

      <div className="min-w-0 text-left">
        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950">
      <Header />

      <main className="flex flex-1 flex-col">
        <section className="relative w-full overflow-hidden">
          {/* Background gradient */}
          <div
            className="
              pointer-events-none absolute
              inset-x-0 top-0 h-80
              bg-gradient-to-b
              from-indigo-50 via-slate-50 to-transparent
            "
          />

          <div
            className="
              relative mx-auto w-full max-w-7xl
              px-4 pb-8 pt-6
              sm:px-6 sm:pt-8
              lg:px-8 lg:pt-10
            "
          >
            {/* Hero */}
            <div className="mx-auto max-w-3xl text-center">
              <div
                className="
                  mb-5 inline-flex items-center gap-2
                  rounded-full border border-slate-200
                  bg-white px-4 py-2
                  text-sm font-medium text-slate-600
                  shadow-sm
                "
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                Fast, simple and reliable
              </div>

              <h1
                className="
                  text-4xl font-black tracking-tight
                  text-slate-950
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Short links.

                <span className="block text-slate-500">
                  Big possibilities.
                </span>
              </h1>

              <p
                className="
                  mx-auto mt-5 max-w-xl
                  text-base leading-7 text-slate-600
                  sm:text-lg
                "
              >
                Turn long, messy URLs into clean and shareable
                links in seconds. Choose when they expire
                and share them anywhere.
              </p>
            </div>

            {/* Main content: one responsive layout */}
            <div
              className="
                mx-auto mt-8 grid w-full max-w-6xl
                grid-cols-1 gap-4
                xl:grid-cols-[190px_minmax(0,1fr)_190px]
                xl:items-center xl:gap-6
              "
            >
              {/* Left features */}
              <div
                className="
                  order-2 grid min-w-0
                  grid-cols-1 gap-3
                  sm:grid-cols-2
                  xl:order-1 xl:grid-cols-1
                "
              >
                <Feature
                  icon={<CheckCircle2 size={18} />}
                  title="No signup"
                  description="No account required"
                />

                <Feature
                  icon={<Zap size={18} />}
                  title="Instant"
                  description="Links ready in seconds"
                />
              </div>

              {/* URL shortener form */}
              <div className="order-1 min-w-0 xl:order-2">
                <UrlShortenerForm />
              </div>

              {/* Right features */}
              <div
                className="
                  order-3 grid min-w-0
                  grid-cols-1 gap-3
                  sm:grid-cols-2
                  xl:grid-cols-1
                "
              >
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
