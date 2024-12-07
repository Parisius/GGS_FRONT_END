"use client";
import {
  QueryClient,
  QueryClientProvider as TSQueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function QueryClientProvider({ children }) {
  return (
    <TSQueryClientProvider client={queryClient}>
      {children}
    </TSQueryClientProvider>
  );
}
