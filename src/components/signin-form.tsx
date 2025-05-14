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
import { cn } from "@/lib/utils";

export function SigninForm({
	className,
	...props
}: React.ComponentProps<"div">) {
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
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									className="border-2"
								/>
							</div>
							<div className="grid gap-3">
								<div className="flex items-center justify-between">
									<Label htmlFor="password">Password</Label>
									<a
										href="#"
										className="text-sm text-primary hover:underline underline-offset-4"
									>
										Forgot password?
									</a>
								</div>
								<Input
									id="password"
									type="password"
									required
									className="border-2"
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									className="w-full text-md font-semibold h-11"
								>
									Sign In
								</Button>
							</div>
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
