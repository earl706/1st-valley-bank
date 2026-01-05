import { describe, it, expect, vi, beforeEach } from 'vitest';
import locationService from './locationService';
import api from './api';

// Mock api but keep handleApiError real
vi.mock('./api', async () => {
	const actual = await vi.importActual('./api');
	return {
		...actual,
		default: {
			post: vi.fn(),
			get: vi.fn(),
			put: vi.fn(),
			delete: vi.fn()
		}
	};
});

describe('locationService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getBranches', () => {
		it('fetches all branches successfully', async () => {
			const mockBranches = {
				count: 2,
				results: [
					{
						id: 1,
						name: 'Main Branch',
						region: 'ncr',
						address: '123 Main St',
						latitude: 14.5995,
						longitude: 120.9842
					},
					{
						id: 2,
						name: 'QC Branch',
						region: 'ncr',
						address: '456 QC Ave',
						latitude: 14.6760,
						longitude: 121.0437
					}
				]
			};

			api.get.mockResolvedValue({ data: mockBranches });

			const result = await locationService.getBranches();

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockBranches.results);
			expect(api.get).toHaveBeenCalledWith('/locations/branches/', { params: {} });
		});

		it('filters branches by region', async () => {
			api.get.mockResolvedValue({ data: { count: 1, results: [] } });

			await locationService.getBranches({ region: 'mindanao' });

			expect(api.get).toHaveBeenCalledWith('/locations/branches/', {
				params: { region: 'mindanao' }
			});
		});

		it('filters branches with ATM', async () => {
			api.get.mockResolvedValue({ data: { count: 1, results: [] } });

			await locationService.getBranches({ has_atm: true });

			expect(api.get).toHaveBeenCalledWith('/locations/branches/', {
				params: { has_atm: true }
			});
		});

		it('handles API errors', async () => {
			api.get.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await locationService.getBranches();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});
	});

	describe('getBranch', () => {
		it('fetches single branch by ID', async () => {
			const mockBranch = {
				id: 1,
				name: 'Main Branch',
				region: 'ncr',
				address: '123 Main St'
			};

			api.get.mockResolvedValue({ data: mockBranch });

			const result = await locationService.getBranch(1);

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockBranch);
			expect(api.get).toHaveBeenCalledWith('/branches/1/');
		});

		it('handles branch not found', async () => {
			api.get.mockRejectedValue({
				response: { status: 404, data: {} }
			});

			const result = await locationService.getBranch(999);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});
	});

	describe('getBranchesByRegion', () => {
		it('fetches branches by specific region', async () => {
			api.get.mockResolvedValue({ data: { count: 2, results: [] } });

			await locationService.getBranchesByRegion('visayas');

			expect(api.get).toHaveBeenCalledWith('/locations/branches/', {
				params: { region: 'visayas' }
			});
		});
	});

	describe('getATMs', () => {
		it('fetches all ATMs successfully', async () => {
			const mockATMs = {
				count: 2,
				results: [
					{
						id: 1,
						name: 'Mall ATM',
						is_24_hours: true
					},
					{
						id: 2,
						name: 'Branch ATM',
						is_24_hours: false
					}
				]
			};

			api.get.mockResolvedValue({ data: mockATMs });

			const result = await locationService.getATMs();

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockATMs);
			expect(api.get).toHaveBeenCalledWith('/locations/atms/', { params: {} });
		});

		it('filters 24-hour ATMs', async () => {
			api.get.mockResolvedValue({ data: { count: 1, results: [] } });

			await locationService.getATMs({ is_24_hours: true });

			expect(api.get).toHaveBeenCalledWith('/locations/atms/', {
				params: { is_24_hours: true }
			});
		});

		it('handles API errors', async () => {
			api.get.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await locationService.getATMs();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});
	});

	describe('getATM', () => {
		it('fetches single ATM by ID', async () => {
			const mockATM = {
				id: 1,
				name: 'Mall ATM',
				is_24_hours: true
			};

			api.get.mockResolvedValue({ data: mockATM });

			const result = await locationService.getATM(1);

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockATM);
			expect(api.get).toHaveBeenCalledWith('/atms/1/');
		});
	});

	describe('searchPlaces', () => {
		it('searches for places with query', async () => {
			const mockResults = {
				results: [
					{
						description: 'Makati City, Metro Manila',
						place_id: '123'
					}
				]
			};

			api.get.mockResolvedValue({ data: mockResults });

			const result = await locationService.searchPlaces('Makati');

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockResults.results);
			expect(api.get).toHaveBeenCalledWith('/locations/autocomplete/', {
				params: expect.objectContaining({
					query: 'Makati',
					limit: 5,
					region: 'ph'
				})
			});
		});

		it('returns empty array for empty query', async () => {
			const result = await locationService.searchPlaces('');

			expect(result.success).toBe(true);
			expect(result.data).toEqual([]);
			expect(api.get).not.toHaveBeenCalled();
		});

		it('accepts custom parameters', async () => {
			api.get.mockResolvedValue({ data: { results: [] } });

			await locationService.searchPlaces('Manila', {
				limit: 10,
				region: 'ph',
				language: 'tl'
			});

			expect(api.get).toHaveBeenCalledWith('/locations/autocomplete/', {
				params: expect.objectContaining({
					query: 'Manila',
					limit: 10,
					region: 'ph',
					language: 'tl'
				})
			});
		});
	});

	describe('findNearestBranchByAddress', () => {
		it('finds nearest branch by address components', async () => {
			const mockBranch = {
				id: 1,
				name: 'Nearest Branch',
				distance: 2.5
			};

			api.post.mockResolvedValue({ data: mockBranch });

			const addressData = {
				province: 'Metro Manila',
				municipality: 'Manila',
				barangay: 'Ermita'
			};

			const result = await locationService.findNearestBranchByAddress(addressData);

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockBranch);
			expect(api.post).toHaveBeenCalledWith('/locations/branches/nearest/', addressData);
		});

		it('includes has_atm filter', async () => {
			api.post.mockResolvedValue({ data: {} });

			const addressData = {
				province: 'Metro Manila',
				municipality: 'Manila',
				barangay: 'Ermita',
				has_atm: true
			};

			await locationService.findNearestBranchByAddress(addressData);

			expect(api.post).toHaveBeenCalledWith(
				'/locations/branches/nearest/',
				expect.objectContaining({ has_atm: true })
			);
		});

		it('handles errors', async () => {
			api.post.mockRejectedValue({
				response: { status: 400, data: {} }
			});

			const result = await locationService.findNearestBranchByAddress({});

			expect(result.success).toBe(false);
		});
	});

	describe('findNearestATMByAddress', () => {
		it('finds nearest ATM by address components', async () => {
			const mockATM = {
				id: 1,
				name: 'Nearest ATM',
				distance: 1.0
			};

			api.post.mockResolvedValue({ data: mockATM });

			const addressData = {
				province: 'Metro Manila',
				municipality: 'Makati',
				barangay: 'Poblacion'
			};

			const result = await locationService.findNearestATMByAddress(addressData);

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockATM);
			expect(api.post).toHaveBeenCalledWith('/locations/atms/nearest/', addressData);
		});
	});

	describe('reverseGeocode', () => {
		it('reverse geocodes coordinates', async () => {
			const mockResult = {
				formatted_address: 'Ermita, Manila, Metro Manila',
				place_id: '123'
			};

			api.get.mockResolvedValue({ data: { result: mockResult } });

			const result = await locationService.reverseGeocode({
				latitude: 14.5995,
				longitude: 120.9842
			});

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockResult);
			expect(api.get).toHaveBeenCalledWith('/locations/google-reverse-geocode/', {
				params: { latitude: 14.5995, longitude: 120.9842 }
			});
		});

		it('requires latitude and longitude', async () => {
			const result = await locationService.reverseGeocode({});

			expect(result.success).toBe(false);
			expect(result.message).toContain('required');
			expect(api.get).not.toHaveBeenCalled();
		});
	});

	describe('findNearest', () => {
		it('finds nearest branch by coordinates', async () => {
			const mockBranch = {
				id: 1,
				name: 'Nearest Branch',
				distance: 1.5
			};

			api.get.mockResolvedValue({ data: mockBranch });

			const result = await locationService.findNearest(14.5995, 120.9842, 'branch');

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockBranch);
			expect(api.get).toHaveBeenCalledWith('/branchs/nearest/', {
				params: { latitude: 14.5995, longitude: 120.9842 }
			});
		});

		it('finds nearest ATM by coordinates', async () => {
			api.get.mockResolvedValue({ data: {} });

			await locationService.findNearest(14.5995, 120.9842, 'atm');

			expect(api.get).toHaveBeenCalledWith('/atms/nearest/', {
				params: { latitude: 14.5995, longitude: 120.9842 }
			});
		});

		it('defaults to branch type', async () => {
			api.get.mockResolvedValue({ data: {} });

			await locationService.findNearest(14.5995, 120.9842);

			expect(api.get).toHaveBeenCalledWith('/branchs/nearest/', expect.any(Object));
		});
	});
});

