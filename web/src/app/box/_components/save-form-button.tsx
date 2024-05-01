"use client";

import { Button, Spinner } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

export function SaveFormButton({ children }: PropsWithChildren) {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending}>
			{pending ? <Spinner /> : children}
		</Button>
	);
}
