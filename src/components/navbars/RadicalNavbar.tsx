export default function RadicalNavbar() {
  return (
    <div className="absolute top-6 left-1/2 z-10 max-w-2xl px-4 w-full -translate-x-1/2">
      <nav className="bg-yellow-400 border-black border-4 p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
        <a href="#" className="font-black text-black text-xl tracking-tight font-mono">RADICAL.</a>

        <div className="items-center flex space-x-1">
          <a href="#" className="font-bold font-black text-black hover:bg-white hover:border-black px-4 py-2 hover:border-2 border-2 border-yellow-400">Work</a>
          <a href="#" className="font-bold font-black text-black hover:bg-white hover:border-black px-4 py-2 hover:border-2 border-2 border-yellow-400">Studio</a>
        </div>

        <button className="text-white font-black font-bold px-4 py-2 bg-black hover:bg-yellow-400 hover:text-black border-2 border-black">
          Let&apos;s Talk
        </button>
      </nav>
    </div>
  );
}
