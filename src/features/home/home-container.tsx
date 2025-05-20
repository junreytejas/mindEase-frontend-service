import MindEaseLogo from "@/assets/mind-ease-logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomeContainer() {
	return (
		<div className="flex-1 p-6 md:p-8 lg:p-10 ">
			<Card className="border-none shadow-sm">
				<CardContent className="p-6 md:p-8">
					<div className="max-w-3xl mx-auto space-y-8 text-center">
						<div className="space-y-2">
							<div className="flex items-center justify-center gap-2">
								<h1 className="text-3xl font-semibold text-teal-600">
									Welcome to MindEase
								</h1>
							</div>

							<div className="relative w-48 h-48 mx-auto my-8">
								<img
									src={MindEaseLogo}
									alt="MindEase Logo"
									className="h-full w-full object-contain rounded-full"
								/>
							</div>

							<p className="text-lg mb-6">
								<span className="text-teal-600">✦</span> Start your journey to a
								healthier mind with MindEase.
							</p>

							<p className=" mb-8 max-w-xl mx-auto">
								Our professional counselors are here to support you through
								life's challenges. Take the first step toward mental wellness
								today.
							</p>

							<Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all hover:scale-105">
								Schedule a Counseling Session
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
