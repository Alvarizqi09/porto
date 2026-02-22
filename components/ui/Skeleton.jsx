"use client";


export const SkeletonPulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

export const ProjectDetailSkeleton = () => (
  <div className="min-h-screen">
    {/* Hero Skeleton */}
    <div className="relative w-full h-[50vh] lg:h-[60vh]">
      <SkeletonPulse className="absolute inset-0 rounded-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
        <div className="container mx-auto">
          <div className="flex gap-2 mb-4">
            <SkeletonPulse className="w-16 h-7 rounded-full" />
            <SkeletonPulse className="w-20 h-7 rounded-full" />
          </div>
          <SkeletonPulse className="w-2/3 h-12 mb-4" />
          <SkeletonPulse className="w-1/2 h-6" />
        </div>
      </div>
    </div>

    <div className="container mx-auto px-4 py-12">
      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-4 -mt-16 relative z-10 mb-12">
        {[1, 2, 3].map((i) => (
          <SkeletonPulse key={i} className="h-24 rounded-xl" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <SkeletonPulse className="w-40 h-8" />
          <SkeletonPulse className="w-full h-4" />
          <SkeletonPulse className="w-full h-4" />
          <SkeletonPulse className="w-3/4 h-4" />
          <SkeletonPulse className="w-full h-32 mt-4" />
        </div>
        <div className="space-y-4">
          <SkeletonPulse className="w-full h-14 rounded-xl" />
          <SkeletonPulse className="w-full h-14 rounded-xl" />
          <SkeletonPulse className="w-32 h-6 mt-6" />
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonPulse key={i} className="w-12 h-12 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Gallery skeleton */}
      <div className="mt-16">
        <SkeletonPulse className="w-48 h-8 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonPulse key={i} className="h-52 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);
