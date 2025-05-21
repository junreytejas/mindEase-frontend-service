import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
}

interface AuthState {
	token: string | null;
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;

	// Actions
	setAuth: (token: string, user: User) => void;
	logout: () => void;
	setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			isLoading: false,

			setAuth: (token, user) =>
				set({
					token,
					user,
					isAuthenticated: true,
				}),

			logout: () =>
				set({
					token: null,
					user: null,
					isAuthenticated: false,
				}),

			setLoading: (isLoading) => set({ isLoading }),
		}),
		{
			name: "auth-storage",
			// Only persist these fields to localStorage
			partialize: (state) => ({
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);
