"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { Container } from "../container";
import { FiFolderPlus } from "react-icons/fi";
import { useParams } from "next/navigation";

interface CreateFolderProps {}

export function CreateFolder({}: CreateFolderProps) {
	const { id } = useParams<{ id: string }>();
	function handleInputChange() {}
	function handleSubmit() {}
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
								onChange={handleInputChange}
								name="id"
								// value={boxDto.id}
								className="flex-1"
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
