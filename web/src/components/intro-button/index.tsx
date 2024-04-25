"use client";
import { Slot } from "@radix-ui/themes";
import { ReactNode } from "react";

interface IntroButtonProps {
	description: string;
	logo: ReactNode;
}

export function IntroButton({ description, logo }: IntroButtonProps) {
	return (
		<Slot>
			<div
				className="bg-gray-800 rounded px-8 py-4 flex flex-col gap-4 text-white border-dashed border-gray-400 border-4 aspect-square items-center"
				style={{
					boxShadow: `8px 8px 0px 0px #DADADA`,
					cursor: "pointer",
				}}
			>
				{logo}
				<h1 className="text-center font-bold text-2xl">{description}</h1>
			</div>
		</Slot>
	);
}
