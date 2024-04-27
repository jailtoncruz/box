import { CSSProperties, ReactNode } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface ContainerProps {
	className?: ClassNameValue;
	children?: ReactNode;
	styles?: CSSProperties;
	shadowSize?: number;
	shadownColor?: string;
	onClick?: () => void;
}

export function Container({
	className,
	children,
	styles,
	shadowSize,
	shadownColor,
	onClick,
}: ContainerProps) {
	const defaultClasses = "flex flex-col bg-gray-800 rounded py-2 px-4";
	let shadownStyle = `${shadowSize ?? 8}px ${shadowSize ?? 8}px 0px `;
	shadownStyle = shadownStyle.concat(shadownColor ?? `#DADADA`);
	return (
		<div
			onClick={onClick}
			className={twMerge(defaultClasses, className)}
			style={Object.assign(
				{
					boxShadow: shadownStyle,
				},
				styles
			)}
		>
			{children}
		</div>
	);
}
