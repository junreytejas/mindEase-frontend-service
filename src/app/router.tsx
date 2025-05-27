import { UnderConstruction } from "@/components/ui/under-construction";
import { Home, Messages, Notification, Profile } from "@/page";
import { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LoadingSpinner from "../components/ui/loading-spinner";
import SignIn from "../features/auth/components/signin-in/sign-in";
import AuthLayout from "./auth-layout";
import MainLayout from "./main-layout";
import { AuthRoute, ProtectedRoute } from "./providers/protected-routes";

// Wrap lazy-loaded components with Suspense
interface WithSuspenseProps {
	Component: React.ComponentType<any>;
}

const withSuspense = ({ Component }: WithSuspenseProps) => (
	<Suspense fallback={<LoadingSpinner />}>
		<Component />
	</Suspense>
);

// Router configuration
export const router = createBrowserRouter(
	[
		{
			path: "/auth",
			element: <AuthRoute />,
			children: [
				{
					element: withSuspense({ Component: AuthLayout }),
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
			],
		},
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					element: withSuspense({ Component: MainLayout }),
					children: [
						{
							index: true,
							element: <Home />,
						},
						{
							path: "messages",
							element: withSuspense({ Component: Messages }),
						},
						{
							path: "notifications",
							element: withSuspense({ Component: Notification }),
						},
						{
							path: "profile",
							element: withSuspense({ Component: Profile }),
						},
						{
							path: "*",
							element: <UnderConstruction />,
						},
					],
				},
			],
		},
	],
	{
		basename: "/mindEase-frontend-service",
	}
);
