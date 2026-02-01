import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, setSentiment } from '../../store/interactionSlice';
import { Search, Mic, Plus, Paperclip, Package } from 'lucide-react';

const InteractionForm = () => {
    const dispatch = useDispatch();
    const { formData, aiSuggestions } = useSelector((state) => state.interaction);

    const handleChange = (field, value) => {
        dispatch(updateField({ field, value }));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full overflow-y-auto">
            <h2 className="text-lg font-bold mb-6 text-gray-800">Interaction Details</h2>

            <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">HCP Name</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2.5 pl-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Search or select HCP..."
                            value={formData.hcpName}
                            onChange={(e) => handleChange('hcpName', e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Interaction Type</label>
                    <select
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none bg-white"
                        value={formData.type}
                        onChange={(e) => handleChange('type', e.target.value)}
                    >
                        <option>Meeting</option>
                        <option>Call</option>
                        <option>Video Conference</option>
                        <option>Email</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date</label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Time</label>
                    <input
                        type="time"
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none"
                        value={formData.time}
                        onChange={(e) => handleChange('time', e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Attendees</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none"
                    placeholder="Enter names or search..."
                    value={formData.attendees}
                    onChange={(e) => handleChange('attendees', e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Topics Discussed</label>
                <div className="relative">
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none min-h-[80px] resize-none pr-10"
                        placeholder="Enter key discussion points..."
                        value={formData.topics}
                        onChange={(e) => handleChange('topics', e.target.value)}
                    />
                    <Mic className="absolute bottom-3 right-3 text-gray-400 hover:text-blue-500 cursor-pointer" size={18} />
                </div>
                <button className="mt-2 text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
                    <SparklesIcon size={14} /> Summarize from Voice Note (Requires Consent)
                </button>
            </div>

            {/* Materials & Samples */}
            <h3 className="text-sm font-bold text-gray-700 mb-3 border-b border-gray-100 pb-2">Materials Shared / Samples Distributed</h3>
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Materials Shared</label>
                    <button className="text-xs text-blue-600 flex items-center gap-1 hover:underline"><Search size={12} /> Search/Add</button>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-sm text-gray-400 text-center">
                    No materials added.
                </div>
            </div>
            <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Samples Distributed</label>
                    <button className="text-xs text-blue-600 flex items-center gap-1 hover:underline"><Plus size={12} /> Add Sample</button>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-sm text-gray-400 text-center">
                    No samples added.
                </div>
            </div>

            {/* Sentiment */}
            <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Observed/Inferred HCP Sentiment</label>
                <div className="flex gap-6">
                    {['Positive', 'Neutral', 'Negative'].map((s) => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="sentiment"
                                checked={formData.sentiment === s}
                                onChange={() => dispatch(setSentiment(s))}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-gray-700">{s}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Outcomes</label>
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none min-h-[60px] resize-none"
                    placeholder="Key outcomes or agreements..."
                    value={formData.outcomes}
                    onChange={(e) => handleChange('outcomes', e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Follow-up Actions</label>
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none min-h-[60px] resize-none"
                    placeholder="Enter next steps or tasks..."
                    value={formData.followUpActions}
                    onChange={(e) => handleChange('followUpActions', e.target.value)}
                />
            </div>

            <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">AI Suggested Follow-ups:</p>
                <ul className="space-y-1">
                    {aiSuggestions.map((suggestion, idx) => (
                        <li key={idx} className="text-sm text-blue-600 cursor-pointer hover:underline">
                            {suggestion}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const SparklesIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.93735 15.5L11 20.5L12.0627 15.5L17.0627 14.4373L12.0627 13.3747L11 8.37466L9.93735 13.3747L4.93735 14.4373L9.93735 15.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default InteractionForm;
