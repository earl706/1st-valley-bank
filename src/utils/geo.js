export const toRadians = (value) => (value * Math.PI) / 180;

export function haversineDistanceKm(lat1, lon1, lat2, lon2) {
	const R = 6371; // km
	const dLat = toRadians(lat2 - lat1);
	const dLon = toRadians(lon2 - lon1);

	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

export function findNearestLocation(origin, candidates = []) {
	if (!origin || !Number.isFinite(origin.latitude) || !Number.isFinite(origin.longitude)) {
		return null;
	}

	let nearest = null;
	let bestDistance = Number.POSITIVE_INFINITY;

	candidates.forEach((candidate) => {
		if (
			candidate.latitude === undefined ||
			candidate.longitude === undefined ||
			candidate.latitude === null ||
			candidate.longitude === null
		) {
			return;
		}
		const distance = haversineDistanceKm(
			origin.latitude,
			origin.longitude,
			Number(candidate.latitude),
			Number(candidate.longitude)
		);
		if (distance < bestDistance) {
			bestDistance = distance;
			nearest = { ...candidate, distanceKm: distance };
		}
	});

	return nearest;
}
