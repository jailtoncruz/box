import { Container } from "@/components/container";
import { Button } from "@radix-ui/themes";
import { listRoot } from "@/core/usecase/list-root";
import { FiFolderPlus, FiHome, FiPlusCircle } from "react-icons/fi";
import { Exit } from "@/components/box/exit";
import { Upload } from "@/components/box/upload";
import { FileList } from "@/components/box/file-list";
import { FolderNavigationBar } from "@/components/box/folder-navigation-bar";
import { CreateFolder } from "@/components/box/create-folder";

interface BoxHomeProps {
	params: {
		id: string;
	};
}

export default async function BoxHome({ params }: BoxHomeProps) {
	const box = await listRoot(params.id);

	return (
		<Container className="flex-1 p-2 pr-4" shadowSize={4}>
			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-row gap-2">
					<FolderNavigationBar />
					<CreateFolder />
				</div>
				<div className="flex flex-row gap-2">
					<Upload box_id={params.id} />
					<Exit />
				</div>
			</div>
			<div className="flex flex-1 mt-2 flex-col">
				{box.folders.length === 1 && (
					<Button
						color="gray"
						variant="outline"
						className="flex flex-row gap-2 self-center my-auto"
					>
						<p className="text-base">New folder</p>
						<FiPlusCircle size={20} strokeWidth={2} />
					</Button>
				)}
				<FileList
					files={box.folders.map((folder) => {
						return {
							name: folder.name,
							type: "Folder",
						};
					})}
				/>
			</div>
		</Container>
	);
}
