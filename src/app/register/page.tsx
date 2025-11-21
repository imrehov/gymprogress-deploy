'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string[]>([]);
	const [busy, setBusy] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setBusy(true);
		setError([]);


		try {
			const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ email, password }),
			});

			if (!r.ok) {
				let msg = ["Registration failed."];

				try {
					const body = await r.json();
					if (Array.isArray(body.errors)) msg = body.errors;
				}
				catch (_) { }
				setError(msg);
				setBusy(false);
				return;
			}
			router.push('/workout-calendar');
		} catch (err) {
			setError(["Unexpected error occurred."]);


		} finally {
			setBusy(false);
		}
	}

	function loginInstead() {
		router.push('/login');
	}

	return (
		<main className="p-8 max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Register</h1>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<input
					className="border rounded px-2 py-1 w-full"
					type="email"
					placeholder="you@example.com"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					className="border rounded px-2 py-1 w-full"
					type="password"
					placeholder="min 6 characters"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				{error.length > 0 && (
					<div className="space-y-1">
						{error.map((e, idx) => (
							<p key={idx} className="text-sm text-red-600">{e}</p>
						))}
					</div>
				)}
				<button
					type="submit"
					disabled={busy}
					className="bg-blue-600 text-white px-4 py-2 rounded"
				>
					{busy ? 'Registering…' : 'Register'}
				</button>
				<Button className="flex"
					variant={"secondary"}
					onClick={loginInstead}
				>
					Login instead
				</Button>
			</form>
		</main >
	);
}
