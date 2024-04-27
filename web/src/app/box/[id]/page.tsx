import { BoxContentList } from "./content";

interface BoxHomeProps {
	params: {
		id: string;
	};
}

export default async function BoxHome({}: BoxHomeProps) {
	return <BoxContentList />;
}
