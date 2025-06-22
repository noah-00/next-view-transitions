import { Bell, Search, User } from "lucide-react";
import Link from "next/link";

export function Header() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black/80 to-transparent">
			<nav className="flex items-center gap-8">
				<Link href="/" className="text-2xl font-bold text-white">
					ANIFLIX
				</Link>
				<div className="flex items-center gap-6 text-sm text-white/80">
					<Link href="/" className="font-semibold">
						HOME
					</Link>
					<Link href="/" className="font-semibold">
						ANIME
					</Link>
					<Link href="/" className="font-semibold">
						MOVIES
					</Link>
					<Link href="/" className="font-semibold">
						MANGA
					</Link>
					<Link href="/" className="font-semibold">
						MY LIST
					</Link>
				</div>
			</nav>
			<div className="flex items-center gap-6">
				<button type="button" className="text-white cursor-pointer">
					<Search size={24} />
				</button>
				<button type="button" className="text-white relative cursor-pointer">
					<span className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
						2
					</span>
					<Bell size={24} />
				</button>
				<button type="button" className="text-white cursor-pointer">
					<User size={24} />
				</button>
			</div>
		</header>
	);
}
