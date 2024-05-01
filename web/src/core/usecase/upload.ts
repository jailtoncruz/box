import { api } from "@/infraestructure/api";
import { ArchiveDto } from "../interface/archive.dto";
import { AxiosProgressEvent } from "axios";
import { deleteArchive } from "./delete-archive";

export async function upload(
	box_id: string,
	folder_id: string,
	file: File,
	onUploadProgress?: (event: AxiosProgressEvent) => void
) {
	const { data: archive } = await api
		.setBoxId(box_id)
		.post<ArchiveDto>(`/box/${box_id}/archive`, {
			name: file.name,
			folder_id,
			type: file.type,
		});

	try {
		await api.getDefaultApi().put<void>(archive.url, file, {
			onUploadProgress,
		});
	} catch (_err) {
		const err = _err as Error;
		await deleteArchive(box_id, archive.id);
		throw new Error(err.message);
	}

	return archive;
}
