import { describe, it, expect, vi, beforeEach } from 'vitest';
import propertyService from './propertyService';
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

describe('propertyService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getProperties', () => {
		it('fetches all properties', async () => {
			const mockProperties = {
				count: 2,
				results: [
					{
						id: 1,
						title: 'Toyota Corolla 2020',
						property_type: 'vehicle',
						price: 800000,
						status: 'available'
					},
					{
						id: 2,
						title: '2BR Condo in Makati',
						property_type: 'real_estate',
						price: 5000000,
						status: 'available'
					}
				]
			};

			api.get.mockResolvedValue({ data: mockProperties });

			const result = await propertyService.getProperties();

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockProperties);
			expect(api.get).toHaveBeenCalledWith('/properties/properties/', { params: {} });
		});

		it('filters by property type', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await propertyService.getProperties({ property_type: 'vehicle' });

			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: { property_type: 'vehicle' }
			});
		});

		it('filters by status', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await propertyService.getProperties({ status: 'sold' });

			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: { status: 'sold' }
			});
		});

		it('filters by price range', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await propertyService.getProperties({ min_price: 500000, max_price: 1000000 });

			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: { min_price: 500000, max_price: 1000000 }
			});
		});

		it('applies search query', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await propertyService.getProperties({ search: 'Toyota' });

			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: { search: 'Toyota' }
			});
		});

		it('applies ordering', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await propertyService.getProperties({ ordering: '-price' });

			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: { ordering: '-price' }
			});
		});

		it('applies pagination', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await propertyService.getProperties({ page: 2, page_size: 10 });

			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: { page: 2, page_size: 10 }
			});
		});

		it('handles API errors', async () => {
			api.get.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await propertyService.getProperties();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});
	});

	describe('getProperty', () => {
		it('fetches single property by ID', async () => {
			const mockProperty = {
				id: 1,
				title: 'Toyota Corolla 2020',
				property_type: 'vehicle',
				price: 800000,
				description: 'Well maintained vehicle',
				status: 'available'
			};

			api.get.mockResolvedValue({ data: mockProperty });

			const result = await propertyService.getProperty(1);

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockProperty);
			expect(api.get).toHaveBeenCalledWith('/properties/properties/1/');
		});

		it('handles property not found', async () => {
			api.get.mockRejectedValue({
				response: { status: 404, data: {} }
			});

			const result = await propertyService.getProperty(999);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});

		it('handles network errors', async () => {
			api.get.mockRejectedValue({
				request: {},
				message: 'Network Error'
			});

			const result = await propertyService.getProperty(1);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Network Error');
		});
	});

	describe('getVehicles', () => {
		it('fetches vehicles with property_type filter', async () => {
			const mockVehicles = {
				count: 2,
				results: [
					{
						id: 1,
						title: 'Toyota Corolla 2020',
						property_type: 'vehicle',
						price: 800000
					},
					{
						id: 2,
						title: 'Honda Civic 2019',
						property_type: 'vehicle',
						price: 750000
					}
				]
			};

			api.get.mockResolvedValue({ data: mockVehicles });

			const result = await propertyService.getVehicles();

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockVehicles);
			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: { property_type: 'vehicle' }
			});
		});

		it('merges additional params', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await propertyService.getVehicles({ search: 'Toyota', ordering: '-price' });

			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: {
					property_type: 'vehicle',
					search: 'Toyota',
					ordering: '-price'
				}
			});
		});
	});

	describe('getRealEstate', () => {
		it('fetches real estate with property_type filter', async () => {
			const mockRealEstate = {
				count: 2,
				results: [
					{
						id: 1,
						title: '2BR Condo',
						property_type: 'real_estate',
						price: 5000000
					},
					{
						id: 2,
						title: 'House and Lot',
						property_type: 'real_estate',
						price: 8000000
					}
				]
			};

			api.get.mockResolvedValue({ data: mockRealEstate });

			const result = await propertyService.getRealEstate();

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockRealEstate);
			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: { property_type: 'real_estate' }
			});
		});

		it('merges additional params', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await propertyService.getRealEstate({ min_price: 3000000, max_price: 6000000 });

			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: {
					property_type: 'real_estate',
					min_price: 3000000,
					max_price: 6000000
				}
			});
		});
	});

	describe('getFeaturedProperties', () => {
		it('fetches featured available properties', async () => {
			const mockFeatured = {
				count: 3,
				results: [
					{
						id: 1,
						title: 'Featured Property 1',
						is_featured: true,
						status: 'available'
					},
					{
						id: 2,
						title: 'Featured Property 2',
						is_featured: true,
						status: 'available'
					}
				]
			};

			api.get.mockResolvedValue({ data: mockFeatured });

			const result = await propertyService.getFeaturedProperties();

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockFeatured);
			expect(api.get).toHaveBeenCalledWith('/properties/properties/', {
				params: { is_featured: true, status: 'available' }
			});
		});

		it('handles errors', async () => {
			api.get.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await propertyService.getFeaturedProperties();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});
	});
});

