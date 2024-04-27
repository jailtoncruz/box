import { ArchiveDto } from "./archive.dto";
import { FolderDto } from "./folder.dto";

export interface FoldersAndArchives {
	folders: FolderDto[];
	archives: ArchiveDto[];
}
