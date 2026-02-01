import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const HCPCreationChat = () => {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I can help you fill out this profile. Try specific commands like 'Look up Dr. Smith in Boston' or 'Find NPI number'.", sender: 'ai' }
    ]);

    const SUGGESTED_QUERIES = [
        "Find NPI for Dr. John Doe",
        "Lookup hospital affiliation",
        "Verify medical license"
    ];

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        const newMsg = { id: Date.now(), text: text, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let responseText = "I've noted that. I'm scanning public registries for matches...";

            if (text.toLowerCase().includes("npi")) {
                responseText = "Found NPI Record: 1234567890. Verified for Cardiology.";
            } else if (text.toLowerCase().includes("hospital") || text.toLowerCase().includes("affiliation")) {
                responseText = "I found Dr. Doe affiliated with 'General Hospital' and 'City Medical Center'. Shall I auto-fill?";
            } else if (text.toLowerCase().includes("license")) {
                responseText = "Medical License #MD-555-0123 is ACTIVE in State of NY. Expires 2025.";
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: responseText,
                sender: 'ai'
            }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Sparkles size={16} />
                </div>
                <div>
                    <h3 className="font-bold text-sm text-gray-800">Registration Assistant</h3>
                    <p className="text-xs text-gray-500">AI-powered autofill & validation</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-blue-100 text-blue-600'}`}>
                            {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${msg.sender === 'user' ? 'bg-gray-800 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <Bot size={16} className="text-blue-600" />
                        </div>
                        <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-500 text-sm flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Suggested Queries */}
            <div className="px-4 py-2 bg-gray-50/50 flex gap-2 overflow-x-auto no-scrollbar">
                {SUGGESTED_QUERIES.map((q, i) => (
                    <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="whitespace-nowrap px-3 py-1 bg-white border border-blue-200 text-blue-600 text-xs rounded-full hover:bg-blue-50 transition-colors"
                    >
                        {q}
                    </button>
                ))}
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ask AI to find details..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                        onClick={() => handleSend()}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HCPCreationChat;
