import MindEaseLogo from "@/assets/mind-ease-logo.png";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { firebaseAuth } from "@/lib/firebase-config";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/use-auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const signinSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export function SigninForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [authError, setAuthError] = useState<string>("");

	const { setAuth } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SigninFormData>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: SigninFormData) => {
		try {
			setAuthError("");
			const userCredential: any = await signInWithEmailAndPassword(
				firebaseAuth,
				data.email,
				data.password
			);
			const user = userCredential.user;

			setAuth(user.accessToken, user);

			// Signed in successfully

			// You can redirect or perform other actions here
			// For example: navigate("/dashboard");
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;

			// Handle specific Firebase auth errors
			switch (errorCode) {
				case "auth/user-not-found":
					setAuthError("No account found with this email address.");
					break;
				case "auth/wrong-password":
					setAuthError("Incorrect password. Please try again.");
					break;
				case "auth/invalid-email":
					setAuthError("Invalid email address format.");
					break;
				case "auth/user-disabled":
					setAuthError("This account has been disabled.");
					break;
				case "auth/too-many-requests":
					setAuthError("Too many failed attempts. Please try again later.");
					break;
				default:
					setAuthError("Sign in failed. Please try again.");
			}

			console.error("Sign in error:", errorCode, errorMessage);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			{/* Logo and Brand Section */}
			<div className="flex flex-col items-center mb-4 text-center">
				<div className="mb-2 h-20 w-20 overflow-hidden">
					<img
						src={MindEaseLogo}
						alt="MindEase Logo"
						className="h-full w-full object-contain rounded-full"
					/>
				</div>
				<h1 className="text-3xl font-bold tracking-tight text-primary">
					MindEase
				</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Mental health support made simple
				</p>
			</div>

			<Card className="border-2 shadow-lg">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Welcome back</CardTitle>
					<CardDescription>
						Sign in to access your personalized mental health journey.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-6"
					>
						{authError && (
							<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
								{authError}
							</div>
						)}

						<div className="grid gap-3">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								className={cn("border-2", errors.email ? "border-red-500" : "")}
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-sm text-red-600">{errors.email.message}</p>
							)}
						</div>

						<div className="grid gap-3">
							<Input
								id="password"
								type="password"
								className={cn(
									"border-2",
									errors.password ? "border-red-500" : ""
								)}
								{...register("password")}
							/>
							{errors.password && (
								<p className="text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>

						<div className="flex flex-col gap-3">
							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full text-md font-semibold h-11"
							>
								{isSubmitting ? "Signing In..." : "Sign In"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			<div className="text-center text-xs text-muted-foreground">
				<p>© {new Date().getFullYear()} MindEase. All rights reserved.</p>
				<p className="mt-1">
					Helping you find peace of mind, one step at a time.
				</p>
			</div>
		</div>
	);
}
