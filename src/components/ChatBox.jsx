import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Mic,
  Paperclip,
  X,
  MessageCircle,
  Minimize2,
} from "lucide-react";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're looking for. Here's what I think...",
        "Great point! Based on what you've shared, I'd suggest...",
        "I'm here to help! Let me break this down for you.",
        "That's a thoughtful question. From my perspective...",
        "I can definitely assist with that. Here's my recommendation...",
      ];

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
    <div className="flex items-start space-x-3 mb-4 animate-fade-in">
      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <Bot className="w-3 h-3 text-white" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 max-w-xs">
        <div className="flex space-x-1">
          <div
            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#31542B] text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 active:scale-95 z-50 cursor-pointer"
        >
          <MessageCircle className="w-6 h-6 mx-auto" />
        </button>
      )}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl transition-all duration-300 z-50 flex flex-col ${
            isMinimized ? "h-16" : "h-[600px]"
          }`}
        >
          {/* Header */}
          <div className="bg-[#396131] text-white px-4 py-3 rounded-t-2xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Assistant</h3>
                <p className="text-xs opacity-90">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={minimizeChat}
                className="p-1.5 hover:bg-white hover:text-[#396131] hover:bg-opacity-20 rounded-full transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={toggleChat}
                className="p-1.5 hover:bg-white hover:text-[#396131] hover:bg-opacity-20 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 animate-fade-in ${
                      message.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {message.sender === "ai" ? (
                        <div className="w-6 h-6 bg-emerald-900 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`max-w-[240px] ${
                        message.sender === "user" ? "text-right" : ""
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-3 py-2 text-sm ${
                          message.sender === "ai"
                            ? "bg-gray-100 rounded-tl-sm text-gray-800"
                            : "bg-[#396131] text-white rounded-tr-sm"
                        }`}
                      >
                        <p className="leading-relaxed">{message.text}</p>
                      </div>
                      <p
                        className={`text-xs text-gray-500 mt-1 ${
                          message.sender === "user" ? "text-right" : ""
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
              <div className="border-t border-gray-200 p-4 flex-shrink-0">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full px-3 py-2 pr-10 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none text-sm"
                      rows={1}
                      style={{ minHeight: "36px", maxHeight: "80px" }}
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 rounded-full transition-colors">
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="p-2 bg-[#396131] text-white rounded-full hover:bg-[#31542B] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
