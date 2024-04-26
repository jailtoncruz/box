import { Container } from "@/components/container";
import { Button, ContextMenu, Table } from "@radix-ui/themes";
import { listRoot } from "@/core/usecase/list-root";
import {
	FiFileText,
	FiFolder,
	FiFolderPlus,
	FiLogOut,
	FiMoreVertical,
	FiPlusCircle,
} from "react-icons/fi";

interface BoxHomeProps {
	params: {
		id: string;
	};
}

export default async function BoxHome({ params }: BoxHomeProps) {
	const folders = await listRoot(params.id);

	return (
		<Container className="flex-1 p-2">
			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-row gap-2">
					<Container
						className="bg-gray-600 p-2 flex-row gap-2"
						styles={{
							boxShadow: `4px 4px 0px #9B9B9B`,
						}}
					>
						<p className="text-sm">/ Folder / Sub-folder</p>
					</Container>
					<Container
						className="bg-gray-600 p-2 flex-row gap-2"
						styles={{
							boxShadow: `4px 4px 0px #9B9B9B`,
						}}
					>
						<FiFolderPlus size={20} strokeWidth={2} />
					</Container>
				</div>
				<div className="flex flex-row gap-2">
					<Container
						className="bg-gray-600 p-2 flex-row gap-2"
						styles={{
							boxShadow: `4px 4px 0px #9B9B9B`,
						}}
					>
						<FiLogOut size={20} strokeWidth={2} />
					</Container>
				</div>
			</div>
			<div className="flex flex-1 mt-2 flex-col">
				{folders.folders.length === 1 && (
					<Button
						color="gray"
						variant="outline"
						className="flex flex-row gap-2 self-center my-auto"
					>
						<p className="text-base">New folder</p>
						<FiPlusCircle size={20} strokeWidth={2} />
					</Button>
				)}
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell
								align="right"
								width={"16px"}
							></Table.ColumnHeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						<ContextMenu.Root>
							<ContextMenu.Trigger>
								<Table.Row>
									<Table.RowHeaderCell className="flex flex-row gap-2 items-center">
										<FiFolder />
										Folder A
									</Table.RowHeaderCell>
									<Table.RowHeaderCell>
										<FiMoreVertical className="cursor-pointer" />
									</Table.RowHeaderCell>
								</Table.Row>
							</ContextMenu.Trigger>
							<ContextMenu.Content>
								<ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
								<ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
								<ContextMenu.Separator />
								<ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>

								<ContextMenu.Sub>
									<ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
									<ContextMenu.SubContent>
										<ContextMenu.Item>Move to project…</ContextMenu.Item>
										<ContextMenu.Item>Move to folder…</ContextMenu.Item>
										<ContextMenu.Separator />
										<ContextMenu.Item>Advanced options…</ContextMenu.Item>
									</ContextMenu.SubContent>
								</ContextMenu.Sub>

								<ContextMenu.Separator />
								<ContextMenu.Item>Share</ContextMenu.Item>
								<ContextMenu.Item>Add to favorites</ContextMenu.Item>
								<ContextMenu.Separator />
								<ContextMenu.Item shortcut="⌘ ⌫" color="red">
									Delete
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>
						<Table.Row>
							<Table.RowHeaderCell className="flex flex-row gap-2 items-center">
								<FiFolder />
								Folder 01
							</Table.RowHeaderCell>
							<Table.RowHeaderCell>
								<FiMoreVertical className="cursor-pointer" />
							</Table.RowHeaderCell>
						</Table.Row>

						<Table.Row>
							<Table.RowHeaderCell className="flex flex-row gap-2 items-center">
								<FiFileText />
								Zahra Ambessa
							</Table.RowHeaderCell>
							<Table.RowHeaderCell>
								<FiMoreVertical />
							</Table.RowHeaderCell>
						</Table.Row>

						<Table.Row>
							<Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
							<Table.RowHeaderCell>
								<FiMoreVertical />
							</Table.RowHeaderCell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</div>
		</Container>
	);
}
