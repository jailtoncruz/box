import { api } from "@/infraestructure/api";
import { BoxDto } from "../interface/box.dto";
import { BoxWithAuth } from "../interface/box-auth";

export async function createBox(box: BoxDto) {
	const { data } = await api.post<BoxWithAuth>("/box", box);
	return data;
}
