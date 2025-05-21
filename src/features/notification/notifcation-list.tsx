import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define notification type
type Notification = {
	id: string;
	initials: string;
	title: string;
	message: string;
	timestamp: string;
};

const NotificationList = () => {
	// Array of notification data
	const notifications: Notification[] = [
		{
			id: "1",
			initials: "SJ",
			title: "Appointment Reminder",
			message:
				"Your session with Dr. Sarah Johnson is scheduled for tomorrow at 2:00 PM.",
			timestamp: "Today, 10:30 AM",
		},
		{
			id: "2",
			initials: "ME",
			title: "Course Assignment",
			message: "New mindfulness exercise has been assigned to your course.",
			timestamp: "Yesterday",
		},
		{
			id: "3",
			initials: "SG",
			title: "Support Group",
			message: "The next group session will be held on Friday at 5:00 PM.",
			timestamp: "2 days ago",
		},
		{
			id: "4",
			initials: "JD",
			title: "Journal Reminder",
			message: "Don't forget to complete your daily reflection journal.",
			timestamp: "2 days ago",
		},
		{
			id: "5",
			initials: "AC",
			title: "Assessment Completed",
			message: "Your monthly mental wellness assessment has been reviewed.",
			timestamp: "3 days ago",
		},
		{
			id: "6",
			initials: "WC",
			title: "Wellness Challenge",
			message:
				"You've been invited to participate in the 7-day mindfulness challenge.",
			timestamp: "4 days ago",
		},
		{
			id: "7",
			initials: "RP",
			title: "Resource Published",
			message: "New resource on stress management techniques is now available.",
			timestamp: "5 days ago",
		},
		{
			id: "8",
			initials: "EW",
			title: "Workshop Invitation",
			message:
				"Virtual wellness workshop scheduled for next Tuesday at 3:00 PM.",
			timestamp: "1 week ago",
		},
		{
			id: "9",
			initials: "MC",
			title: "Meditation Completion",
			message: "You've completed 5 consecutive days of meditation practice!",
			timestamp: "1 week ago",
		},
		{
			id: "10",
			initials: "FD",
			title: "Feedback Request",
			message: "Please provide feedback on your recent counseling session.",
			timestamp: "2 weeks ago",
		},
	];

	return (
		<div className="h-full">
			<div className="p-6 h-full flex flex-col">
				<h2 className="text-2xl font-semibold mb-4">Notifications</h2>

				<ScrollArea className="max-h-[50rem] pr-4">
					<div className="flex flex-col gap-2">
						{notifications.map((notification) => (
							<Card
								key={notification.id}
								className="overflow-hidden hover:border-teal-300"
							>
								<div className="flex items-start space-x-3 p-3 cursor-pointer">
									<div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
										<span className="text-teal-800 font-medium">
											{notification.initials}
										</span>
									</div>
									<div className="flex-1">
										<div className="flex justify-between">
											<p className="font-medium">{notification.title}</p>
											<span className="text-xs text-muted-foreground">
												{notification.timestamp}
											</span>
										</div>
										<p className="text-sm text-muted-foreground">
											{notification.message}
										</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default NotificationList;
