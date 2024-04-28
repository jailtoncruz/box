"use client";
import { ArchiveDto } from "@/core/interface/archive.dto";
import { getArchive } from "@/core/usecase/get-archive";
import { Button, Dialog, Flex, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import { PreviewItem } from "./preview-item";

let PREVIEW_DIALOG_KEY = "PREVIEW-DIALOG-KEY-TO-REPLACE";

export function PreviewDialog({
	archive: { box_id, id, type },
}: {
	archive: ArchiveDto;
}) {
	const [url, setUrl] = useState("");
	PREVIEW_DIALOG_KEY = id;

	async function onOpenDialog() {
		const archive = await getArchive(box_id, id);
		setUrl(archive.url);
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<div hidden={true} id={PREVIEW_DIALOG_KEY} onClick={onOpenDialog} />
			</Dialog.Trigger>

			<Dialog.Content className="flex flex-col justify-between" maxWidth="80vw">
				<Dialog.Title align="center">Preview</Dialog.Title>

				<div className="flex flex-col items-center justify-center">
					{url === "" ? (
						<Spinner className="m-auto" />
					) : (
						<PreviewItem type={type} url={url} />
					)}
				</div>

				<Flex gap="3" mt="4" justify="center">
					<Dialog.Close>
						<Button className="cursor-pointer" variant="outline" color="gold">
							Fechar
						</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
}

PreviewDialog.open = (id: string) => document.getElementById(id)?.click();
