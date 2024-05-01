"use client";
import Image from "next/image";
import logIn from "../../../../public/icons/log-in.svg";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { getBox } from "@/core/usecase/get-box";
import { toast } from "react-toastify";
import { setBoxToken } from "@/infraestructure/cookies/set-box-token";
import { FiClipboard } from "react-icons/fi";
import { SaveFormButton } from "./save-form-button";

export function EnterBox() {
	const router = useRouter();

	async function handleSubmit(form: FormData) {
		const id = form.get("id")?.toString();
		const password = form.get("password")?.toString();
		if (!id) return;
		try {
			const { box, access_token } = await getBox(id, password);
			setBoxToken(box.id, access_token.token, access_token.expireAt);
			router.push(`/box/${box.id}`);
			toast("Welcome!");
		} catch (_err) {
			toast("Box not found.");
		}
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
					<Image src={logIn} alt="" className="h-44 w-auto" />
					<h1 className="text-center font-bold text-2xl">Enter</h1>
				</div>
			</Dialog.Trigger>
			<Dialog.Content maxWidth="450px">
				<Dialog.Title className="text-center">Box access 📦</Dialog.Title>
				<Dialog.Description size="2" mb="4" className="text-center">
					Access an existing Box.
				</Dialog.Description>

				<form action={handleSubmit}>
					<Flex direction="column" gap="3" className="mb-4">
						<label>
							<Text as="div" size="2" mb="1" weight="bold">
								ID
							</Text>
							<div className="flex flex-row gap-2">
								<TextField.Root
									placeholder="Enter the box identifier"
									name="id"
									className="flex-1"
									id="box_id"
								/>
								<Button
									variant="outline"
									title="Paste"
									style={{ cursor: "pointer" }}
									onClick={() =>
										navigator.clipboard.readText().then((text) => {
											const el = document.getElementById(
												"box_id"
											) as HTMLInputElement;
											el.value = text;
										})
									}
								>
									<FiClipboard />
								</Button>
							</div>
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
								Exit
							</Button>
						</Dialog.Close>
						<SaveFormButton>Enter</SaveFormButton>
					</div>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	);
}
