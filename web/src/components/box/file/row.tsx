"use client";
import { BoxContext } from "@/app/box/context";
import { ItemDto } from "@/core/interface/item.dto";
import { ContextMenu, Table, Text } from "@radix-ui/themes";
import { useContext } from "react";
import { FiFile, FiFolder, FiMoreVertical } from "react-icons/fi";
import { DeleteItemDialog } from "./dialog/delete-item-dialog";
import { getArchive } from "@/core/usecase/get-archive";
import { PreviewDialog } from "./dialog/preview-dialog";
import { toast } from "react-toastify";

interface FileRowProps extends ItemDto {}

export function FileRow({ name, type, folder, archive }: FileRowProps) {
	const { setCurrentFolder, setPathFolders, pathFolders } =
		useContext(BoxContext);
	const item = { name, type, folder, archive };
	function handleFolderNavigation() {
		if (type === "Folder" && folder) {
			setCurrentFolder(folder);
			setPathFolders([...pathFolders, folder]);
		} else if (archive) {
			PreviewDialog.open(archive.id);
		}
	}

	async function handleDownloadItem() {
		if (archive) {
			const { url } = await getArchive(archive.box_id, archive.id);
			const a = document.createElement("a");
			a.download = archive.name;
			a.href = url;
			a.click();
		}
	}

	async function handleCopyLink() {
		if (archive) {
			const { url } = await getArchive(archive.box_id, archive.id);
			navigator.clipboard.writeText(url);
			toast(`Link copied`);
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
						<DeleteItemDialog item={item} />
						{item.archive && <PreviewDialog archive={item.archive} />}
					</Table.RowHeaderCell>
					<Table.RowHeaderCell>
						<FiMoreVertical className="cursor-pointer" />
					</Table.RowHeaderCell>
				</Table.Row>
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Item
					shortcut="⬇️"
					onClick={handleDownloadItem}
					disabled={type === "Folder"}
				>
					Download
				</ContextMenu.Item>
				{/* <ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
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

				<ContextMenu.Separator /> */}
				<ContextMenu.Item onClick={handleCopyLink} shortcut="🔗">
					Copy link
				</ContextMenu.Item>
				{/* <ContextMenu.Item>Add to favorites</ContextMenu.Item> */}
				<ContextMenu.Separator />
				<ContextMenu.Item
					shortcut="🗑️"
					color="red"
					onClick={DeleteItemDialog.open}
				>
					Delete
				</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>
	);
}
