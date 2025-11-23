import React, { useState, useRef, useEffect } from 'react';
import {
	Send,
	Bot,
	User,
	Sparkles,
	Mic,
	X,
	MessageCircle,
	Minimize2,
	FileText,
	AlertCircle,
	CheckCircle
} from 'lucide-react';
import chatbotService from '../services/chatbotService';

// ---- Helper Components ----

const TypingIndicator = () => (
	<div className="animate-fade-in mb-4 flex items-start space-x-3">
		<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
			<Bot className="h-3 w-3 text-white" />
		</div>
		<div className="max-w-xs rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
			<div className="flex space-x-1">
				{[0, 150, 300].map((delay) => (
					<div
						key={delay}
						className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
						style={{ animationDelay: `${delay}ms` }}
					/>
				))}
			</div>
		</div>
	</div>
);

const ChatToggleButton = ({ onClick }) => (
	<div className="group fixed right-8 bottom-8 z-50 flex items-center">
		<button
			onClick={onClick}
			className="group relative h-20 w-20 cursor-pointer rounded-full bg-gradient-to-br from-[#396131] via-[#4a7c3a] to-[#31542B] shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95"
			aria-label="Open AI Chat Assistant"
		>
			{/* Tooltip */}
			<span className="pointer-events-none absolute right-full mr-4 origin-right translate-x-2 scale-95 rounded-lg bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-[#396131] opacity-0 shadow-lg transition-all duration-200 select-none group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
				Chat with our AI Assistant
			</span>
			{/* Animated green dot */}
			<span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center">
				<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60"></span>
				<span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>
			</span>
			{/* Icon */}
			<span className="flex h-full w-full items-center justify-center">
				<MessageCircle className="animate-bounce-slow group-hover:animate-bounce-fast h-10 w-10 text-white drop-shadow-lg" />
			</span>
		</button>
	</div>
);

const ChatHeader = ({ onMinimize, onClose }) => (
	<div className="flex flex-shrink-0 items-center justify-between rounded-t-2xl bg-[#396131] px-4 py-3 text-white">
		<div className="flex items-center space-x-3">
			<div className="relative">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
					<Sparkles className="h-4 w-4 text-white" />
				</div>
				<div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
			</div>
			<div>
				<h3 className="text-sm font-semibold">ValleyBot</h3>
				<p className="text-xs opacity-90">Online</p>
			</div>
		</div>
		<div className="flex items-center space-x-1">
			<button
				onClick={onMinimize}
				className="hover:bg-opacity-20 cursor-pointer rounded-full p-1.5 transition-colors hover:bg-white hover:text-[#396131]"
			>
				<Minimize2 className="h-4 w-4" />
			</button>
			<button
				onClick={onClose}
				className="hover:bg-opacity-20 cursor-pointer rounded-full p-1.5 transition-colors hover:bg-white hover:text-[#396131]"
			>
				<X className="h-4 w-4" />
			</button>
		</div>
	</div>
);

const ChatMessage = ({ message }) => {
	const isUser = message.sender === 'user';
	const hasError = message.error;
	const hasSources = message.sources && message.sources.length > 0;

	return (
		<div
			className={`animate-fade-in flex items-start space-x-2 ${
				isUser ? 'flex-row-reverse space-x-reverse' : ''
			}`}
		>
			<div className="flex-shrink-0">
				{isUser ? (
					<div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-600">
						<User className="h-3 w-3 text-white" />
					</div>
				) : (
					<div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900">
						<Bot className="h-3 w-3 text-white" />
					</div>
				)}
			</div>
			<div className={`max-w-[280px] ${isUser ? 'text-right' : ''}`}>
				<div
					className={`rounded-2xl px-3 py-2 text-sm ${
						isUser
							? 'rounded-tr-sm bg-[#396131] text-white'
							: hasError
								? 'rounded-tl-sm border border-red-200 bg-red-50 text-red-800'
								: 'rounded-tl-sm bg-gray-100 text-gray-800'
					}`}
				>
					{hasError && (
						<div className="mb-1 flex items-center gap-1 text-red-600">
							<AlertCircle className="h-3 w-3" />
							<span className="text-xs font-semibold">Error</span>
						</div>
					)}
					<p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>

					{/* {hasSources && !isUser && (
						<div className="mt-2 border-t border-gray-300 pt-2">
							<div className="mb-1 flex items-center gap-1 text-xs text-gray-600">
								<FileText className="h-3 w-3" />
								<span className="font-semibold">Sources:</span>
							</div>
							<div className="space-y-1">
								{message.sources.slice(0, 2).map((source, idx) => {
									if (!source || !source.content) return null;
									return (
										<div key={idx} className="rounded bg-white p-1.5 text-xs text-gray-600">
											<div className="flex items-start gap-1">
												<span className="font-semibold text-[#396131]">#{idx + 1}</span>
												<span className="line-clamp-2">{source.content.substring(0, 100)}...</span>
											</div>
											<div className="mt-0.5 text-[10px] text-gray-500">
												Relevance: {((source.similarity || 0) * 100).toFixed(0)}%
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)} */}
				</div>
				<p className={`mt-1 text-xs text-gray-500 ${isUser ? 'text-right' : ''}`}>
					{message.timestamp}
				</p>
			</div>
		</div>
	);
};

const DocumentSelector = ({ documents, selectedDocId, onSelect, loading }) => (
	<div className="border-b border-gray-200 bg-gray-50 p-3">
		<div className="flex items-center gap-2">
			<FileText className="h-4 w-4 text-[#396131]" />
			<div className="flex-1">
				{loading ? (
					<div className="text-xs text-gray-500">Loading documents...</div>
				) : documents.length === 0 ? (
					<div className="text-xs text-gray-500">No documents available</div>
				) : (
					<select
						value={selectedDocId || ''}
						onChange={(e) => onSelect(e.target.value)}
						className="w-full rounded-lg border-gray-300 bg-white text-xs focus:border-[#396131] focus:ring-[#396131]"
					>
						<option value="">All Documents</option>
						{documents.map((doc) => (
							<option key={doc.id} value={doc.id}>
								{doc.title} ({doc.status})
							</option>
						))}
					</select>
				)}
			</div>
		</div>
		{selectedDocId && (
			<div className="mt-1 flex items-center gap-1 text-xs text-[#396131]">
				<CheckCircle className="h-3 w-3" />
				<span>Querying specific document</span>
			</div>
		)}
	</div>
);

const ChatInput = ({ inputRef, inputText, isTyping, onChange, onKeyPress, onSend }) => (
	<div className="flex-shrink-0 border-t border-gray-200 p-4">
		<div className="mb-3 flex items-center space-x-2">
			<div className="relative flex flex-1">
				<textarea
					ref={inputRef}
					value={inputText}
					onChange={onChange}
					onKeyPress={onKeyPress}
					placeholder="Ask me anything about the documents..."
					className="w-full resize-none rounded-xl border-0 bg-gray-100 px-3 py-2 pr-10 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#396131] focus:outline-none"
					rows={1}
					style={{ minHeight: '36px', maxHeight: '80px' }}
				/>
				<button
					className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full p-1 text-gray-500 transition-colors hover:text-gray-700"
					tabIndex={-1}
					type="button"
				>
					<Mic className="h-4 w-4" />
				</button>
			</div>
			<button
				onClick={onSend}
				disabled={!inputText.trim() || isTyping}
				className="transform rounded-full bg-[#396131] p-2 text-white transition-all hover:scale-105 hover:bg-[#31542B] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<Send className="h-4 w-4" />
			</button>
		</div>
	</div>
);

// ---- Main Component ----

export default function ChatBox() {
	const [isOpen, setIsOpen] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: "Hello! I'm your AI assistant. How can I help you today?",
			sender: 'ai',
			timestamp: new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			})
		}
	]);
	const [inputText, setInputText] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const [documents, setDocuments] = useState([]);
	// HARDCODED document ID below (replace with actual doc id as desired)
	console.log(import.meta.env.VITE_PRODUCTION);
	const HARDCODED_DOCUMENT_ID =
		import.meta.env.VITE_PRODUCTION === 'True'
			? 'f48ac2e6-7ab6-40eb-bb37-b0df13428b87'
			: '761b8be7-fe90-4309-b10b-7efcbfae21b8';
	const [selectedDocumentId, setSelectedDocumentId] = useState(HARDCODED_DOCUMENT_ID);
	const [loadingDocuments, setLoadingDocuments] = useState(false);
	const [sessionId, setSessionId] = useState(null);

	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	// ---- Side Effects ----

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// Load documents and session when chat opens
	useEffect(() => {
		if (isOpen) {
			loadDocuments();
			// Get or create session ID
			const sid = chatbotService.getRAGSessionId();
			setSessionId(sid);
			// Use HARDCODED document selection
			setSelectedDocumentId(HARDCODED_DOCUMENT_ID);
		}
	}, [isOpen]);

	// ---- API Functions ----

	const loadDocuments = async () => {
		setLoadingDocuments(true);
		try {
			const response = await chatbotService.getDocuments();
			console.log('Documents:', response.data);
			if (response.success) {
				// Filter to only show completed documents
				const completedDocs = response.data.filter((doc) => doc.status === 'completed');
				setDocuments(completedDocs);
			} else {
				console.error('Failed to load documents:', response.error);
			}
		} catch (error) {
			console.error('Error loading documents:', error);
		} finally {
			setLoadingDocuments(false);
		}
	};

	// ---- Handlers ----

	const handleSendMessage = async () => {
		if (!inputText.trim()) return;

		const timestamp = new Date().toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit'
		});

		const userMessage = {
			id: Date.now(),
			text: inputText,
			sender: 'user',
			timestamp
		};

		setMessages((prev) => [...prev, userMessage]);
		const question = inputText;
		setInputText('');
		setIsTyping(true);

		try {
			// Call RAG API
			const response = await chatbotService.askRAG(question, HARDCODED_DOCUMENT_ID, sessionId);

			if (response.success) {
				// Filter and validate sources to ensure they have required properties
				const validSources = (response.data.sources || []).filter(
					(source) => source && source.content && typeof source.content === 'string'
				);

				const aiMessage = {
					id: Date.now() + 1,
					text: response.data.answer || 'I apologize, but I could not generate a response.',
					sender: 'ai',
					timestamp: new Date().toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit'
					}),
					sources: validSources,
					confidence: response.data.confidence
				};
				setMessages((prev) => [...prev, aiMessage]);
			} else {
				// Error response
				const errorMessage = {
					id: Date.now() + 1,
					text: response.message || 'Sorry, I encountered an error processing your question.',
					sender: 'ai',
					timestamp: new Date().toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit'
					}),
					error: true
				};
				setMessages((prev) => [...prev, errorMessage]);
			}
		} catch (error) {
			console.error('Error sending message:', error);
			const errorMessage = {
				id: Date.now() + 1,
				text: 'Sorry, I encountered an unexpected error. Please try again.',
				sender: 'ai',
				timestamp: new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit'
				}),
				error: true
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsTyping(false);
		}
	};

	const handleDocumentSelect = (docId) => {
		setSelectedDocumentId(docId || null);
		chatbotService.saveSelectedDocumentId(docId);

		// Add a system message about document selection
		const timestamp = new Date().toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit'
		});

		const selectedDoc = documents.find((d) => d.id === docId);
		const messageText =
			docId && selectedDoc
				? `Now querying: "${selectedDoc.title}"`
				: 'Now querying all available documents';

		const systemMessage = {
			id: Date.now(),
			text: messageText,
			sender: 'ai',
			timestamp
		};
		setMessages((prev) => [...prev, systemMessage]);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const toggleChat = () => {
		setIsOpen((prev) => !prev);
		setIsMinimized(false);
	};

	const minimizeChat = () => setIsMinimized(true);

	// ---- Rendering ----

	return (
		<>
			{!isOpen && <ChatToggleButton onClick={toggleChat} />}
			{isOpen && (
				<div
					className={`fixed right-6 bottom-6 z-50 flex w-96 flex-col rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
						isMinimized ? 'h-16' : 'h-[600px]'
					}`}
				>
					<ChatHeader onMinimize={minimizeChat} onClose={toggleChat} />

					{!isMinimized && (
						<>
							{/* Document Selector */}
							{/*
							<DocumentSelector
								documents={documents}
								selectedDocId={selectedDocumentId}
								onSelect={handleDocumentSelect}
								loading={loadingDocuments}
							/>
							*/}

							{/* Messages List */}
							<div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
								{messages.map((message) => (
									<ChatMessage key={message.id} message={message} />
								))}
								{isTyping && <TypingIndicator />}
								<div ref={messagesEndRef} />
							</div>

							{/* Chat Input */}
							<ChatInput
								inputRef={inputRef}
								inputText={inputText}
								isTyping={isTyping}
								onChange={(e) => setInputText(e.target.value)}
								onKeyPress={handleKeyPress}
								onSend={handleSendMessage}
							/>
						</>
					)}
				</div>
			)}
		</>
	);
}
