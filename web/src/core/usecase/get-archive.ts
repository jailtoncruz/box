import { api } from "@/infraestructure/api";
import { ArchiveDto } from "../interface/archive.dto";

export async function getArchive(box_id: string, id: string) {
	const { data } = await api
		.setBoxId(box_id)
		.get<ArchiveDto>(`/box/${box_id}/archive/${id}`);
	return data;
}
