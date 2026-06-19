export default function SwipeButton() {
    return (
        <button className="group relative px-8 py-3 rounded-lg bg-indigo-600 text-white overflow-hidden hover:scale-105 hover:-translate-y-1 active:translate-y-0 transform transition-all">
    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 -translate-x-full group-hover:translate-x-0 transition duration-500 hover:scale-105"></span>
    <span className="relative z-10">Swipe Me </span>
</button>
    )
}