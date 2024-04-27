"use client";
import { BoxContext } from "@/app/box/context";
import { ItemDto } from "@/core/interface/item.dto";
import { ContextMenu, Table, Text } from "@radix-ui/themes";
import { useContext } from "react";
import { FiFile, FiFolder, FiMoreVertical } from "react-icons/fi";

interface FileListProps {
	files: ItemDto[];
}

export function FileList({ files }: FileListProps) {
	return (
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell
						align="right"
						width={"16px"}
					></Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{files.map((file, index) => {
					return <FileRow {...file} key={index} />;
				})}
			</Table.Body>
		</Table.Root>
	);
}

interface FileRowProps extends ItemDto {}

function FileRow({ name, type, folder, archive }: FileRowProps) {
	const { setCurrentFolder, setPathFolders, pathFolders } =
		useContext(BoxContext);
	function handleFolderNavigation() {
		if (type === "Folder" && folder) {
			setCurrentFolder(folder);
			setPathFolders([...pathFolders, folder]);
		} else {
			console.log({ name, type, archive });
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
				<ContextMenu.Item shortcut="⌘ ⌫" color="red">
					Delete
				</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>
	);
}
