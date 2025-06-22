import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
	href: string;
}

export function BackButton({ href }: BackButtonProps) {
	return (
		<Link
			href={href}
			className="flex items-center gap-2 text-xl text-white p-8 hover:text-white/80 transition"
		>
			<ArrowLeft size={20} />
			Back
		</Link>
	);
}
