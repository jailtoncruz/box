"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import logo from "../../../public/logo/Box-Icon_4x.png";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { BoxDto } from "@/core/interface/box.dto";
import { createBox } from "@/core/usecase/create-box";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setBoxToken } from "@/infraestructure/cookies/set-box-token";

export function NewBox() {
	const [boxDto, setBoxDto] = useState<BoxDto>({ name: "", password: "" });
	const router = useRouter();

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		setBoxDto({ ...boxDto, [event.target.name]: event.target.value });
	}

	async function handleSubmit(
		event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) {
		event.preventDefault();
		try {
			const { box, access_token } = await createBox(boxDto);
			setBoxToken(box.id, access_token.token, access_token.expireAt);
			router.push(`/box/${box.id}`);
			toast("Welcome!");
		} catch (_err) {
			toast("This box could not be created 😥. Try again in a few minutes.");
		}
	}

	function onEnter(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") handleSubmit(event as any);
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<div
					className="bg-gray-800 rounded px-8 py-4 flex flex-col gap-4 text-white border-dashed border-gray-400 border-4 aspect-square items-center"
					style={{
						boxShadow: `8px 8px 0px #DADADA`,
						cursor: "pointer",
					}}
				>
					<Image src={logo} alt="" className="h-44 w-auto" />
					<h1 className="text-center font-bold text-2xl">New Box</h1>
				</div>
			</Dialog.Trigger>
			<Dialog.Content maxWidth="450px">
				<Dialog.Title className="text-center">New Box 📦</Dialog.Title>
				<Dialog.Description size="2" mb="4" className="text-center">
					Choose a new name for your new Box.
				</Dialog.Description>

				<Flex direction="column" gap="3">
					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							Name
						</Text>
						<TextField.Root
							placeholder="Box's name"
							onChange={handleInputChange}
							name="name"
							value={boxDto.name}
							onKeyDown={onEnter}
						/>
					</label>
					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							Password
						</Text>
						<TextField.Root
							placeholder="Is Optional"
							onChange={handleInputChange}
							name="password"
							value={boxDto.password}
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
						<Button onClick={handleSubmit}>Save</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
}
