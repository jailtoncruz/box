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
	const { currentFolderId } = useContext(BoxContext);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			upload(boxId, currentFolderId, acceptedFiles[0])
				.then(() => {
					toast("Uploaded!");
				})
				.catch((err) => {
					console.error(err);
					toast(
						"Ocorreu um problema ao anexar este arquivo, tente novamente em alguns minutos."
					);
				});
		},
		[boxId, currentFolderId]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"*": [],
		},
	});

	return (
		<div
			{...getRootProps()}
			className="bg-gray-600 rounded border-dashed  text-white border-gray-200 flex items-center justify-center h-24 gap-4 border-2 
				cursor-pointer  hover:border-green-500 transition-colors"
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
