import { api } from "@/infraestructure/api";

export async function deleteArchive(box_id: string, archive_id: string) {
	await api
		.setBoxId(box_id)
		.delete<void>(`/box/${box_id}/archive/${archive_id}`);
}
