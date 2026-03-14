import { SkeletonPulse } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <div className="mb-10">
      <div className="container">
        {/* Title */}
        <div className="flex justify-center my-8">
          <SkeletonPulse className="w-48 h-10" />
        </div>
        {/* Tags */}
        <div className="flex flex-row justify-center items-center gap-2 py-6">
          {[1, 2, 3].map((i) => (
            <SkeletonPulse key={i} className="w-20 h-9 rounded-full" />
          ))}
        </div>
        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-12 mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border-4 border-gray-200 overflow-hidden"
            >
              <SkeletonPulse className="w-full h-[250px] rounded-none" />
              <div className="bg-[#DFD3C3] py-4 px-6 space-y-2">
                <SkeletonPulse className="w-3/4 h-6 mx-auto" />
                <SkeletonPulse className="w-full h-4 mx-auto" />
                <div className="flex gap-3 mt-4 justify-center">
                  {[1, 2, 3].map((j) => (
                    <SkeletonPulse key={j} className="w-6 h-6 rounded" />
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
