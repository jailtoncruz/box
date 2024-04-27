import { api } from "@/infraestructure/api";
import { ArchiveDto } from "../interface/archive.dto";
import { FolderDto } from "../interface/folder.dto";

interface FolderContentDto {
	id: string;
	name: string;
	box_id: string;
	parent_folder_id?: string;
	archives: ArchiveDto[];
	child_folders: FolderDto[];
}

export async function getFolderContent(box_id: string, folder_id: string) {
	const { data } = await api
		.setBoxId(box_id)
		.get<FolderContentDto>(`/box/${box_id}/folder/${folder_id}`);
	return data;
}
