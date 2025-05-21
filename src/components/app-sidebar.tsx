import {
	Bell,
	Calendar,
	ClipboardList,
	Command,
	FileText,
	Home,
	MessageSquare,
	Settings2,
	TrendingUp,
	User,
} from "lucide-react";
import * as React from "react";
import { useLocation } from "react-router-dom";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// Navigation data (moved inside component to access location)
const getNavItems = () => [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Messages",
		url: "/messages",
		icon: MessageSquare,
	},
	{
		title: "Notifications",
		url: "/notifications",
		icon: Bell,
	},
	{
		title: "Profile",
		url: "/profile",
		icon: User,
	},
	{
		title: "Scheduling",
		url: "/scheduling",
		icon: Calendar,
	},
	{
		title: "Assignments",
		url: "/assignments",
		icon: ClipboardList,
	},
	{
		title: "Progress",
		url: "/progress",
		icon: TrendingUp,
	},
	{
		title: "Assessment",
		url: "/assessment",
		icon: FileText,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: Settings2,
	},
];

// User and team data
const userData = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "MindEase",
			logo: Command,
			plan: "Counselling",
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	// Get current location from React Router
	const location = useLocation();
	const currentPath = location.pathname;

	// Generate nav items and mark the active one based on current path
	const navItems = getNavItems().map((item) => ({
		...item,
		isActive:
			item.url === "/" ? currentPath === "/" : currentPath.startsWith(item.url),
	}));

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={userData.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
