import { describe, it, expect, vi, beforeEach } from 'vitest';
import annualReportService from './annualReportService';
import api from './api';

vi.mock('./api');

describe('annualReportService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getAnnualReports', () => {
		it('fetches annual reports list successfully', async () => {
			const mockData = {
				count: 2,
				results: [
					{ id: 1, year: 2023, title: '2023 Annual Report', file_url: '/reports/2023.pdf' },
					{ id: 2, year: 2022, title: '2022 Annual Report', file_url: '/reports/2022.pdf' }
				]
			};

			api.get.mockResolvedValue({ data: mockData });

			const result = await annualReportService.getAnnualReports();

			expect(api.get).toHaveBeenCalledWith('/annual-reports/annual-reports/', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			expect(result).toEqual(mockData);
		});

		it('fetches annual reports with query parameters', async () => {
			const mockData = { count: 1, results: [] };
			const params = { year: 2023, ordering: '-year' };

			api.get.mockResolvedValue({ data: mockData });

			await annualReportService.getAnnualReports(params);

			expect(api.get).toHaveBeenCalledWith('/annual-reports/annual-reports/?year=2023&ordering=-year', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		});

		it('handles empty params', async () => {
			const mockData = { count: 0, results: [] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await annualReportService.getAnnualReports({});

			expect(api.get).toHaveBeenCalledWith('/annual-reports/annual-reports/', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			expect(result).toEqual(mockData);
		});

		it('handles API errors', async () => {
			const mockError = new Error('Server error');
			api.get.mockRejectedValue(mockError);

			await expect(annualReportService.getAnnualReports()).rejects.toThrow('Server error');
		});
	});

	describe('getAnnualReport', () => {
		it('fetches single annual report successfully', async () => {
			const mockData = {
				id: 1,
				year: 2023,
				title: '2023 Annual Report',
				file_url: '/reports/2023.pdf',
				summary: 'Financial highlights for 2023'
			};

			api.get.mockResolvedValue({ data: mockData });

			const result = await annualReportService.getAnnualReport(1);

			expect(api.get).toHaveBeenCalledWith('/annual-reports/annual-reports/1/', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			expect(result).toEqual(mockData);
		});

		it('handles report not found', async () => {
			const notFoundError = new Error('Not found');
			notFoundError.response = { status: 404 };
			api.get.mockRejectedValue(notFoundError);

			await expect(annualReportService.getAnnualReport(999)).rejects.toThrow('Not found');
		});

		it('fetches report with different ID types', async () => {
			const mockData = { id: 5, year: 2021 };
			api.get.mockResolvedValue({ data: mockData });

			await annualReportService.getAnnualReport(5);

			expect(api.get).toHaveBeenCalledWith('/annual-reports/annual-reports/5/', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		});
	});
});

