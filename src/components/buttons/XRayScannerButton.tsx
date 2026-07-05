export default function XRayScannerButton() {
  return (
    <button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded border-2 border-white bg-neutral-900 px-6 py-3 text-lg font-bold text-white before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-white before:mix-blend-difference before:transition-all before:duration-300 before:ease-out before:content-[''] hover:before:h-full focus-visible:outline-2 focus-visible:outline-offset-2">
      X-RAY SCANNER
    </button>
  );
}
