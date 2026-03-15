"use client";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Stats = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="flex items-center justify-center h-full">
        <div className="container mx-auto">
          <div className="max-w-[80vw] xl:max-w-none mx-auto">
            <div className="flex items-center justify-center mt-10 xl:mt-0 min-h-[180px]">
              <div className="w-full h-[180px] bg-muted/50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center h-full">
      <div className="container mx-auto">
        <div className="max-w-[80vw] xl:max-w-none mx-auto bg-card border border-border p-8 rounded-2xl shadow-lg mt-10 xl:mt-0 min-h-[180px] flex items-center justify-center">
          <GitHubCalendar 
            username="Alvarizqi09" 
            colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
