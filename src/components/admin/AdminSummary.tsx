"use client";

import React from "react";

type Summary = {
	ok: boolean;
	message: string;
	data?: {
		reports?: number;
		uploadsEnabled?: boolean;
		[key: string]: unknown;
	};
};

export default function AdminSummary() {
		const [data, setData] = React.useState<Summary | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		const run = async () => {
			try {
				setLoading(true);
				const res = await fetch("/api/admin/summary", { cache: "no-store" });
				const json = await res.json();
				setData(json);
			} catch (e) {
				setError(e instanceof Error ? e.message : "Failed to load summary");
			} finally {
				setLoading(false);
			}
		};
		run();
	}, []);

	if (loading) return <div className="p-4 text-gray-600">Loading…</div>;
	if (error) return <div className="p-4 text-red-600">{error}</div>;

	return (
		<div className="p-4 bg-white rounded-lg shadow border border-gray-200">
			<h3 className="text-lg font-semibold mb-2">Admin Summary</h3>
			<pre className="text-xs text-gray-700 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}

