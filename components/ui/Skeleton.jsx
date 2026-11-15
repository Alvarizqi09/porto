"use client";

export const SkeletonPulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-[#E8E3D9]/70 rounded-2xl ${className}`} />
);

export const ProjectDetailSkeleton = () => (
  <div className="min-h-screen py-10">
    <div className="container mx-auto px-4">
      {/* Top back button skeleton */}
      <div className="flex justify-between items-center mb-10">
        <SkeletonPulse className="w-24 h-10 rounded-full" />
        <SkeletonPulse className="w-20 h-7 rounded-full" />
      </div>

      {/* Hero grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-8">
          <SkeletonPulse className="aspect-[16/10] w-full rounded-3xl" />
        </div>
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-center">
          <SkeletonPulse className="w-3/4 h-12 rounded-xl" />
          <SkeletonPulse className="w-full h-20 rounded-xl" />
          <div className="flex gap-3 pt-4">
            <SkeletonPulse className="flex-1 h-12 rounded-full" />
            <SkeletonPulse className="flex-1 h-12 rounded-full" />
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {[1, 2, 3].map((i) => (
          <SkeletonPulse key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <SkeletonPulse className="h-64 rounded-3xl" />
        </div>
        <div className="lg:col-span-4">
          <SkeletonPulse className="h-64 rounded-3xl" />
        </div>
      </div>
    </div>
  </div>
);
