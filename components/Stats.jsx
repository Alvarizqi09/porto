"use client";
import GitHubCalendar from "react-github-calendar";
import { useEffect, useState } from "react";
import { GitCommit } from "lucide-react";

const Stats = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="flex items-center justify-center h-full my-12">
        <div className="container mx-auto">
          <div className="max-w-[80vw] xl:max-w-none mx-auto">
            <div className="flex items-center justify-center min-h-[180px]">
              <div className="w-full h-[180px] bg-card/60 backdrop-blur-sm animate-pulse rounded-3xl border border-foreground/10" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Ghibli garden theme palette for contribution boxes:
  // Level 0: soft warm parchment/cream
  // Level 1: pale sprout green
  // Level 2: soft meadow sage
  // Level 3: rich forest green
  // Level 4: deep emerald foliage
  const ghibliTheme = {
    light: ["#EDE8DD", "#C3DBC9", "#8FB89D", "#5A8B6A", "#335E42"],
    dark: ["#EDE8DD", "#C3DBC9", "#8FB89D", "#5A8B6A", "#335E42"],
  };

  return (
    <section className="flex items-center justify-center h-full my-12">
      <div className="container mx-auto">
        <div className="max-w-[80vw] xl:max-w-none mx-auto glass-card border border-foreground/15 p-8 rounded-3xl shadow-nature-lg flex flex-col items-center justify-center transition-all duration-300 hover:shadow-nature-xl">
          <div className="flex items-center gap-2 mb-6 text-foreground/75 font-display text-sm font-semibold">
            <GitCommit className="w-4 h-4 text-primary" />
            <span>Garden of Daily Contributions</span>
          </div>
          <div className="w-full overflow-x-auto flex justify-center py-2">
            <GitHubCalendar
              username="Alvarizqi09"
              colorScheme="light"
              theme={ghibliTheme}
              fontSize={13}
              blockSize={13}
              blockMargin={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
