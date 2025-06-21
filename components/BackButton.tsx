"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.back()}
			className="flex items-center gap-2 px-4 py-2 bg-black/20 text-white rounded-lg hover:bg-black/40 transition-colors cursor-pointer hover:scale-105"
		>
			<ArrowLeft size={20} />
			Back
		</button>
	);
}
