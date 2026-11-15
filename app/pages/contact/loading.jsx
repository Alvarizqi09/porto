import { SkeletonPulse } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <section className="py-6 min-h-[80vh] mb-16">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start">
          <div className="flex-1 w-full xl:max-w-md flex flex-col gap-4 order-2 xl:order-none">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-5 glass-card rounded-2xl border border-foreground/15 shadow-sm"
              >
                <SkeletonPulse className="w-13 h-13 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <SkeletonPulse className="w-20 h-4 rounded-md" />
                  <SkeletonPulse className="w-48 h-6 rounded-lg" />
                </div>
              </div>
            ))}
          </div>

          <div className="xl:w-[58%] w-full order-1 xl:order-none">
            <div className="flex flex-col gap-6 p-8 xl:p-10 glass-card rounded-3xl border border-foreground/15 shadow-nature-xl">
              <SkeletonPulse className="w-36 h-4 rounded-full" />
              <SkeletonPulse className="w-64 h-10 rounded-2xl mb-2" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SkeletonPulse className="w-full h-12 rounded-2xl" />
                <SkeletonPulse className="w-full h-12 rounded-2xl" />
                <SkeletonPulse className="w-full h-12 rounded-2xl" />
                <SkeletonPulse className="w-full h-12 rounded-2xl" />
              </div>

              <SkeletonPulse className="w-full h-[140px] rounded-2xl" />

              <SkeletonPulse className="w-40 h-12 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
