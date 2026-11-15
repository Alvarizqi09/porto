import { SkeletonPulse } from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start my-6 py-6">
      <div className="container mx-auto">
        <div className="hidden lg:flex justify-center mb-10">
          <div className="glass-card p-2 rounded-full border border-foreground/15 shadow-sm flex gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonPulse key={i} className="w-28 h-10 rounded-full" />
            ))}
          </div>
        </div>

        <div className="glass-card p-8 xl:p-10 rounded-3xl border border-foreground/15 shadow-nature max-w-5xl mx-auto w-full space-y-6">
          <SkeletonPulse className="w-40 h-5 rounded-full" />
          <SkeletonPulse className="w-64 h-10 rounded-2xl" />
          <SkeletonPulse className="w-full h-16 rounded-2xl" />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonPulse key={i} className="h-16 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
