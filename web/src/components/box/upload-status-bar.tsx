import { UploadingProcess } from "@/core/interface/uploading-process";
import { Flex, Progress, Text } from "@radix-ui/themes";

interface UploadStatusBarProps {
	job: UploadingProcess;
}

export function UploadStatusBar({ job }: UploadStatusBarProps) {
	const progress = Math.floor(job.progress * 100);
	return (
		<Flex direction={"row"} gap={"2"} align={"center"}>
			<Text size={"1"}>{job.name}</Text>
			<Progress value={progress} />
			<Text size={"1"}>{progress}%</Text>
		</Flex>
	);
}
