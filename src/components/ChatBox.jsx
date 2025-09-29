import React, { useState, useRef, useEffect } from 'react';
import {
	Send,
	Bot,
	User,
	Sparkles,
	Mic,
	Paperclip,
	X,
	MessageCircle,
	Minimize2
} from 'lucide-react';

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
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = async () => {
		if (!inputText.trim()) return;

		const userMessage = {
			id: Date.now(),
			text: inputText,
			sender: 'user',
			timestamp: new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			})
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputText('');
		setIsTyping(true);

		// Simulate AI response
		setTimeout(() => {
			const aiResponses = [
				"That's an interesting question! Let me help you with that.",
				"I understand what you're looking for. Here's what I think...",
				"Great point! Based on what you've shared, I'd suggest...",
				"I'm here to help! Let me break this down for you.",
				"That's a thoughtful question. From my perspective...",
				"I can definitely assist with that. Here's my recommendation..."
			];

			const aiMessage = {
				id: Date.now() + 1,
				text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
				sender: 'ai',
				timestamp: new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit'
				})
			};

			setMessages((prev) => [...prev, aiMessage]);
			setIsTyping(false);
		}, 1500);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const toggleChat = () => {
		setIsOpen(!isOpen);
		setIsMinimized(false);
	};

	const minimizeChat = () => {
		setIsMinimized(true);
	};

	const TypingIndicator = () => (
		<div className="animate-fade-in mb-4 flex items-start space-x-3">
			<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
				<Bot className="h-3 w-3 text-white" />
			</div>
			<div className="max-w-xs rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
				<div className="flex space-x-1">
					<div
						className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
						style={{ animationDelay: '0ms' }}
					></div>
					<div
						className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
						style={{ animationDelay: '150ms' }}
					></div>
					<div
						className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
						style={{ animationDelay: '300ms' }}
					></div>
				</div>
			</div>
		</div>
	);

	return (
		<>
			{/* Chat Toggle Button */}
			{!isOpen && (
				<div className={`group fixed right-8 bottom-8 z-50 flex items-center`}>
					<button
						onClick={toggleChat}
						className="group relative h-20 w-20 cursor-pointer rounded-full bg-gradient-to-br from-[#396131] via-[#4a7c3a] to-[#31542B] shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95"
						aria-label="Open AI Chat Assistant"
					>
						{/* Tooltip - only shows when button is hovered */}
						<span className="pointer-events-none absolute right-full mr-4 origin-right translate-x-2 scale-95 rounded-lg bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-[#396131] opacity-0 shadow-lg transition-all duration-200 select-none group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
							Chat with our AI Assistant
						</span>

						{/* Animated green dot */}
						<span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60"></span>
							<span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>
						</span>

						{/* Animated icon */}
						<span className="flex h-full w-full items-center justify-center">
							<MessageCircle className="animate-bounce-slow group-hover:animate-bounce-fast h-10 w-10 text-white drop-shadow-lg" />
						</span>
					</button>
					{/* Hover message */}
				</div>
			)}
			{isOpen && (
				<div
					className={`fixed right-6 bottom-6 z-50 flex w-96 flex-col rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
						isMinimized ? 'h-16' : 'h-[600px]'
					}`}
				>
					{/* Header */}
					<div className="flex flex-shrink-0 items-center justify-between rounded-t-2xl bg-[#396131] px-4 py-3 text-white">
						<div className="flex items-center space-x-3">
							<div className="relative">
								<div className="bg-opacity-20 flex h-8 w-8 items-center justify-center rounded-full bg-white">
									<Sparkles className="h-4 w-4" />
								</div>
								<div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
							</div>
							<div>
								<h3 className="text-sm font-semibold">AI Assistant</h3>
								<p className="text-xs opacity-90">Online</p>
							</div>
						</div>
						<div className="flex items-center space-x-1">
							<button
								onClick={minimizeChat}
								className="hover:bg-opacity-20 cursor-pointer rounded-full p-1.5 transition-colors hover:bg-white hover:text-[#396131]"
							>
								<Minimize2 className="h-4 w-4" />
							</button>
							<button
								onClick={toggleChat}
								className="hover:bg-opacity-20 cursor-pointer rounded-full p-1.5 transition-colors hover:bg-white hover:text-[#396131]"
							>
								<X className="h-4 w-4" />
							</button>
						</div>
					</div>

					{!isMinimized && (
						<>
							{/* Messages */}
							<div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
								{messages.map((message) => (
									<div
										key={message.id}
										className={`animate-fade-in flex items-start space-x-2 ${
											message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
										}`}
									>
										<div className="flex-shrink-0">
											{message.sender === 'ai' ? (
												<div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900">
													<Bot className="h-3 w-3 text-white" />
												</div>
											) : (
												<div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-600">
													<User className="h-3 w-3 text-white" />
												</div>
											)}
										</div>
										<div
											className={`max-w-[240px] ${message.sender === 'user' ? 'text-right' : ''}`}
										>
											<div
												className={`rounded-2xl px-3 py-2 text-sm ${
													message.sender === 'ai'
														? 'rounded-tl-sm bg-gray-100 text-gray-800'
														: 'rounded-tr-sm bg-[#396131] text-white'
												}`}
											>
												<p className="leading-relaxed">{message.text}</p>
											</div>
											<p
												className={`mt-1 text-xs text-gray-500 ${
													message.sender === 'user' ? 'text-right' : ''
												}`}
											>
												{message.timestamp}
											</p>
										</div>
									</div>
								))}

								{isTyping && <TypingIndicator />}
								<div ref={messagesEndRef} />
							</div>

							{/* Input Area */}
							<div className="flex-shrink-0 border-t border-gray-200 p-4">
								<div className="mb-3 flex items-center space-x-2">
									<div className="relative flex flex-1">
										<textarea
											ref={inputRef}
											value={inputText}
											onChange={(e) => setInputText(e.target.value)}
											onKeyPress={handleKeyPress}
											placeholder="Type your message..."
											className="w-full resize-none rounded-xl border-0 bg-gray-100 px-3 py-2 pr-10 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
											rows={1}
											style={{ minHeight: '36px', maxHeight: '80px' }}
										/>
										<button className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full p-1 text-gray-500 transition-colors hover:text-gray-700">
											<Mic className="h-4 w-4" />
										</button>
									</div>

									<button
										onClick={handleSendMessage}
										disabled={!inputText.trim() || isTyping}
										className="transform rounded-full bg-[#396131] p-2 text-white transition-all hover:scale-105 hover:bg-[#31542B] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
									>
										<Send className="h-4 w-4" />
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
}
