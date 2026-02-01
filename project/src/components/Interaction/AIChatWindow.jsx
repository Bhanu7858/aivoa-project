import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../store/interactionSlice';
import { Send, Bot, User } from 'lucide-react';

const AIChatWindow = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const { chatMessages } = useSelector((state) => state.interaction);

    const handleSend = () => {
        if (!input.trim()) return;
        dispatch(addMessage(input));
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-full overflow-hidden font-sans">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                        <Bot size={18} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm">AI Assistant</h3>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            Online
                        </div>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    {/* Optional: Add menu/options icon here if needed */}
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white scroll-smooth">
                {chatMessages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Bot size={32} className="text-gray-300" />
                        </div>
                        <p className="text-sm">How can I help you with this interaction log?</p>
                    </div>
                )}

                {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender !== 'user' && (
                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 mt-1 shadow-sm text-white">
                                <Bot size={16} />
                            </div>
                        )}

                        <div className={`
                            group relative px-5 py-3.5 text-sm leading-relaxed max-w-[85%] shadow-sm
                            ${msg.sender === 'user'
                                ? 'bg-gray-100 text-gray-900 rounded-2xl rounded-tr-sm'
                                : 'bg-transparent border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm'}
                        `}>
                            {msg.text}
                        </div>

                        {msg.sender === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-sm text-white">
                                <User size={16} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white">
                <div className="relative shadow-sm rounded-xl border border-gray-200 bg-white focus-within:border-gray-400 focus-within:shadow-md transition-all duration-200">
                    <input
                        type="text"
                        className="w-full pl-4 pr-12 py-3.5 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
                        placeholder="Message AI Assistant..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className={`absolute right-2 bottom-2 p-1.5 rounded-lg transition-all
                            ${input.trim()
                                ? 'bg-black text-white hover:bg-gray-800'
                                : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                        onClick={handleSend}
                        disabled={!input.trim()}
                    >
                        <Send size={16} />
                    </button>
                </div>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-gray-400">AI can make mistakes. Consider checking important information.</p>
                </div>
            </div>
        </div>
    );
};

export default AIChatWindow;
