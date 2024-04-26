import { api } from "@/infraestructure/api";
import { BoxWithAuth } from "../interface/box-auth";

export async function getBox(id: string, password?: string) {
	const { data } = await api.get<BoxWithAuth>(`/box/${id}`, {
		params: {
			password,
		},
	});
	return data;
}
