import { Link } from "react-router-dom"

function Button({children, disabled, to, type, handler}) {

    const className = "inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed tracking-wide uppercase text-stone-800 sm:px-6 sm:py-4"

    const base ="inline-block rounded-full bg-yellow-400 font-semibold transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed tracking-wide uppercase text-stone-800"

    const style = {
       primary: base+" px-4 py-3 md:px-6 md:py-4",
       small: base + " px-3 py-2 md:px-5 md:py-2.5 text-xs",
       secondary: 'inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
    }

    if(to) return <Link className={className} to={to}>{children}</Link>

    if(handler) return (
        <button disabled={disabled} className={style[type]} onClick={handler}>
            {children}
        </button>
    )

    return (
        <button disabled={disabled} className={style[type]}>
            {children}
        </button>
    )
}

export default Button
