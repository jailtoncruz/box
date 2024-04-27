"use client";
import { Container } from "../container";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

export function Exit() {
	const router = useRouter();

	return (
		<Container
			className="bg-gray-600 p-2 flex-row gap-2 cursor-pointer"
			shadowSize={4}
			onClick={() => router.push("/")}
		>
			<FiLogOut size={20} strokeWidth={2} />
		</Container>
	);
}
