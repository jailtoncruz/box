import { Box } from "./box";

export interface BoxWithAuth {
	box: Box;
	access_token: {
		token: string;
		expireAt: number;
	};
}
