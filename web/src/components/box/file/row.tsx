"use client";
import { BoxContext } from "@/app/box/context";
import { ItemDto } from "@/core/interface/item.dto";
import { deleteArchive } from "@/core/usecase/delete-archive";
import { deleteFolder } from "@/core/usecase/delete-folder";
import {
	AlertDialog,
	Button,
	ContextMenu,
	Flex,
	Table,
	Text,
} from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { FiFile, FiFolder, FiMoreVertical } from "react-icons/fi";

interface FileRowProps extends ItemDto {}

export function FileRow({ name, type, folder, archive }: FileRowProps) {
	const { setCurrentFolder, setPathFolders, pathFolders } =
		useContext(BoxContext);
	function handleFolderNavigation() {
		if (type === "Folder" && folder) {
			setCurrentFolder(folder);
			setPathFolders([...pathFolders, folder]);
		} else {
			console.log("Preview", { name, type, archive });
		}
	}
	return (
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<Table.Row>
					<Table.RowHeaderCell className="flex flex-row gap-2 items-center">
						{type === "Folder" ? <FiFolder /> : <FiFile />}
						<Text
							className="cursor-pointer hover:underline"
							onClick={handleFolderNavigation}
						>
							{name}
						</Text>
						<DeleteItemDialog item={{ name, type, folder, archive }} />
					</Table.RowHeaderCell>
					<Table.RowHeaderCell>
						<FiMoreVertical className="cursor-pointer" />
					</Table.RowHeaderCell>
				</Table.Row>
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
				<ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>

				<ContextMenu.Sub>
					<ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
					<ContextMenu.SubContent>
						<ContextMenu.Item>Move to project…</ContextMenu.Item>
						<ContextMenu.Item>Move to folder…</ContextMenu.Item>
						<ContextMenu.Separator />
						<ContextMenu.Item>Advanced options…</ContextMenu.Item>
					</ContextMenu.SubContent>
				</ContextMenu.Sub>

				<ContextMenu.Separator />
				<ContextMenu.Item>Share</ContextMenu.Item>
				<ContextMenu.Item>Add to favorites</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item
					shortcut="⌘ ⌫"
					color="red"
					onClick={() => document.getElementById("delete-item")?.click()}
				>
					Delete
				</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>
	);
}

function DeleteItemDialog({ item }: { item: ItemDto }) {
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
				<div id="delete-item"> </div>
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
