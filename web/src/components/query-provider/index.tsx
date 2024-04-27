"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface BoxQueryProviderProps {
	children: ReactNode;
}

export function BoxQueryProvider({ children }: BoxQueryProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
