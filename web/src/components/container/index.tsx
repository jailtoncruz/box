import { CSSProperties, ReactNode } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface ContainerProps {
	className?: ClassNameValue;
	children?: ReactNode;
	styles?: CSSProperties;
}

export function Container({ className, children, styles }: ContainerProps) {
	const defaultClasses = "flex flex-col bg-gray-800 rounded py-2 px-4";
	return (
		<div
			className={twMerge(defaultClasses, className)}
			style={Object.assign(
				{
					boxShadow: `8px 8px 0px #9B9B9B`,
				},
				styles
			)}
		>
			{children}
		</div>
	);
}
