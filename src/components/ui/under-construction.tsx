import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction, HardHat } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UnderConstruction = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
			<div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-teal-100">
				<HardHat className="w-10 h-10 text-teal-600" />
			</div>

			<h1 className="text-4xl font-bold mb-2">Under Construction</h1>

			<p className="text-xl text-muted-foreground mb-6">
				We're working hard to build this page for you
			</p>

			<div className="flex items-center gap-4 mb-8">
				<Construction className="h-6 w-6 text-teal-500 animate-pulse" />
				<div className="h-2 w-40 bg-teal-200 rounded-full overflow-hidden">
					<div className="h-full bg-teal-500 w-2/3 rounded-full animate-pulse"></div>
				</div>
				<Construction className="h-6 w-6 text-teal-500 animate-pulse" />
			</div>

			<p className="max-w-md text-muted-foreground mb-8">
				This section of MindEase is currently being developed to bring you new
				features and improvements for your mental wellness journey.
			</p>

			<Button
				onClick={() => navigate("/")}
				className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white"
			>
				<ArrowLeft className="h-4 w-4" />
				Back to Home
			</Button>
		</div>
	);
};
