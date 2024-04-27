"use client";
import { Button } from "@radix-ui/themes";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";

interface CopyBoxIdParams {
	id: string;
}

export function CopyBoxId({ id }: CopyBoxIdParams) {
	function handleClick() {
		navigator.clipboard.writeText(id);
		toast(`📦 ID copied to your clipboard`);
	}
	return (
		<Button
			variant="ghost"
			title="Copy"
			style={{ cursor: "pointer" }}
			onClick={handleClick}
		>
			<FiCopy color="#CCC" strokeWidth={4} />
		</Button>
	);
}
