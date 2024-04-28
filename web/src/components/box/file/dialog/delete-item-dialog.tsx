import { BoxContext } from "@/app/box/context";
import { ItemDto } from "@/core/interface/item.dto";
import { deleteArchive } from "@/core/usecase/delete-archive";
import { deleteFolder } from "@/core/usecase/delete-folder";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { useContext } from "react";

const DELETE_ITEM_DIALOG_KEY = "delete-item-dialog";

export function DeleteItemDialog({ item }: { item: ItemDto }) {
	const { id: box_id } = useParams<{ id: string }>();
	const { setUpdatedAt } = useContext(BoxContext);
	async function onConfirmDelete() {
		if (item.type === "File" && item.archive)
			await deleteArchive(box_id, item.archive.id);
		if (item.type === "Folder" && item.folder)
			await deleteFolder(box_id, item.folder.id);

		setUpdatedAt(new Date());
	}
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<div id={DELETE_ITEM_DIALOG_KEY}> </div>
			</AlertDialog.Trigger>
			<AlertDialog.Content maxWidth="450px">
				<AlertDialog.Title>
					Delete {item.type === "Folder" ? "folder" : "archive"}
				</AlertDialog.Title>
				<AlertDialog.Description size="2">
					Are you sure? This action cannot be reverted.
				</AlertDialog.Description>

				<Flex gap="3" mt="4" justify="end">
					<AlertDialog.Cancel>
						<Button variant="soft" color="gray">
							Cancel
						</Button>
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<Button variant="solid" color="red" onClick={onConfirmDelete}>
							Confirm
						</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
}

DeleteItemDialog.open = () =>
	document.getElementById(DELETE_ITEM_DIALOG_KEY)?.click();
