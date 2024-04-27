import { api } from "@/infraestructure/api";
import { FolderDto } from "../interface/folder.dto";

export async function createFolder(
	box_id: string,
	name: string,
	current_folder_id?: string
) {
	const { data } = await api
		.setBoxId(box_id)
		.post<FolderDto>(`/box/${box_id}/folder`, {
			name,
			parent_folder_id: current_folder_id,
		});
	return data;
}
