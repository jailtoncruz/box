"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import logo from "../../../../public/logo/Box-Icon_4x.png";
import { createBox } from "@/core/usecase/create-box";
import { toast } from "react-toastify";
import { setBoxToken } from "@/infraestructure/cookies/set-box-token";
import { SaveFormButton } from "./save-form-button";
import { useRouter } from "next/navigation";

export function NewBox() {
	const router = useRouter();

	async function handleSubmit(form: FormData) {
		const name = form.get("name");
		const password = form.get("password");
		if (!name) return;

		try {
			const { box, access_token } = await createBox({
				name: name.toString(),
				password: password?.toString(),
			});
			setBoxToken(box.id, access_token.token, access_token.expireAt);
			router.push(`/box/${box.id}`);
			toast("Welcome!");
		} catch (_err) {
			toast("This box could not be created 😥. Try again in a few minutes.");
		}
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<div
					className="bg-gray-800 rounded px-8 py-4 flex flex-col gap-2 md:gap-4 text-white border-dashed border-gray-400 border-4 items-center justify-center flex-1"
					style={{
						boxShadow: `8px 8px 0px #DADADA`,
						cursor: "pointer",
					}}
				>
					<Image
						src={logo}
						alt=""
						className="h-16 md:h-32 w-auto aspect-auto"
					/>
					<h1 className="text-center font-bold text-2xl">New Box</h1>
				</div>
			</Dialog.Trigger>
			<Dialog.Content maxWidth="450px">
				<Dialog.Title className="text-center">New Box 📦</Dialog.Title>
				<Dialog.Description size="2" mb="4" className="text-center">
					Choose a new name for your new Box.
				</Dialog.Description>

				<form action={handleSubmit}>
					<Flex direction="column" gap="3" className="mb-4">
						<label>
							<Text as="div" size="2" mb="1" weight="bold">
								Name
							</Text>
							<TextField.Root placeholder="Box's name" name="name" />
						</label>
						<label>
							<Text as="div" size="2" mb="1" weight="bold">
								Password
							</Text>
							<TextField.Root placeholder="Is Optional" name="password" />
						</label>
					</Flex>

					<div className="flex flex-row gap-2 justify-end ">
						<Dialog.Close>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</Dialog.Close>
						<SaveFormButton>Save</SaveFormButton>
					</div>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	);
}
