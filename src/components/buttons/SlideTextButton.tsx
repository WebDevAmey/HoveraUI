export default function SlideTextButton() {
  return (
    <button className="group cursor-pointer rounded-xl border-[1px] border-slate-500 bg-gradient-to-b from-indigo-500 to-pink-600 px-6 py-3 font-medium text-white shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] focus-visible:outline-2 focus-visible:outline-offset-2">
      <div className="relative overflow-hidden">
        <p className="duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-x-20">
          Button
        </p>
        <p className="absolute top-0 left-20 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:left-0">
          Button
        </p>
      </div>
    </button>
  );
}
