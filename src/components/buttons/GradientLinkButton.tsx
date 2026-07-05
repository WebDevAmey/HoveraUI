export default function GradientLinkButton() {
  return (
    <button className="relative inline-block cursor-pointer bg-gradient-to-r from-blue-600 via-blue-600 to-black bg-[size:200%_100%] bg-[position:100%_0] bg-clip-text text-5xl font-black text-transparent transition-all duration-700 ease-out hover:bg-[position:0%_0] focus-visible:outline-2 focus-visible:outline-offset-2">
      Link
    </button>
  );
}
