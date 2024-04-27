"use client";
import { FolderDto } from "@/core/interface/folder.dto";
import { ReactNode, createContext, useState } from "react";

interface BoxContextParams {
	currentFolder?: FolderDto;
	setCurrentFolder: (folder: FolderDto) => void;
	pathFolders: FolderDto[];
	setPathFolders: (folder: FolderDto[]) => void;
}

export const BoxContext = createContext<BoxContextParams>({
	pathFolders: [],
	setPathFolders: () => {},
	setCurrentFolder: () => {},
});

interface BoxContextProviderProps {
	children: ReactNode;
}

export function BoxContextProvider({ children }: BoxContextProviderProps) {
	const [currentFolder, setCurrentFolder] = useState<FolderDto>();
	const [pathFolders, setPathFolders] = useState<FolderDto[]>([
		{
			box_id: "",
			id: "1",
			name: "Imagens",
		},
		{
			box_id: "",
			id: "2",
			name: "Travel",
		},
	]);

	return (
		<BoxContext.Provider
			value={{
				currentFolder,
				setCurrentFolder,
				pathFolders,
				setPathFolders,
			}}
		>
			{children}
		</BoxContext.Provider>
	);
}
