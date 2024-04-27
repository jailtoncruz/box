import { ArchiveDto } from "./archive.dto";
import { FolderDto } from "./folder.dto";

export interface ItemDto {
	name: string;
	type: "Folder" | "File";
	folder?: FolderDto;
	archive?: ArchiveDto;
}
