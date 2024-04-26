import { Box } from "./box";
import { FolderDto } from "./folder.dto";

export interface BoxFolders extends Box {
	folders: FolderDto[];
}
