"use client";
import { Button, Dialog, Flex, Slot } from "@radix-ui/themes";
import { Container } from "../container";
import { FiUpload } from "react-icons/fi";
import { DropzoneArea } from "./dropzone-area";

interface UploadProps {
	box_id: string;
}

export function Upload({ box_id }: UploadProps) {
	return (
		<Container
			className="bg-gray-600 p-2 flex-row gap-2 cursor-pointer"
			shadowSize={4}
		>
			<Dialog.Root>
				<Dialog.Trigger>
					<div>
						<FiUpload size={20} strokeWidth={2} />
					</div>
				</Dialog.Trigger>
				<Dialog.Content maxWidth="450px">
					<Dialog.Title className="text-center">File upload ☁️</Dialog.Title>
					<Dialog.Description size="2" mb="4" className="text-center">
						You can upload anything.
					</Dialog.Description>

					<DropzoneArea boxId={box_id} />

					<Flex gap="3" mt="4" justify="end">
						<Dialog.Close>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</Dialog.Close>
					</Flex>
				</Dialog.Content>
			</Dialog.Root>
		</Container>
	);
}
