import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/use-auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	role: z.string(),
});

const passwordSchema = z
	.object({
		currentPassword: z.string().min(6, {
			message: "Password must be at least 6 characters.",
		}),
		newPassword: z.string().min(6, {
			message: "Password must be at least 6 characters.",
		}),
		confirmPassword: z.string().min(6, {
			message: "Password must be at least 6 characters.",
		}),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

const ProfileContainer = () => {
	const { user } = useAuthStore();
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

	// Profile form
	const profileForm = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
			role: user?.role || "Counselor",
		},
	});

	// Password form
	const passwordForm = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	// Handle avatar upload
	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// Handle profile update
	const onProfileSubmit = (values: z.infer<typeof profileSchema>) => {
		console.log(values);
		// Add your API call to update profile here
	};

	// Handle password update
	const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
		console.log(values);
		// Add your API call to update password here
	};

	return (
		<Card className="w-full h-[calc(100vh-4rem)] rounded-lg shadow-sm overflow-hidden">
			<CardContent className="p-0 h-full">
				{/* Header section */}

				<div className="max-w-7xl mx-auto px-6 py-8 h-[calc(100%-80px)] overflow-auto">
					{/* Profile header with avatar */}
					<Card className="mb-8">
						<CardContent className="p-6">
							<div className="flex flex-col md:flex-row items-center gap-6">
								<div className="relative">
									<div className="h-28 w-28 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden border-2 border-teal-200">
										{avatarUrl ? (
											<img
												src={avatarUrl}
												alt="Profile"
												className="h-full w-full object-cover"
											/>
										) : (
											<User className="h-14 w-14 text-teal-600" />
										)}
									</div>
									<label
										htmlFor="avatar-upload"
										className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center cursor-pointer hover:bg-teal-600 transition-colors"
									>
										<Camera className="h-4 w-4 text-white" />
										<input
											id="avatar-upload"
											type="file"
											accept="image/*"
											className="hidden"
											onChange={handleAvatarChange}
										/>
									</label>
								</div>

								<div>
									<h2 className="text-2xl font-bold">{user?.name}</h2>
									<p className="text-muted-foreground">{user?.email}</p>
									<div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
										{user?.role}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Profile settings tabs */}
					<Tabs defaultValue="personal-info" className="w-full">
						<TabsList className="mb-6 border-b w-full justify-start rounded-none bg-transparent p-0">
							<TabsTrigger
								value="personal-info"
								className="data-[state=active]:border-b-2 data-[state=active]:border-teal-500 data-[state=active]:text-teal-700 rounded-none pb-3 pt-1 px-4"
							>
								Personal Information
							</TabsTrigger>
							<TabsTrigger
								value="password"
								className="data-[state=active]:border-b-2 data-[state=active]:border-teal-500 data-[state=active]:text-teal-700 rounded-none pb-3 pt-1 px-4"
							>
								Password
							</TabsTrigger>
						</TabsList>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{/* Left sidebar - could add more content here */}
							<div className="lg:col-span-1 hidden lg:block">
								<Card>
									<CardContent className="p-6">
										<h3 className="text-lg font-semibold mb-4">
											Profile Settings
										</h3>
										<div className="space-y-2 text-sm">
											<p className="flex items-center p-2 rounded-md bg-teal-50 text-teal-700 font-medium">
												Personal Information
											</p>
											<p className="flex items-center p-2 cursor-pointer">
												Password
											</p>
											<p className="flex items-center p-2 cursor-pointer">
												Notifications
											</p>
											<p className="flex items-center p-2 cursor-pointer">
												Privacy
											</p>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Main content area */}
							<div className="lg:col-span-2">
								<TabsContent value="personal-info">
									<Card>
										<CardHeader>
											<CardTitle>Personal Information</CardTitle>
											<CardDescription>
												Update your personal details and contact information
											</CardDescription>
										</CardHeader>
										<CardContent>
											<Form {...profileForm}>
												<form
													onSubmit={profileForm.handleSubmit(onProfileSubmit)}
													className="space-y-6"
												>
													<FormField
														control={profileForm.control}
														name="name"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Full Name</FormLabel>
																<FormControl>
																	<Input
																		{...field}
																		className="focus-visible:ring-teal-500"
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>

													<FormField
														control={profileForm.control}
														name="email"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Email</FormLabel>
																<FormControl>
																	<Input
																		{...field}
																		type="email"
																		className="focus-visible:ring-teal-500"
																	/>
																</FormControl>
																<FormDescription>
																	This is the email you use to sign in.
																</FormDescription>
																<FormMessage />
															</FormItem>
														)}
													/>

													<FormField
														control={profileForm.control}
														name="role"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Role</FormLabel>
																<FormControl>
																	<Input
																		{...field}
																		disabled
																		className="bg-muted"
																	/>
																</FormControl>
																<FormDescription>
																	Your role cannot be changed.
																</FormDescription>
															</FormItem>
														)}
													/>

													<Button
														type="submit"
														className="bg-teal-500 hover:bg-teal-600 text-white"
													>
														Save Changes
													</Button>
												</form>
											</Form>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent value="password">
									<Card>
										<CardHeader>
											<CardTitle>Change Password</CardTitle>
											<CardDescription>
												Update your password to keep your account secure
											</CardDescription>
										</CardHeader>
										<CardContent>
											<Form {...passwordForm}>
												<form
													onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
													className="space-y-6"
												>
													<FormField
														control={passwordForm.control}
														name="currentPassword"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Current Password</FormLabel>
																<FormControl>
																	<Input
																		{...field}
																		type="password"
																		className="focus-visible:ring-teal-500"
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>

													<Separator className="my-6" />

													<FormField
														control={passwordForm.control}
														name="newPassword"
														render={({ field }) => (
															<FormItem>
																<FormLabel>New Password</FormLabel>
																<FormControl>
																	<Input
																		{...field}
																		type="password"
																		className="focus-visible:ring-teal-500"
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>

													<FormField
														control={passwordForm.control}
														name="confirmPassword"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Confirm New Password</FormLabel>
																<FormControl>
																	<Input
																		{...field}
																		type="password"
																		className="focus-visible:ring-teal-500"
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>

													<Button
														type="submit"
														className="bg-teal-500 hover:bg-teal-600 text-white"
													>
														Update Password
													</Button>
												</form>
											</Form>
										</CardContent>
									</Card>
								</TabsContent>
							</div>
						</div>
					</Tabs>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfileContainer;
