import Image from "next/image";
import logo from "../../../public/logo/Box-Icon_4x.png";

export function Logo() {
	return (
		<div className="flex flex-row gap-1 md:gap-4 items-center justify-center ">
			<Image src={logo} alt="Logo" className="h-12 w-auto md:h-20" />
			<div className="flex flex-col">
				<h1 className="text-4xl md:text-6xl font-medium text-center">Box</h1>
				<p className="text-xs md:text-base text-center leading-3">
					of everything
				</p>
			</div>
		</div>
	);
}
