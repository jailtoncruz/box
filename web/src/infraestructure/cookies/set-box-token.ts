"use client";
import Cookies from "js-cookie";
import { getBoxKey } from "./get-box-key";

export function setBoxToken(id: string, token: string, expireAt?: number) {
	Cookies.set(getBoxKey(id), token, {
		expires: expireAt,
		path: `/box/${id}`,
	});
}
