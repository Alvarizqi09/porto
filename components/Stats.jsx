"use client";
import GitHubCalendar from "react-github-calendar";
import { useEffect, useState } from "react";

const Stats = () => {
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
        <div className="max-w-[80vw] xl:max-w-none mx-auto bg-card border-4 border-foreground p-8 rounded-md shadow-neobrutal-card mt-10 xl:mt-0 min-h-[180px] flex items-center justify-center transition-all duration-150">
          <GitHubCalendar 
            username="Alvarizqi09" 
            colorScheme="light"
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
