import { NewBox } from "@/app/box/_components/new-box";
import { Copyright } from "@/components/copyright";
import { EnterBox } from "@/app/box/_components/enter-box";
import { Logo } from "@/components/logo";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col gap-8 text-white p-8 max-w-[1000px] justify-between mx-auto">
			<Logo />
			<div className="text-white flex flex-col gap-4">
				<h2 className="text-center text-base md:text-xl">
					Box of Everything is your secure, private hub for storing and sharing
					files effortlessly.
				</h2>
				<h2 className="text-center text-base md:text-xl">
					Create new boxes for different projects or access existing ones with
					ease. Your data, your control, all in one place.
				</h2>
			</div>
			<div className="flex flex-row gap-8">
				<NewBox />
				<EnterBox />
			</div>
			<Copyright />
		</main>
	);
}
