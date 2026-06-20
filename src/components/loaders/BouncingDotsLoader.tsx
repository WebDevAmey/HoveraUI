export default function BouncingDotsLoader() {
  return (
    <div className="flex items-center space-x-2 py-4">
      <div className="h-3 w-3 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
      <div className="h-3 w-3 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
      <div className="h-3 w-3 animate-bounce rounded-full bg-emerald-500" />
    </div>
  );
}
