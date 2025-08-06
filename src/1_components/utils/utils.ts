// Returns a human-readable time difference (e.g., '2 hours ago')
export const humanTime = (ts: number): string => {
	// If ts is in seconds, convert to ms
	if (ts < 1e12) ts = ts * 1000;
	const now = Date.now();
	const diff = Math.floor((now - ts) / 1000); // in seconds
	if (diff < 60) return `${diff}s ago`;
	if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
	if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
	const d = new Date(ts);
	return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
};
