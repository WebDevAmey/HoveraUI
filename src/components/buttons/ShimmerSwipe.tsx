export default function ShimmerSwipe() {
    return (
        <button className="relative px-10 py-4 rounded-xl bg-indigo-600 text-white font-semibold overflow-hidden group shadow-lg hover:shadow-indigo-500/40 transition hover:scale-105">

  
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition duration-700 ease-out"></span>

  <span className="relative z-10">Shimmer Swipe</span>
</button>
    )
}