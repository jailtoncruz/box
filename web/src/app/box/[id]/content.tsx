"use client";
import { CreateFolder } from "@/components/box/create-folder";
import { Exit } from "@/components/box/exit";
import { FileList } from "@/components/box/file/list";
import { FolderNavigationBar } from "@/components/box/folder-navigation-bar";
import { Upload } from "@/components/box/upload";
import { Container } from "@/components/container";
import { ScrollArea, Spinner, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { BoxContext } from "../context";
import { getFoldersAndArchives } from "@/core/usecase/get-folders-and-archives";
import { useParams } from "next/navigation";
import { UploadStatusBar } from "@/components/box/upload-status-bar";

export function BoxContentList() {
	const { id: box_id } = useParams<{ id: string }>();
	const { currentFolder, uploadingProcesses } = useContext(BoxContext);

	const { isLoading, data } = useQuery({
		queryKey: ["folder-archives", box_id, currentFolder?.id],
		queryFn: () => getFoldersAndArchives(box_id, currentFolder?.id),
	});

	if (isLoading || !data) return <Spinner className="m-auto" />;

	return (
		<Container className="flex-1 p-2 pr-4" shadowSize={4}>
			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-row gap-2">
					<FolderNavigationBar />
					<CreateFolder />
				</div>
				<div className="flex flex-row gap-2">
					{currentFolder && <Upload box_id={box_id} />}
					<Exit />
				</div>
			</div>
			<div className="flex flex-1 mt-2 flex-col ">
				{data.length === 0 ? (
					<Text className="text-center my-auto text-xs md:text-base">
						Nothing here ...
					</Text>
				) : (
					<ScrollArea
						type="auto"
						scrollbars="vertical"
						style={{ height: "70vh" }}
						className="my-auto"
					>
						<FileList files={data} />
					</ScrollArea>
				)}
			</div>
			{uploadingProcesses.map((uploading, index) => (
				<UploadStatusBar job={uploading} key={index} />
			))}
		</Container>
	);
}
