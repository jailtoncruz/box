import { api } from "@/infraestructure/api";
import { BoxFolders } from "../interface/box-folders";

export async function listRoot(id: string) {
	const { data } = await api.setBoxId(id).get<BoxFolders>(`/box/${id}/folder`);
	return data;
}
