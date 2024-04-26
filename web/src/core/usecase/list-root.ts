import { api } from "@/infraestructure/api";
import { BoxFolders } from "../interface/box-folders";
import { cookies } from "next/headers";
import { getBoxKey } from "@/infraestructure/cookies/get-box-key";

export async function listRoot(id: string) {
	const token = cookies().get(getBoxKey(id));
	const { data } = await api.get<BoxFolders>(`/box/${id}/folder`, {
		headers: {
			Authorization: `Bearer ${token?.value}`,
		},
	});
	return data;
}
