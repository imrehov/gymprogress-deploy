import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Calendar from '@/components/Calendar';
import LogoutButton from '@/components/LogoutButton';

//auth check

export default async function WorkoutsPage() {
	const c = await cookies();
	const cookieHeader = c.toString();

	const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/me`, {
		cache: "no-store",
		headers: {
			cookie: cookieHeader, // forward browser cookies to API
		},
	});

	if (r.status === 401) {
		redirect("/login");
	}

	return (
		<main className="min-h-screen p-8">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Workout Calendar</h1>
				<LogoutButton />
			</div>

			<Calendar />
		</main>
	);
}
