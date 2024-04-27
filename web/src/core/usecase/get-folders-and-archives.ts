import { ItemDto } from "../interface/item.dto";
import { getFolderContent } from "./get-folder-content";
import { listRoot } from "./list-root";

export async function getFoldersAndArchives(
	box_id: string,
	current_folder_id?: string
): Promise<ItemDto[]> {
	const items: ItemDto[] = [];
	if (current_folder_id) {
		const { child_folders, archives } = await getFolderContent(
			box_id,
			current_folder_id
		);
		items.push(
			...child_folders.map<ItemDto>((folder) => {
				return {
					name: folder.name,
					type: "Folder",
					folder,
				};
			})
		);
		items.push(
			...archives.map<ItemDto>((archive) => {
				return {
					name: archive.name,
					type: "File",
					archive,
				};
			})
		);
	} else {
		const { folders } = await listRoot(box_id);
		items.push(
			...folders.map<ItemDto>((folder) => {
				return {
					name: folder.name,
					type: "Folder",
					folder,
				};
			})
		);
	}
	return items;
}
