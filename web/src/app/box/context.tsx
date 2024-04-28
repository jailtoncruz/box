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
	updatedAt: Date;
	setUpdatedAt: Dispatch<SetStateAction<Date>>;
}

export const BoxContext = createContext<BoxContextParams>({
	pathFolders: [],
	uploadingProcesses: [],
	setPathFolders: () => {},
	setCurrentFolder: () => {},
	setUploadingProcesses: () => {},
	updatedAt: new Date(),
	setUpdatedAt: () => {},
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
	const [updatedAt, setUpdatedAt] = useState<Date>(new Date());

	return (
		<BoxContext.Provider
			value={{
				currentFolder,
				setCurrentFolder,
				pathFolders,
				setPathFolders,
				uploadingProcesses,
				setUploadingProcesses,
				updatedAt,
				setUpdatedAt,
			}}
		>
			{children}
		</BoxContext.Provider>
	);
}
