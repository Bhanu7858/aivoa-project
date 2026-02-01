import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ChevronLeft, Mic, Send, Sparkles } from 'lucide-react';

const CreateHCP = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hcp_name: '',
        interaction_type: 'Meeting',
        date: '',
        time: '',
        attendees: '',
        topics_discussed: '',
        materials_shared: [],
        samples_distributed: [],
        sentiment: 'Neutral',
        outcomes: '',
        follow_up_actions: ''
    });

    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging HCP Interaction:', formData);
        navigate('/hcps');
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (chatMessage.trim()) {
            setChatHistory([...chatHistory, { type: 'user', message: chatMessage }]);
            setChatMessage('');
            // Simulate AI response
            setTimeout(() => {
                setChatHistory(prev => [...prev, {
                    type: 'ai',
                    message: 'I can help you log this interaction. What details would you like to add?'
                }]);
            }, 500);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/hcps')}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Log HCP Interaction</h1>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/hcps')}
                        className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2 shadow-sm transition-all"
                    >
                        <Save size={18} />
                        Save Interaction
                    </button>
                </div>
            </div>

            {/* Main Content - 50/50 Split */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Half: Form */}
                <div className="w-1/2 overflow-y-auto bg-gray-50 p-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <form onSubmit={handleSubmit}>
                            {/* Interaction Details */}
                            <div className="mb-8">
                                <h3 className="text-base font-semibold mb-4 text-gray-800 pb-2 border-b border-gray-100">
                                    Interaction Details
                                </h3>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">HCP Name</label>
                                        <input
                                            type="text"
                                            name="hcp_name"
                                            value={formData.hcp_name}
                                            onChange={handleChange}
                                            placeholder="Search or select HCP..."
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Interaction Type</label>
                                        <select
                                            name="interaction_type"
                                            value={formData.interaction_type}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                        >
                                            <option>Meeting</option>
                                            <option>Phone Call</option>
                                            <option>Email</option>
                                            <option>Conference</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Time</label>
                                        <input
                                            type="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Attendees</label>
                                    <input
                                        type="text"
                                        name="attendees"
                                        value={formData.attendees}
                                        onChange={handleChange}
                                        placeholder="Enter names or search..."
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Topics Discussed</label>
                                    <textarea
                                        name="topics_discussed"
                                        value={formData.topics_discussed}
                                        onChange={handleChange}
                                        placeholder="Enter key discussion points..."
                                        rows={4}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
                                    />
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mt-2"
                                    >
                                        <Mic size={16} />
                                        <span>Summarize from Voice Note (Requires Consent)</span>
                                    </button>
                                </div>
                            </div>

                            {/* Materials & Samples */}
                            <div className="mb-8">
                                <h3 className="text-base font-semibold mb-4 text-gray-800 pb-2 border-b border-gray-100">
                                    Materials Shared / Samples Distributed
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700">Materials Shared</label>
                                            <button
                                                type="button"
                                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                            >
                                                <span>🔍</span>
                                                Search/Add
                                            </button>
                                        </div>
                                        <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                                            <p className="text-sm text-gray-400 italic">No materials added.</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700">Samples Distributed</label>
                                            <button
                                                type="button"
                                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                            >
                                                <span>➕</span>
                                                Add Sample
                                            </button>
                                        </div>
                                        <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                                            <p className="text-sm text-gray-400 italic">No samples added.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sentiment */}
                            <div className="mb-8">
                                <h3 className="text-base font-semibold mb-4 text-gray-800 pb-2 border-b border-gray-100">
                                    Observed/Inferred HCP Sentiment
                                </h3>
                                <div className="flex gap-8">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="sentiment"
                                            value="Positive"
                                            checked={formData.sentiment === 'Positive'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 font-medium">😊 Positive</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="sentiment"
                                            value="Neutral"
                                            checked={formData.sentiment === 'Neutral'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 font-medium">😐 Neutral</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="sentiment"
                                            value="Negative"
                                            checked={formData.sentiment === 'Negative'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 font-medium">😟 Negative</span>
                                    </label>
                                </div>
                            </div>

                            {/* Outcomes */}
                            <div className="mb-8">
                                <h3 className="text-base font-semibold mb-4 text-gray-800 pb-2 border-b border-gray-100">
                                    Outcomes
                                </h3>
                                <textarea
                                    name="outcomes"
                                    value={formData.outcomes}
                                    onChange={handleChange}
                                    placeholder="Key outcomes or agreements..."
                                    rows={4}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
                                />
                            </div>

                            {/* Follow-up Actions */}
                            <div className="mb-4">
                                <h3 className="text-base font-semibold mb-4 text-gray-800 pb-2 border-b border-gray-100">
                                    Follow-up Actions
                                </h3>
                                <textarea
                                    name="follow_up_actions"
                                    value={formData.follow_up_actions}
                                    onChange={handleChange}
                                    placeholder="Enter next steps or tasks..."
                                    rows={4}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
                                />

                                <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
                                    <p className="text-sm font-semibold text-gray-800 mb-2">AI Suggested Follow-ups:</p>
                                    <ul className="space-y-1.5 text-sm text-blue-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-0.5">→</span>
                                            <span>Schedule follow-up meeting in 2 weeks</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-0.5">→</span>
                                            <span>Send OncoBoost Phase III PDF</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-0.5">→</span>
                                            <span>Add Dr. Sharma to advisory board invite list</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Half: AI Assistant */}
                <div className="w-1/2 bg-white border-l border-gray-200 flex flex-col">
                    {/* Chat Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                                <Sparkles size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900">AI Assistant</h3>
                                <p className="text-xs text-gray-600">Log interaction via chat</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 shadow-sm">
                            <p className="text-sm text-gray-800 leading-relaxed">
                                Log interaction details here (e.g., <span className="font-semibold">"Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure"</span>) or ask for help.
                            </p>
                        </div>

                        {chatHistory.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`rounded-lg p-4 text-sm shadow-sm animate-fade-in ${msg.type === 'user'
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-12'
                                        : 'bg-white text-gray-800 mr-12 border border-gray-200'
                                    }`}
                            >
                                {msg.message}
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-6 border-t border-gray-200 bg-white">
                        <form onSubmit={handleChatSubmit} className="flex gap-3">
                            <input
                                type="text"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                placeholder="Describe interaction..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-medium"
                            >
                                <Send size={18} />
                                <span>Log</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

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
        </div>
    );
};

export default CreateHCP;