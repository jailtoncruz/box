"use client";
import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { upload } from "@/core/usecase/upload";
import { BoxContext } from "@/app/box/context";
import { AxiosProgressEvent } from "axios";
import { debounce } from "@/core/usecase/debounce";

interface DropzoneAreaProps {
	boxId: string;
}

export function DropzoneArea({ boxId }: DropzoneAreaProps) {
	const {
		currentFolder,
		uploadingProcesses,
		setUploadingProcesses,
		setUpdatedAt,
	} = useContext(BoxContext);

	const delayedFunction = debounce(() => setUpdatedAt(new Date()), 250); // 250ms

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			for (const file of acceptedFiles) {
				const filename = file.name;
				if (currentFolder)
					upload(boxId, currentFolder.id, file, (event: AxiosProgressEvent) => {
						const job = uploadingProcesses.find((j) => j.name === filename);
						if (!job && event.progress !== 1)
							setUploadingProcesses([
								...uploadingProcesses,
								{ name: filename, progress: event.progress ?? 0 },
							]);
						else setUploadingProcesses(uploadingProcesses);

						if (job) {
							const list = uploadingProcesses.filter(
								(d) => d.name !== job.name
							);
							if (event.progress !== 1)
								list.push({ name: filename, progress: event.progress ?? 0 });
							setUploadingProcesses(list);
						}
					})
						.then(() => {
							delayedFunction();
							toast(`${filename} uploaded`);
						})
						.catch((err) => {
							console.error(err);
							toast(
								`Error when trying to uploading ${filename}. Try again later.`
							);
						});
			}
		},
		[
			boxId,
			currentFolder,
			uploadingProcesses,
			setUploadingProcesses,
			delayedFunction,
		]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {},
	});

	return (
		<div
			{...getRootProps()}
			className="bg-gray-600 rounded border-dashed  text-white border-gray-200 flex items-center justify-center h-24 gap-4 border-2 
				cursor-pointer  hover:border-yellow-500 transition-colors"
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop your file here.</p>
			) : (
				<p>Click or drag your file here. 🫳🏻</p>
			)}
		</div>
	);
}
