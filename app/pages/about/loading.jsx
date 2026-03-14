import { SkeletonPulse } from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center my-10 py-12 xl:py-0">
      <div className="container mx-auto">
        <div className="flex flex-col gap-[30px] w-full">
          {/* Title */}
          <div className="flex flex-col items-center xl:items-start gap-4">
            <SkeletonPulse className="w-48 h-10" />
            <SkeletonPulse className="w-full max-w-[600px] h-5" />
            <SkeletonPulse className="w-full max-w-[500px] h-5" />
          </div>
          {/* Info grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <SkeletonPulse className="w-24 h-5" />
                <SkeletonPulse className="w-32 h-5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
