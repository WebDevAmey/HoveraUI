"use client";

export default function SkeletonProfile() {
  return (
    <div className="w-[450px] flex gap-6 p-7 bg-[#1e293b] rounded-[20px]">
      <div
        className="w-20 h-20 rounded-full bg-white/5 relative overflow-hidden shrink-0
                    before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent"
      />
      <div className="flex-1">
        <div
          className="w-[70%] h-5 mb-5 rounded-lg bg-white/5 relative overflow-hidden
                      before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent"
        />
        <div className="space-y-3">
          <div
            className="w-full h-3.5 rounded-lg bg-white/5 relative overflow-hidden
                        before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent"
          />
          <div
            className="w-full h-3.5 rounded-lg bg-white/5 relative overflow-hidden
                        before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent"
          />
          <div
            className="w-[60%] h-3.5 rounded-lg bg-white/5 relative overflow-hidden
                        before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
