"use client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

// Create a client
const queryClient = new QueryClient()

export const ClientProvider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)