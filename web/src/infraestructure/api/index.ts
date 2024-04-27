import axios, { AxiosInstance } from "axios";
import { getBoxKey } from "../cookies/get-box-key";
import Cookies from "js-cookie";

interface AxiosAuthenticatedInstance extends AxiosInstance {
	boxId?: string;
	setBoxId: (box_id: string) => AxiosAuthenticatedInstance;
	getDefaultApi: () => AxiosInstance;
}

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
}) as AxiosAuthenticatedInstance;

api.setBoxId = (box_id: string) => {
	api.interceptors.request.use((config) => {
		const token = Cookies.get(getBoxKey(box_id));
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	});
	api.boxId = box_id;
	return api;
};

api.getDefaultApi = () => axios;
