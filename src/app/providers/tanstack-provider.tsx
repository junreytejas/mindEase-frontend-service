import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode, useState } from "react";

interface TanstackProviderProps {
	children: ReactNode;
}

const TanstackProvider = ({ children }: TanstackProviderProps) => {
	// Create a client for each instance of your app
	// This ensures data is not shared between users and requests
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Global defaults
						staleTime: 60 * 1000, // 1 minute
						gcTime: 5 * 60 * 1000, // 5 minutes
						retry: 1,
						refetchOnWindowFocus: import.meta.env.PROD, // Only in production
						refetchOnReconnect: true,
					},
					mutations: {
						retry: 1,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{/* Only show DevTools in development */}
			{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
};

export default TanstackProvider;
