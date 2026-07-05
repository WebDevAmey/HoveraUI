export default function NeonSwipe(){
    return(
        <button className="group relative px-8 py-3 text-white bg-indigo-600 rounded-lg overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2">
  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -translate-x-full group-hover:translate-x-0 transition duration-500"></span>
  <span className="relative z-10">Neon Swipe</span>
</button>
    )
}