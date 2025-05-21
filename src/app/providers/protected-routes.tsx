import LoadingSpinner from "@/components/ui/loading-spinner";
import { useAuthStore } from "@/store/use-auth-store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// Protected Route component that responds to auth state changes
export const ProtectedRoute = () => {
	const { isAuthenticated } = useAuthStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/auth/signin", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return isAuthenticated ? <Outlet /> : <LoadingSpinner />;
};

// Auth Route component that redirects authenticated users
export const AuthRoute = () => {
	const { isAuthenticated } = useAuthStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return !isAuthenticated ? <Outlet /> : <LoadingSpinner />;
};
