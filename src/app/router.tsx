import { Suspense } from "react";
import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import LoadingSpinner from "../components/ui/loading-spinner";
import SignIn from "../features/auth/components/signin-in/sign-in";
import AuthLayout from "./auth-layout";
import MainLayout from "./main-layout";

const authService = {
	isAuthenticated: () => {
		// Replace with actual authentication logic
		return true; // Change this to true if authenticated
	},
};
// Wrap lazy-loaded components with Suspense
interface WithSuspenseProps {
	Component: React.ComponentType<any>;
}

const withSuspense = ({ Component }: WithSuspenseProps) => (
	<Suspense fallback={<LoadingSpinner />}>
		<Component />
	</Suspense>
);

// Auth guard loader for protected routes
const protectedLoader = () => {
	if (!authService.isAuthenticated()) {
		return redirect("/auth/signin");
	}
	return null;
};

// Auth redirect loader (redirect if already authenticated)
const authRedirectLoader = () => {
	if (authService.isAuthenticated()) {
		return redirect("/");
	}
	return null;
};

// Router configuration
export const router = createBrowserRouter([
	{
		path: "/auth",
		element: withSuspense({ Component: AuthLayout }),
		loader: authRedirectLoader, // Redirect if already logged in
		children: [
			{
				path: "signin",
				element: withSuspense({ Component: SignIn }),
			},
			{
				index: true,
				element: <Navigate to="/auth/signin" replace />,
			},
		],
	},
	{
		path: "/",
		element: withSuspense({ Component: MainLayout }),
		loader: protectedLoader, // Protect all routes under main layout
		children: [
			{
				index: true,
				element: <h1>Test</h1>,
			},
			// Add more protected routes here
			{
				path: "*",
				element: <p>Not found</p>,
				// element: <Navigate to="/auth/signin" replace />,
			},
		],
	},
]);
