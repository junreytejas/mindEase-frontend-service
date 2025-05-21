import { Card, CardContent } from "@/components/ui/card";
import { CategoryList } from "../messages/category-list";
import NotificationList from "./notifcation-list";

const NoticationContainer = () => {
	const categories = ["BSIT", "BSHM", "BSCRIM", "BSED", "Faculty/Staff"];

	return (
		<Card className="w-full h-[calc(100vh-4rem)] rounded-lg shadow-sm overflow-hidden">
			{/* Main content */}
			<CardContent className="grid grid-cols-12 h-[calc(100%-4rem)] overflow-hidden p-0">
				{/* Left sidebar - 4 columns */}
				<div className="col-span-2 border-r flex flex-col overflow-auto">
					<CategoryList
						categories={categories}
						activeCategory={"BSIT"}
						onSelectCategory={(category) =>
							console.log(`Selected category: ${category}`)
						}
					/>
				</div>

				{/* Main content area - 8 columns */}
				<div className="col-span-8 flex flex-col overflow-auto">
					<NotificationList />
				</div>
			</CardContent>
		</Card>
	);
};

export default NoticationContainer;
