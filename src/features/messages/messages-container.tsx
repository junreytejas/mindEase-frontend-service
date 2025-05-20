import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { CategoryList } from "./category-list";
import { ContactList } from "./contact-list";
import { MessageThread } from "./message-thread";

export type Message = {
	id: string;
	content: string;
	sender: "user" | "counselor";
	timestamp: string;
};

export type Contact = {
	id: string;
	name: string;
	initials: string;
	role: string;
	lastMessage: string;
	timestamp: string;
	isOnline?: boolean;
};

// Contact List Component

// Message Thread Component

export default function MessagesContainer() {
	// Sample categories
	const categories = ["BSIT", "BSHM", "BSCRIM", "BSED", "Faculty/Staff"];

	// Sample contacts data
	const contacts: Contact[] = [
		{
			id: "contact1",
			name: "Dr. Sarah Johnson",
			initials: "SJ",
			role: "BSIT",
			lastMessage: "Let's discuss your progress in our next session...",
			timestamp: "10:30 AM",
			isOnline: true,
		},
		{
			id: "contact2",
			name: "Dr. John Davis",
			initials: "JD",
			role: "Therapist",
			lastMessage: "Your meditation plan is ready for review",
			timestamp: "Yesterday",
			isOnline: false,
		},
		{
			id: "contact3",
			name: "Emma Wilson",
			initials: "EW",
			role: "Support Group Leader",
			lastMessage: "The next group session is scheduled for Thursday",
			timestamp: "Monday",
			isOnline: true,
		},
	];

	// Sample message data
	const messages: Message[] = [
		{
			id: "1",
			content:
				"Hello Dr. Johnson, I've been practicing the mindfulness exercises you recommended.",
			sender: "user",
			timestamp: "10:25 AM",
		},
		{
			id: "2",
			content:
				"That's great to hear! How have you been feeling since our last session?",
			sender: "counselor",
			timestamp: "10:27 AM",
		},
		{
			id: "3",
			content:
				"Much better. The anxiety has decreased, but I still have some questions about the techniques.",
			sender: "user",
			timestamp: "10:28 AM",
		},
		{
			id: "4",
			content:
				"Let's discuss your progress in our next session. Would you like to schedule one for this week?",
			sender: "counselor",
			timestamp: "10:30 AM",
		},
	];

	// For this example we'll use the first contact as active
	const activeContactId = "contact1";
	const activeCategory = "BSIT";
	const activeContact = contacts.find(
		(contact) => contact.id === activeContactId
	)!;

	return (
		<Card className="w-full h-[calc(100vh-4rem)] rounded-lg shadow-sm overflow-hidden">
			{/* Main content */}
			<CardContent className="flex h-[calc(100%-4rem)] overflow-hidden p-0">
				{/* Left sidebar */}
				<div className="w-64 border-r flex flex-col overflow-auto">
					<CategoryList
						categories={categories}
						activeCategory={activeCategory}
						onSelectCategory={(category) =>
							console.log(`Selected category: ${category}`)
						}
					/>
				</div>

				{/* Middle section - conversation list */}
				<div className="w-1/3 border-r flex flex-col overflow-auto">
					<div className="p-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search messages..."
								className="pl-10 bg-background focus-visible:ring-teal-500"
							/>
						</div>
					</div>
					<Separator />
					<ContactList
						contacts={contacts}
						activeContactId={activeContactId}
						onSelectContact={(id) => console.log(`Selected contact: ${id}`)}
					/>
				</div>

				{/* Right section - message content */}
				<MessageThread contact={activeContact} messages={messages} />
			</CardContent>
		</Card>
	);
}
