import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, Smile } from "lucide-react";
import { FC } from "react";
import type { Contact, Message } from "./messages-container";

export const MessageThread: FC<{
	contact: Contact;
	messages: Message[];
}> = ({ contact, messages }) => {
	return (
		<div className="flex-1 flex flex-col overflow-hidden">
			{/* Conversation header */}
			<div className="p-4 border-b flex items-center">
				<div className="flex items-center">
					<div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mr-3">
						{contact.initials}
					</div>
					<div>
						<p className="font-medium">{contact.name}</p>
						<p className="text-xs text-teal-600">
							{contact.role} •
							{contact.isOnline ? (
								<span className="text-emerald-500"> Online</span>
							) : (
								<span className="text-gray-500"> Offline</span>
							)}
						</p>
					</div>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${message.sender === "user" ? "justify-end" : ""}`}
					>
						<Card
							className={`p-3 rounded-lg max-w-xs ${
								message.sender === "user" ? "bg-teal-500 text-white" : ""
							}`}
						>
							<p>{message.content}</p>
						</Card>
					</div>
				))}
			</div>

			{/* Message input */}
			<CardFooter className="p-4 border-t">
				<div className="flex items-center w-full">
					<Button
						variant="ghost"
						size="icon"
						className="text-muted-foreground hover:text-teal-600"
					>
						<Paperclip className="h-5 w-5" />
					</Button>
					<Input
						placeholder="Type a message..."
						className="mx-2 focus-visible:ring-teal-500"
					/>
					<Button
						variant="ghost"
						size="icon"
						className="text-muted-foreground hover:text-teal-600"
					>
						<Smile className="h-5 w-5" />
					</Button>
					<Button
						size="icon"
						className="ml-2 bg-teal-500 hover:bg-teal-600 text-white"
					>
						<Send className="h-4 w-4" />
					</Button>
				</div>
			</CardFooter>
		</div>
	);
};
