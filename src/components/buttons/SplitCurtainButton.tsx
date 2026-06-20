export default function SplitCurtainButton() {
  return (
    <button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded-lg border-2 border-emerald-600 bg-transparent px-6 py-3 text-lg font-semibold text-emerald-600 transition-colors duration-300 before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:-translate-x-full before:-translate-y-full before:bg-emerald-600 before:transition-transform before:duration-300 before:ease-out before:content-[''] after:absolute after:left-0 after:top-0 after:z-[-1] after:h-full after:w-full after:translate-x-full after:translate-y-full after:bg-emerald-600 after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:text-white hover:before:translate-x-0 hover:before:translate-y-0 hover:after:translate-x-0 hover:after:translate-y-0">
      Split Curtain
    </button>
  );
}
