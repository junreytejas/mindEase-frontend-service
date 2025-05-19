import { Card } from "@/components/ui/card";
import { FC } from "react";
import type { Contact } from "./messages-container";

export const ContactList: FC<{
	contacts: Contact[];
	activeContactId: string;
	onSelectContact: (contactId: string) => void;
}> = ({ contacts, activeContactId, onSelectContact }) => {
	return (
		<div className="p-4 flex flex-col gap-2">
			{contacts.map((contact) => (
				<Card
					key={contact.id}
					className={`overflow-hidden  ${
						activeContactId === contact.id ? "border-teal-300 border" : ""
					}  hover:border-teal-300`}
					onClick={() => onSelectContact(contact.id)}
				>
					<div className={`flex items-center space-x-3 p-3 cursor-pointer`}>
						<div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center">
							{contact.initials}
						</div>
						<div className="flex-1">
							<div className="flex justify-between">
								<p className="font-medium">{contact.name}</p>
								<span className="text-xs text-muted-foreground">
									{contact.timestamp}
								</span>
							</div>
							<p className="text-sm text-muted-foreground truncate">
								{contact.lastMessage}
							</p>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
};
