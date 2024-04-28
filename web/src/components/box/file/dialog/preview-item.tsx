import { Text } from "@radix-ui/themes";
import Image from "next/image";

interface PreviewItemProps {
	type?: string;
	url: string;
}

const PreviewUnavailable = () => (
	<Text align="center" className="m-auto">
		Preview unavailable
	</Text>
);

export function PreviewItem({ type, url }: PreviewItemProps) {
	if (!type) return <PreviewUnavailable />;

	switch (true) {
		case type.includes("application/pdf"):
			return (
				<iframe
					className="flex-1"
					src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
				></iframe>
			);

		case type.startsWith("image"):
			return (
				<Image
					alt="Image preview"
					src={url}
					width={1024}
					height={1024}
					className="object-contain h-full max-h-[70vh]"
				/>
			);

		case type.startsWith("video"):
			return (
				<video
					src={url}
					className="object-cover aspect-video max-h-[70vh] border-4 rounded border-white"
					autoPlay
					controls
				/>
			);

		default:
			return <PreviewUnavailable />;
	}
}
