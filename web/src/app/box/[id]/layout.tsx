import { CopyBoxId } from "@/components/box/copy-id";
import { Logo } from "@/components/logo";
import { getBoxKey } from "@/infraestructure/cookies/get-box-key";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BoxContextProvider } from "../context";
import { Copyright } from "@/components/copyright";

export interface BoxHomeProps {
	params: {
		id: string;
	};
	children: React.ReactNode;
}

export default function BoxHomeLayout({ params, children }: BoxHomeProps) {
	const token = cookies().get(getBoxKey(params.id));
	if (!token) return redirect("/");
	const data = jwtDecode<{ sub: string; name: string }>(token.value);

	return (
		<div className="flex flex-col gap-4 text-white p-8 max-w-[1000px] mx-auto flex-1">
			<div className="flex flex-row justify-between items-center">
				<Logo />
				<div>
					<h1 className="font-bold text-right text-base md:text-xl">
						{data.name}
					</h1>
					<div className="flex flex-row gap-2 justify-end items-center">
						<p className="font-medium text-sm md:text-base">{data.sub}</p>
						<CopyBoxId id={data.sub} />
					</div>
				</div>
			</div>
			<BoxContextProvider>{children}</BoxContextProvider>
			<Copyright />
		</div>
	);
}
