import { api } from "@/infraestructure/api";
import { ArchiveDto } from "../interface/archive.dto";

export async function upload(box_id: string, folder_id: string, file: File) {
	const { data: archive } = await api
		.setBoxId(box_id)
		.post<ArchiveDto>(`/box/${box_id}/archive`, {
			name: file.name,
			folder_id,
		});

	await api.getDefaultApi().put<void>(archive.url, file, {
		onUploadProgress: (event) => console.log(event),
	});

	return archive;
}
