import { describe, it, expect } from 'vitest';
import { toRadians, haversineDistanceKm, findNearestLocation } from './geo';

describe('Geo Utilities', () => {
	describe('toRadians', () => {
		it('converts degrees to radians', () => {
			expect(toRadians(0)).toBe(0);
			expect(toRadians(180)).toBeCloseTo(Math.PI, 5);
			expect(toRadians(90)).toBeCloseTo(Math.PI / 2, 5);
			expect(toRadians(360)).toBeCloseTo(Math.PI * 2, 5);
		});

		it('handles negative degrees', () => {
			expect(toRadians(-180)).toBeCloseTo(-Math.PI, 5);
			expect(toRadians(-90)).toBeCloseTo(-Math.PI / 2, 5);
		});
	});

	describe('haversineDistanceKm', () => {
		it('calculates distance between two points', () => {
			// Manila to Quezon City (approximately 12-13 km)
			const manilaLat = 14.5995;
			const manilaLon = 120.9842;
			const qcLat = 14.6760;
			const qcLon = 121.0437;

			const distance = haversineDistanceKm(manilaLat, manilaLon, qcLat, qcLon);
			
			// Should be around 12-13 km
			expect(distance).toBeGreaterThan(10);
			expect(distance).toBeLessThan(15);
		});

		it('returns zero for same location', () => {
			const lat = 14.5995;
			const lon = 120.9842;
			
			const distance = haversineDistanceKm(lat, lon, lat, lon);
			expect(distance).toBe(0);
		});

		it('calculates distance across hemisphere', () => {
			// New York to London (approximately 5570 km)
			const nyLat = 40.7128;
			const nyLon = -74.0060;
			const londonLat = 51.5074;
			const londonLon = -0.1278;

			const distance = haversineDistanceKm(nyLat, nyLon, londonLat, londonLon);
			
			// Should be around 5500-5600 km
			expect(distance).toBeGreaterThan(5500);
			expect(distance).toBeLessThan(5600);
		});
	});

	describe('findNearestLocation', () => {
		const origin = { latitude: 14.5995, longitude: 120.9842 };
		
		const candidates = [
			{ id: 1, name: 'Location A', latitude: 14.6000, longitude: 120.9850 },
			{ id: 2, name: 'Location B', latitude: 14.6760, longitude: 121.0437 },
			{ id: 3, name: 'Location C', latitude: 14.5500, longitude: 120.9500 }
		];

		it('finds the nearest location from candidates', () => {
			const nearest = findNearestLocation(origin, candidates);
			
			expect(nearest).toBeDefined();
			expect(nearest.id).toBe(1); // Location A is closest
			expect(nearest).toHaveProperty('distanceKm');
			expect(nearest.distanceKm).toBeGreaterThan(0);
			expect(nearest.distanceKm).toBeLessThan(1);
		});

		it('returns null for invalid origin', () => {
			expect(findNearestLocation(null, candidates)).toBeNull();
			expect(findNearestLocation({}, candidates)).toBeNull();
			expect(findNearestLocation({ latitude: null, longitude: 120 }, candidates)).toBeNull();
			expect(findNearestLocation({ latitude: 14, longitude: null }, candidates)).toBeNull();
		});

		it('returns null for empty candidates array', () => {
			const result = findNearestLocation(origin, []);
			expect(result).toBeNull();
		});

		it('skips candidates with invalid coordinates', () => {
			const mixedCandidates = [
				{ id: 1, name: 'Invalid 1', latitude: null, longitude: 120.9850 },
				{ id: 2, name: 'Invalid 2', latitude: undefined, longitude: 121.0437 },
				{ id: 3, name: 'Valid', latitude: 14.6000, longitude: 120.9850 }
			];

			const nearest = findNearestLocation(origin, mixedCandidates);
			
			expect(nearest).toBeDefined();
			expect(nearest.id).toBe(3);
			expect(nearest.name).toBe('Valid');
		});

		it('handles all invalid candidates', () => {
			const invalidCandidates = [
				{ id: 1, latitude: null, longitude: 120 },
				{ id: 2, latitude: 14, longitude: undefined }
			];

			const result = findNearestLocation(origin, invalidCandidates);
			expect(result).toBeNull();
		});

		it('includes distance in km in result', () => {
			const nearest = findNearestLocation(origin, candidates);
			
			expect(nearest).toHaveProperty('distanceKm');
			expect(typeof nearest.distanceKm).toBe('number');
			expect(nearest.distanceKm).toBeGreaterThanOrEqual(0);
		});

		it('preserves all candidate properties in result', () => {
			const nearest = findNearestLocation(origin, candidates);
			
			expect(nearest).toHaveProperty('id');
			expect(nearest).toHaveProperty('name');
			expect(nearest).toHaveProperty('latitude');
			expect(nearest).toHaveProperty('longitude');
		});

		it('handles string coordinates by converting to numbers', () => {
			const stringCandidates = [
				{ id: 1, name: 'String coords', latitude: '14.6000', longitude: '120.9850' }
			];

			const nearest = findNearestLocation(origin, stringCandidates);
			
			expect(nearest).toBeDefined();
			expect(nearest.id).toBe(1);
		});
	});
});

