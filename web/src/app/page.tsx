import Image from "next/image";
import logo from "../../public/logo/Box-Icon_4x.png";
import logIn from "../../public/icons/log-in.svg";

import { IntroButton } from "@/components/intro-button";
import { Button, Dialog, Flex, Slot, Text, TextField } from "@radix-ui/themes";
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col gap-8 text-white p-8 max-w-[1000px]">
			<div className=" flex flex-row gap-4 mt-4 items-center justify-center">
				<Image src={logo} alt="Logo" className="h-20 w-auto " />
				<div className="flex flex-col">
					<h1 className="text-6xl font-medium text-center">Box</h1>
					<p className="text-base text-center leading-3">of everything</p>
				</div>
			</div>
			<div className="text-white flex flex-col gap-4">
				<h2 className="text-center text-xl">
					Box of Everything is your secure, private hub for storing and sharing
					files effortlessly.
				</h2>
				<h2 className="text-center text-xl">
					Create new boxes for different projects or access existing ones with
					ease. Your data, your control, all in one place.
				</h2>
			</div>
			<div className="flex flex-row justify-between gap-8">
				<Dialog.Root>
					<Dialog.Trigger>
						{/* <Button>Edit profile</Button> */}
						{/* <IntroButton
							logo={<Image src={logo} alt="" className="h-44 w-auto" />}
							description="New Box"
						/> */}
						{/* <Slot> */}
						<div
							className="bg-gray-800 rounded px-8 py-4 flex flex-col gap-4 text-white border-dashed border-gray-400 border-4 aspect-square items-center"
							style={{
								boxShadow: `8px 8px 0px 0px #DADADA`,
								cursor: "pointer",
							}}
						>
							<Image src={logo} alt="" className="h-44 w-auto" />
							<h1 className="text-center font-bold text-2xl">New Box</h1>
						</div>
						{/* </Slot> */}
					</Dialog.Trigger>
					<Dialog.Content maxWidth="450px">
						<Dialog.Title>Edit profile</Dialog.Title>
						<Dialog.Description size="2" mb="4">
							Make changes to your profile.
						</Dialog.Description>

						<Flex direction="column" gap="3">
							<label>
								<Text as="div" size="2" mb="1" weight="bold">
									Name
								</Text>
								<TextField.Root
									defaultValue="Freja Johnsen"
									placeholder="Enter your full name"
								/>
							</label>
							<label>
								<Text as="div" size="2" mb="1" weight="bold">
									Email
								</Text>
								<TextField.Root
									defaultValue="freja@example.com"
									placeholder="Enter your email"
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
								<Button>Save</Button>
							</Dialog.Close>
						</Flex>
					</Dialog.Content>
				</Dialog.Root>
				<IntroButton
					logo={<Image src={logIn} alt="" className="h-44 w-auto" />}
					description="Enter"
				/>
			</div>
		</main>
	);
}
