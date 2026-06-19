export default function LuminanceFlux() {
    return (
        <button className="group relative px-14 py-4 rounded-2xl text-white font-semibold bg-slate-900 overflow-hidden shadow-[0_0_30px_rgba(120,0,255,0.3)] transition hover:scale-105">

            <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-400 opacity-40 translate-x-[-30%] group-hover:translate-x-[30%] transition-all duration-1000 ease-out blur-xl"></span>

            <span className="absolute inset-0 bg-white/10 mix-blend-overlay"></span>

            <span className="absolute inset-0 rounded-2xl bg-fuchsia-500/20 blur-2xl opacity-0 group-hover:opacity-60 group-hover:blur-[40px] transition-all duration-700"></span>

            <span className="relative z-10">Luminance Flux</span>
        </button>
    )
}