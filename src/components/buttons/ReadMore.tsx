export default function ReadMore() {
    return(
        <button className="group relative px-8 py-3 rounded-full text-white font-semibold bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(255,0,150,0.6)] overflow-hidden">

    <span className="absolute inset-0 bg-pink-500 opacity-30 blur-2xl group-hover:blur-3xl transition duration-500"></span>

    <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent translate-x-[-20%] group-hover:translate-x-[20%] transition duration-700 ease-out"></span>

    <span className="relative z-10">Read More</span>
</button>
    )
}