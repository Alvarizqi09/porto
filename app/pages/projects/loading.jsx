import { SkeletonPulse } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <div className="mb-20 pt-6">
      <div className="container mx-auto">
        {/* Title */}
        <div className="flex flex-col items-center justify-center mb-10">
          <SkeletonPulse className="w-40 h-5 rounded-full mb-3" />
          <SkeletonPulse className="w-64 h-12 rounded-2xl" />
        </div>
        {/* Tags */}
        <div className="flex flex-row justify-center items-center gap-3 py-4 mb-8">
          {[1, 2, 3].map((i) => (
            <SkeletonPulse key={i} className="w-24 h-10 rounded-full" />
          ))}
        </div>
        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10 mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="glass-card rounded-3xl border border-foreground/15 overflow-hidden shadow-nature p-4"
            >
              <SkeletonPulse className="w-full aspect-[16/10] rounded-2xl mb-4" />
              <div className="p-4 space-y-3">
                <SkeletonPulse className="w-3/4 h-6 mx-auto rounded-xl" />
                <SkeletonPulse className="w-full h-4 mx-auto rounded-lg" />
                <div className="flex gap-2.5 mt-5 justify-center">
                  {[1, 2, 3, 4].map((j) => (
                    <SkeletonPulse key={j} className="w-8 h-8 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
