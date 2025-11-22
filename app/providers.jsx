"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10, // 10 seconds - data is fresh for 10 seconds
      gcTime: 1000 * 30, // 30 seconds (formerly cacheTime) - keep in cache for 30 seconds
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
