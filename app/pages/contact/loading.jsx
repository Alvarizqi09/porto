import { SkeletonPulse } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <section className="py-6 min-h-[80vh]">
      <div className="container mx-auto mb-10">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="flex-1 flex flex-col justify-center xl:justify-end gap-10 order-2 xl:order-none mb-8 xl:mb-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-6">
                <SkeletonPulse className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] rounded-md" />
                <div className="flex-1 space-y-2">
                  <SkeletonPulse className="w-20 h-5" />
                  <SkeletonPulse className="w-48 h-7" />
                </div>
              </div>
            ))}
          </div>

          <div className="xl:w-[54%] order-1 xl:order-none">
            <div className="flex flex-col gap-6 p-10 bg-[#DFD3C3] bg-opacity-30 rounded-xl">
              <SkeletonPulse className="w-48 h-10 mb-2" />
              <div className="space-y-2 mb-4">
                <SkeletonPulse className="w-full h-4" />
                <SkeletonPulse className="w-3/4 h-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonPulse className="w-full h-12 rounded-md" />
                <SkeletonPulse className="w-full h-12 rounded-md" />
                <SkeletonPulse className="w-full h-12 rounded-md" />
                <SkeletonPulse className="w-full h-12 rounded-md" />
              </div>

              <SkeletonPulse className="w-full h-[200px] rounded-md" />

              <SkeletonPulse className="w-32 h-12 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
