"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 25, // 25 seconds - data is fresh for 25 seconds
      gcTime: 1000 * 60 * 2, // 2 minutes (formerly cacheTime) - keep in cache for 2 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    },
  },
});

export function QueryProvider({ children }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
