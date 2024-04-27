"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { Container } from "../container";
import { FiFolderPlus } from "react-icons/fi";
import { useParams } from "next/navigation";
import { createFolder } from "@/core/usecase/create-folder";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { BoxContext } from "@/app/box/context";

interface CreateFolderProps {}

export function CreateFolder({}: CreateFolderProps) {
	const { id } = useParams<{ id: string }>();
	const { pathFolders, setPathFolders, currentFolder, setCurrentFolder } =
		useContext(BoxContext);
	const [name, setName] = useState("");
	async function handleSubmit() {
		try {
			const data = await createFolder(id, name, currentFolder?.id);
			setPathFolders([...pathFolders, data]);
			setCurrentFolder(data);
			toast(`Folder craeted.`);
		} catch (_err) {
			toast(`Error when trying to creating a new folder. Try again later.`);
		}
	}
	return (
		<Container className="bg-gray-600 p-2 flex-row gap-2" shadowSize={4}>
			<Dialog.Root>
				<Dialog.Trigger>
					<div className="flex items-center justify-center">
						<FiFolderPlus
							size={20}
							strokeWidth={2}
							className="cursor-pointer"
						/>
					</div>
				</Dialog.Trigger>
				<Dialog.Content maxWidth="450px">
					<Dialog.Title className="text-center">New folder</Dialog.Title>
					<Dialog.Description size="2" mb="4" className="text-center">
						Organize your folders and files with folders. 📂
					</Dialog.Description>

					<Flex direction="column" gap="3">
						<label>
							<Text as="div" size="2" mb="1" weight="bold">
								Name
							</Text>
							<TextField.Root
								placeholder="Enter the new folder's name"
								onChange={(event) => setName(event.target.value)}
							/>
						</label>
					</Flex>

					<Flex gap="3" mt="4" justify="end">
						<Dialog.Close>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</Dialog.Close>
						<Dialog.Close>
							<Button onClick={handleSubmit}>Enter</Button>
						</Dialog.Close>
					</Flex>
				</Dialog.Content>
			</Dialog.Root>
		</Container>
	);
}
