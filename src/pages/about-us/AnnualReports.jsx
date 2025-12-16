import React, { useEffect, useState } from 'react';
import { FileText, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import aboutPageService from '../../services/aboutPageService';
import annualReportService from '../../services/annualReportService';
import { LightHeader } from '../../components/Header';
import { LightCard } from '../../components/Card';
import { LightPrimaryButton } from '../../components/Buttons';
import HeroSection from '../../components/HeroSection';
import { DetailPageSkeleton } from '../../components/PageSkeleton';
import img1 from '/src/assets/carousel/1.png';

const PDFModal = ({ open, onClose, pdfUrl }) => {
	if (!open) return null;
	return (
		<div className="bg-opacity-60 fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
			<div className="relative w-full max-w-7xl overflow-hidden rounded-lg bg-white shadow-xl">
				<button
					className="absolute top-3 right-3 text-2xl text-gray-800 hover:text-red-500"
					onClick={onClose}
					aria-label="Close"
				>
					<X className="h-6 w-6" />
				</button>
				<div className="p-6 pt-12">
					<h2 className="mb-2 flex items-center gap-2 text-2xl font-bold text-[#396131]">
						<FileText className="h-6 w-6 text-rose-700" />
						Report PDF Preview
					</h2>
					{pdfUrl ? (
						<iframe
							title="Annual Report PDF"
							src={pdfUrl}
							className="h-[60vh] w-full rounded border-0"
						></iframe>
					) : (
						<div className="text-lg text-gray-600">No PDF available for this report.</div>
					)}
					<div className="mt-8 flex gap-3">
						<LightPrimaryButton
							className="flex flex-1 items-center justify-center gap-2"
							onClick={onClose}
						>
							Close
						</LightPrimaryButton>
					</div>
				</div>
			</div>
		</div>
	);
};

const AnnualReportModal = ({
	open,
	onClose,
	report,
	onViewPDF,
	onPrev,
	onNext,
	showPrev,
	showNext
}) => {
	if (!open || !report) return null;
	const renderKeyValueList = (obj) =>
		obj && typeof obj === 'object'
			? Object.entries(obj).map(([key, value]) => (
					<li key={key}>
						<span className="font-semibold">{key}:</span> {value}
					</li>
				))
			: null;
	return (
		<div className="bg-opacity-60 fixed inset-0 z-[9998] flex items-center justify-center bg-black/70">
			<button
				className="absolute top-3 right-3 cursor-pointer text-2xl text-gray-200 transition-all duration-300 hover:text-red-500"
				onClick={onClose}
				aria-label="Close"
			>
				<X className="h-7 w-7" />
			</button>
			<div className="relative max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-xl bg-white shadow-2xl">
				<div className="flex items-center justify-between p-4">
					{showPrev && (
						<button
							className="p-2 text-[#396131] hover:text-[#4a7a3f]"
							title="Previous"
							onClick={onPrev}
						>
							<ChevronLeft className="h-5 w-5" />
						</button>
					)}
					<span className="flex-1 text-center text-lg font-bold text-[#396131] uppercase">
						{report.title}
					</span>
					{showNext && (
						<button
							className="p-2 text-[#396131] hover:text-[#4a7a3f]"
							title="Next"
							onClick={onNext}
						>
							<ChevronRight className="h-5 w-5" />
						</button>
					)}
				</div>
				<div className="p-6">
					<div className="mb-5 flex justify-center">
						<img
							src={report.image}
							alt={report.title}
							className="max-h-48 w-auto rounded-lg border shadow-sm"
						/>
					</div>
					<div className="mb-5">
						<h3 className="mb-1 text-lg font-bold text-[#396131]">Corporate Highlights</h3>
						<ul className="grid list-inside list-disc gap-1 text-gray-800">
							{Array.isArray(report.corporate_highlights) &&
								report.corporate_highlights.map((h, i) => <li key={i}>{h}</li>)}
						</ul>
					</div>
					{report.key_figures && Object.keys(report.key_figures).length > 0 && (
						<div className="mb-5">
							<h3 className="mb-1 text-lg font-bold text-[#396131]">Key Figures</h3>
							<ul className="grid list-inside list-disc gap-1 text-gray-800">
								{renderKeyValueList(report.key_figures)}
							</ul>
						</div>
					)}
					{report.comparative_growth && Object.keys(report.comparative_growth).length > 0 && (
						<div className="mb-5">
							<h3 className="mb-1 text-lg font-bold text-[#396131]">Comparative Growth</h3>
							<ul className="grid list-inside list-disc gap-1 text-gray-800">
								{renderKeyValueList(report.comparative_growth)}
							</ul>
						</div>
					)}
					{report.additional_info && (
						<div className="mb-5">
							<h3 className="mb-1 text-lg font-bold text-[#396131]">Additional Info</h3>
							<div className="text-gray-700">{report.additional_info}</div>
						</div>
					)}
					<div className="mt-8 flex gap-3">
						<LightPrimaryButton
							className="flex flex-1 items-center justify-center gap-2"
							onClick={onClose}
						>
							Close
						</LightPrimaryButton>
						<LightPrimaryButton
							className="flex flex-1 items-center justify-center gap-2"
							onClick={onViewPDF}
						>
							<FileText className="h-5 w-5 text-rose-700" />
							View PDF
						</LightPrimaryButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function AnnualReports() {
	const [annualReports, setAnnualReports] = useState([]);
	const [annualReportsLoading, setAnnualReportsLoading] = useState(true);
	const [annualReportsError, setAnnualReportsError] = useState(null);

	const [annualReportModalIdx, setAnnualReportModalIdx] = useState(null);
	const [pdfModalOpen, setPdfModalOpen] = useState(false);

	useEffect(() => {
		let mounted = true;
		const fetchAnnualReports = async () => {
			setAnnualReportsLoading(true);
			setAnnualReportsError(null);
			try {
				const reports = await annualReportService.getAnnualReports({
					page: 1,
					page_size: 6,
					ordering: '-created_at'
				});
				if (mounted) {
					setAnnualReports(reports.results || []);
					setAnnualReportsLoading(false);
				}
			} catch (err) {
				if (mounted) {
					setAnnualReportsError(
						err?.message || 'Failed to load annual reports. Please try again later.'
					);
					setAnnualReports([]);
					setAnnualReportsLoading(false);
				}
			}
		};
		fetchAnnualReports();
		return () => {
			mounted = false;
		};
	}, []);

	if (annualReportsLoading) {
		return (
			<>
				<HeroSection
					title="Annual Reports"
					subtitle="Financial Transparency"
					description="Access our annual reports and financial statements to learn about our performance and growth."
					image={img1}
					imageAlt="Annual Reports"
					showCta={false}
					backgroundColor="from-[#E9F2EA] via-white to-green-50"
					titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
				/>
				<main className="flex flex-col">
					<DetailPageSkeleton showHero={false} showContent={true} contentSections={2} />
				</main>
			</>
		);
	}

	if (annualReportsError) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-red-700">
				<h2 className="mb-3 text-2xl font-bold">Failed to load annual reports</h2>
				<p>{annualReportsError}</p>
			</div>
		);
	}

	return (
		<>
			<HeroSection
				title="Annual Reports"
				subtitle="Financial Transparency"
				description="Access our annual reports and financial statements to learn about our performance and growth."
				image={img1}
				imageAlt="Annual Reports"
				showCta={false}
				backgroundColor="from-[#E9F2EA] via-white to-green-50"
				titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
			/>
			<main className="flex flex-col pb-8">
				<section
					id="annual-reports"
					className="relative flex flex-col items-center justify-center gap-12 px-4 py-12 text-[#396131] lg:px-12 lg:py-20"
				>
					<LightHeader
						badgeText="Reports"
						title="Annual Reports"
						subtitle="Review annual reports and corporate highlights of our continued growth and stability."
					/>
					<div className="grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
						{annualReports.map((report, index) => (
							<LightCard
								useNativeSpacing={true}
								className="group relative flex flex-col overflow-hidden rounded-2xl p-0 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
								key={index}
							>
								<div className="relative">
									<img
										src={report.image}
										alt={report.title}
										className="h-60 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<span className="absolute bottom-4 left-1/2 w-[90%] -translate-x-1/2 rounded-lg bg-white/90 px-4 py-2 text-center text-xl font-bold text-[#396131] shadow-md backdrop-blur-sm md:text-2xl">
										{report.title}
									</span>
								</div>
								<div className="flex flex-1 flex-col gap-6 px-6 py-6">
									<div>
										<span className="mb-2 block text-xl leading-tight font-bold text-[#396131]">
											Corporate Highlights
										</span>
										<ul className="flex flex-col gap-2">
											{report.corporate_highlights?.map((highlight, idx) => (
												<li key={idx} className="flex items-center gap-3">
													<span className="inline-block h-4 w-4 flex-shrink-0 rounded bg-gradient-to-br from-[#396131] to-[#4a7a3f]"></span>
													<span className="text-base leading-relaxed font-normal text-gray-700">
														{highlight}
													</span>
												</li>
											))}
										</ul>
									</div>
									<div className="mt-auto flex justify-center">
										<LightPrimaryButton
											to=""
											className="w-full py-4 text-xl"
											secondaryIcon={<ArrowRight className="ml-3 h-5 w-5" />}
											onClick={(e) => {
												e.preventDefault();
												setAnnualReportModalIdx(index);
											}}
										>
											See Full Report
										</LightPrimaryButton>
									</div>
								</div>
							</LightCard>
						))}
					</div>
					<AnnualReportModal
						open={annualReportModalIdx !== null}
						report={
							typeof annualReportModalIdx === 'number' ? annualReports[annualReportModalIdx] : null
						}
						onClose={() => setAnnualReportModalIdx(null)}
						onViewPDF={() => setPdfModalOpen(true)}
						showPrev={typeof annualReportModalIdx === 'number' && annualReportModalIdx > 0}
						showNext={
							typeof annualReportModalIdx === 'number' &&
							annualReports &&
							annualReportModalIdx < annualReports.length - 1
						}
						onPrev={() =>
							setAnnualReportModalIdx((idx) => (typeof idx === 'number' && idx > 0 ? idx - 1 : idx))
						}
						onNext={() =>
							setAnnualReportModalIdx((idx) =>
								typeof idx === 'number' && idx < annualReports.length - 1 ? idx + 1 : idx
							)
						}
					/>
					<PDFModal
						open={pdfModalOpen}
						onClose={() => setPdfModalOpen(false)}
						pdfUrl={
							typeof annualReportModalIdx === 'number' && annualReports[annualReportModalIdx]
								? annualReports[annualReportModalIdx].pdf_file
								: null
						}
					/>
				</section>
			</main>
		</>
	);
}
