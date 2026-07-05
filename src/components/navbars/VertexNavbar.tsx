export default function VertexNavbar() {
  return (
    <div className="absolute z-10 top-4 left-0 w-full px-4">
      <nav className="max-w-4xl mx-auto px-6 py-3 border border-rose-900/30 rounded-full bg-rose-950 flex items-center justify-between shadow-2xl backdrop-blur-md">
        <a href="#" className="text-white font-black tracking-widest text-lg font-mono focus:outline-none focus:ring-2 focus:ring-rose-400 rounded-lg px-2">
          VERTEX
        </a>

        <div className="hidden md:flex items-center space-x-2">
          <a href="#features" className="text-white/90 font-mono px-4 py-2 hover:bg-rose-900 hover:text-white rounded-full transition-colors duration-200">
            Features
          </a>
          <a href="#pricing" className="text-white/90 font-mono px-4 py-2 hover:bg-rose-900 hover:text-white rounded-full transition-colors duration-200">
            Pricing
          </a>
          <a href="#about" className="text-white/90 font-mono px-4 py-2 hover:bg-rose-900 hover:text-white rounded-full transition-colors duration-200">
            About
          </a>
        </div>

        <button className="relative overflow-hidden bg-rose-950 border text-rose-400 border-rose-400 font-medium px-4 py-2 rounded-md hover:brightness-150 border-b-4 hover:border-b active:opacity-75 outline-none duration-300 group hover:border-t-4 focus-visible:outline-2 focus-visible:outline-offset-2">
          Connect with us
        </button>
      </nav>
    </div>
  );
}
