// "use client";
import { ItemDto } from "@/core/interface/item.dto";
import { Table } from "@radix-ui/themes";
import { FileRow } from "./row";

interface FileListProps {
	files: ItemDto[];
}

export function FileList({ files }: FileListProps) {
	return (
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
				{files.map((file, index) => {
					return <FileRow {...file} key={index} />;
				})}
			</Table.Body>
		</Table.Root>
	);
}
