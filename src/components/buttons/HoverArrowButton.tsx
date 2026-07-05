export default function HoverArrowButton() {
  return (
    <button className="group relative overflow-hidden border-2 border-blue-600 bg-white px-8 py-3 text-white rounded-full font-medium min-w-[120px] h-[52px] focus-visible:outline-2 focus-visible:outline-offset-2">
      <span className="block transition-all duration-300 transform group-hover:translate-x-full group-hover:opacity-0 text-blue-600">
        Hover
      </span>

      <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-white bg-blue-600">
        →
      </span>
    </button>
  );
}
