import { Link2 } from 'lucide-react'
import { GithubIcon } from '../Icons'






export function Header() {
    return (
        <header className='border-b border-slate-200/80 bg-white/80 backdrop-blur'>
            <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
                <a href="/" className='flex items-center gap-2 text-lg font-bold tracking-light text-slate-950'>
                    <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white'>
                        <Link2 size={18} />
                    </span>
                    BramShort
                </a>

                <a
                    href="https://github.com/BramTechxxvi"
                    target="blank"
                    rel="noreferrer"
                    className='flex min-h-11 items-center gap2 rounded-xl px-3 text-sm font-medium text-slate-600
                            transition hover:bg-slate-100 hover:text-slate-950'>
                    <span>
                        <GithubIcon/>
                    </span>
                
                </a>
            </div>
        </header>
    )
}


