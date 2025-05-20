// Import other providers as needed

import type { ReactNode } from "react";
import TanstackProvider from "./tanstack-provider";
import { ThemeProvider } from "./theme-provider";

interface AppProvidersProps {
	children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
	return (
		<TanstackProvider>
			<ThemeProvider>
				{/* Add other providers here */}
				{children}
			</ThemeProvider>
		</TanstackProvider>
	);
}

export default AppProviders;
