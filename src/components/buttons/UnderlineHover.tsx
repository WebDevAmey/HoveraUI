export default function UnderlineHover() {
  return (
    <button className="group px-6 py-3 text-lg font-medium text-indigo-600">
      <span className="relative inline-block">
        Hover Me
        <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-indigo-600 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
      </span>
    </button>
  );
}
