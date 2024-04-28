import { api } from "@/infraestructure/api";
import { BoxWithAuth } from "../interface/box-auth";

export async function getBox(id: string, password?: string) {
	const params: { password?: string } = {};
	if (password) params.password = password;
	const { data } = await api.get<BoxWithAuth>(`/box/${id}`, {
		params,
	});
	return data;
}
