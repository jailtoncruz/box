"use client";
import { Container } from "../container";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { api } from "@/infraestructure/api";

export function Exit() {
	const router = useRouter();

	function onLogout() {
		api.clearInterceptors();
		router.push("/");
	}

	return (
		<Container
			className="bg-gray-600 p-2 flex-row gap-2 cursor-pointer"
			shadowSize={4}
			onClick={onLogout}
		>
			<FiLogOut size={20} strokeWidth={2} />
		</Container>
	);
}
