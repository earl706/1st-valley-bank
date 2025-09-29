import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, ArrowLeft, Phone, Mail } from 'lucide-react';

export default function LoanQualificationResults() {
	const location = useLocation();
	const navigate = useNavigate();
	const { result, loanType } = location.state || {};

	if (!result) {
		return (
			<div className="min-h-screen bg-[#f7faf7] py-12">
				<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-2xl font-bold text-[#396131]">No Results Found</h1>
						<p className="mt-2 text-gray-700">
							Please complete the qualification assessment first.
						</p>
						<button
							onClick={() => navigate('/loans')}
							className="mt-6 rounded-md bg-[#396131] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#2d4b26] focus:ring-2 focus:ring-[#396131] focus:outline-none"
						>
							Back to Loans
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#f7faf7] py-12">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 text-center">
					<button
						onClick={() => navigate(-1)}
						className="mb-4 inline-flex items-center gap-2 text-[#396131] hover:underline"
					>
						<ArrowLeft size={20} />
						<span className="font-medium">Back to Assessment</span>
					</button>
					<h1 className="text-3xl font-bold text-[#396131] md:text-4xl">
						Loan Qualification Results
					</h1>
					<p className="mt-2 text-base text-gray-700">
						Assessment for {loanType?.replace('-', ' ').toUpperCase()} Loan
					</p>
				</div>

				{/* Results Card */}
				<div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
					<div className="text-center">
						{result.qualified ? (
							<CheckCircle size={72} className="mx-auto text-[#396131]" />
						) : (
							<XCircle size={72} className="mx-auto text-gray-400" />
						)}

						<h2
							className={`mt-4 text-2xl font-bold ${
								result.qualified ? 'text-[#396131]' : 'text-gray-700'
							}`}
						>
							{result.qualified ? 'QUALIFIED' : 'NOT QUALIFIED'}
						</h2>

						<div className="mt-4">
							<div className="text-4xl font-bold text-[#396131]">{Math.round(result.score)}%</div>
							<div className="text-sm text-gray-500">Qualification Score</div>
						</div>

						<p className="mt-6 text-base text-gray-700">{result.message}</p>
					</div>

					{/* Recommendations */}
					{result.recommendations && result.recommendations.length > 0 && (
						<div className="mt-8">
							<h3 className="mb-3 text-lg font-semibold text-[#396131]">Recommendations</h3>
							<ul className="space-y-2">
								{result.recommendations.map((rec, index) => (
									<li key={index} className="flex items-start gap-2">
										<AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-[#396131]" />
										<span className="text-gray-700">{rec}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Next Steps */}
					<div className="mt-8 rounded-md border border-gray-100 bg-[#f3f6f3] p-6">
						<h3 className="mb-3 text-base font-semibold text-[#396131]">Next Steps</h3>
						{result.qualified ? (
							<ol className="list-inside list-decimal space-y-3 text-gray-800">
								<li>Gather required documents (ID, income proof, etc.)</li>
								<li>Schedule an appointment with our loan officer</li>
								<li>Submit your loan application</li>
							</ol>
						) : (
							<ol className="list-inside list-decimal space-y-3 text-gray-800">
								<li>Work on improving your credit score</li>
								<li>Consider alternative loan products</li>
								<li>Consult with our financial advisors</li>
							</ol>
						)}
					</div>

					{/* Action Buttons */}
					<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
						{result.qualified ? (
							<>
								<button
									onClick={() => navigate('/contact-us')}
									className="flex items-center justify-center gap-2 rounded-md bg-[#396131] px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-[#2d4b26] focus:ring-2 focus:ring-[#396131] focus:outline-none"
								>
									<Phone size={18} />
									Apply for Loan
								</button>
								<button
									onClick={() => navigate('/contact-us')}
									className="flex items-center justify-center gap-2 rounded-md border border-[#396131] bg-white px-8 py-3 font-semibold text-[#396131] transition hover:bg-[#f3f6f3] focus:ring-2 focus:ring-[#396131] focus:outline-none"
								>
									<Mail size={18} />
									Get More Information
								</button>
							</>
						) : (
							<>
								<button
									onClick={() => navigate('/contact-us')}
									className="flex items-center justify-center gap-2 rounded-md bg-[#396131] px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-[#2d4b26] focus:ring-2 focus:ring-[#396131] focus:outline-none"
								>
									<Phone size={18} />
									Consult with Expert
								</button>
								<button
									onClick={() => navigate('/loans')}
									className="flex items-center justify-center gap-2 rounded-md border border-[#396131] bg-white px-8 py-3 font-semibold text-[#396131] transition hover:bg-[#f3f6f3] focus:ring-2 focus:ring-[#396131] focus:outline-none"
								>
									View Other Loans
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
