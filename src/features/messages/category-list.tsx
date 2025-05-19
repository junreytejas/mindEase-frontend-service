import { Button } from "@/components/ui/button";
import type { FC } from "react";

export // CategoryList Component
const CategoryList: FC<{
	categories: string[];
	activeCategory: string;
	onSelectCategory: (category: string) => void;
}> = ({ categories, activeCategory, onSelectCategory }) => {
	return (
		<div className="p-4 space-y-2">
			{categories.map((category) => (
				<Button
					key={category}
					variant="ghost"
					className={`w-full justify-start font-medium hover:text-teal-600 ${
						activeCategory === category ? "bg-teal-50 text-teal-600" : ""
					}`}
					onClick={() => onSelectCategory(category)}
				>
					{category}
				</Button>
			))}
		</div>
	);
};
