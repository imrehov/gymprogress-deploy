"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/api";


export default function LogoutButton() {
	const router = useRouter();

	return (
		<button
			className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
			onClick={async () => {
				try {
					await logout();
					router.push("/login");
					router.refresh(); // ensures server auth state updates
				} catch (e) {
					console.error(e);
				}
			}}
		>
			Logout
		</button>
	);
}
