export function Footer(){
    return (
        <footer className="border-t border-slate-200">
            <div className="mx-auto flex max-w-6xl flex col gap2 px-4 py-6 text-sm 
            text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

                <p>
                    © {new Date().getFullYear()} BramShort
                </p>

                <p>
                    All Rights Reserved
                </p>
            </div>
        </footer>
    )
}