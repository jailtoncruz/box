"use client";
import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { upload } from "@/core/usecase/upload";
import { BoxContext } from "@/app/box/context";

interface DropzoneAreaProps {
	boxId: string;
}

export function DropzoneArea({ boxId }: DropzoneAreaProps) {
	const { currentFolder } = useContext(BoxContext);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const filename = acceptedFiles[0]?.name;
			if (currentFolder)
				upload(boxId, currentFolder.id, acceptedFiles[0])
					.then(() => {
						toast(`${filename} uploaded`);
					})
					.catch((err) => {
						console.error(err);
						toast(
							`Error when trying to uploading ${filename}. Try again later.`
						);
					});
		},
		[boxId, currentFolder]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			// "*": [],
		},
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
