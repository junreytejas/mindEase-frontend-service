import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<LoaderCircle className="animate-spin h-16 w-16" />
		</div>
	);
};

export default LoadingSpinner;
