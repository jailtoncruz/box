"use client";

import { FiHome } from "react-icons/fi";
import { Container } from "../container";
import { useContext } from "react";
import { BoxContext } from "@/app/box/context";
import { FolderDto } from "@/core/interface/folder.dto";

export function FolderNavigationBar() {
	const { pathFolders } = useContext(BoxContext);

	function handleFolderNavigate(folder: FolderDto) {}

	return (
		<Container
			shadowSize={4}
			className="bg-gray-600 p-2  flex-row gap-2 items-center"
		>
			<FiHome />
			{pathFolders.map((folder) => {
				return (
					<div key={folder.id} className="flex gap-2 flex-row items-center">
						|{" "}
						<p
							className="cursor-pointer text-sm hover:font-medium transition-all"
							onClick={() => handleFolderNavigate(folder)}
						>
							{folder.name}
						</p>
					</div>
				);
			})}
		</Container>
	);
}
