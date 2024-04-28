import { api } from "@/infraestructure/api";

export async function deleteFolder(box_id: string, folder_id: string) {
	await api.setBoxId(box_id).delete<void>(`/box/${box_id}/folder/${folder_id}`);
}
