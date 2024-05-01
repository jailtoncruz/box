"use client";
import { FolderDto } from "@/core/interface/folder.dto";
import { UploadingProcess } from "@/core/interface/uploading-process";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";

interface BoxContextParams {
	currentFolder?: FolderDto;
	setCurrentFolder: Dispatch<SetStateAction<FolderDto | undefined>>;
	pathFolders: FolderDto[];
	setPathFolders: (folder: FolderDto[]) => void;
	uploadingProcesses: UploadingProcess[];
	setUploadingProcesses: (processes: UploadingProcess[]) => void;
}

export const BoxContext = createContext<BoxContextParams>({
	pathFolders: [],
	uploadingProcesses: [],
	setPathFolders: () => {},
	setCurrentFolder: () => {},
	setUploadingProcesses: () => {},
});

interface BoxContextProviderProps {
	children: ReactNode;
}

export function BoxContextProvider({ children }: BoxContextProviderProps) {
	const [currentFolder, setCurrentFolder] = useState<FolderDto>();
	const [pathFolders, setPathFolders] = useState<FolderDto[]>([]);
	const [uploadingProcesses, setUploadingProcesses] = useState<
		UploadingProcess[]
	>([]);

	return (
		<BoxContext.Provider
			value={{
				currentFolder,
				setCurrentFolder,
				pathFolders,
				setPathFolders,
				uploadingProcesses,
				setUploadingProcesses,
			}}
		>
			{children}
		</BoxContext.Provider>
	);
}
