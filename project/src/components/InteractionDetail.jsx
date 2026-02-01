import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getInteractionDetails } from '../services/mockData';
import {
    ArrowLeft, BrainCircuit, Sparkles, AlertCircle,
    CheckCircle2, Clock, Calendar, FileText
} from 'lucide-react';

const InteractionDetail = () => {
    const { id } = useParams();
    const data = getInteractionDetails(id);

    if (!data) return <div>Interaction not found</div>;

    return (
        <div className="animate-fade-in max-w-5xl mx-auto pb-12">
            <Link to={`/hcps/${data.hcp_id}`} className="mb-6 inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                <ArrowLeft size={18} className="mr-2" /> Back to HCP Profile
            </Link>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Interaction Analysis</h1>
                    <p className="text-gray-500 flex items-center gap-3">
                        <span className="font-semibold text-gray-900">{data.hcpName}</span>
                        <span>•</span>
                        <span className="capitalize">{data.interaction_type.replace('-', ' ')}</span>
                        <span>•</span>
                        <span>{data.interaction_date}</span>
                    </p>
                </div>
                <div className={`badge ${data.status === 'approved' ? 'badge-green' : 'badge-yellow'}`}>
                    {data.status}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content: Raw & Extracted */}
                <div className="lg:col-span-2 space-y-6">
                    {/* AI Analysis Card */}
                    <div className="card border-indigo-100 shadow-md">
                        <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-indigo-900 font-bold">
                                <Sparkles size={20} className="text-indigo-600" />
                                AI Extraction Layer
                            </div>
                            <div className="text-xs text-indigo-400 font-mono">
                                Model: {data.aiData?.llm_model_used || 'N/A'}
                            </div>
                        </div>

                        <div className="p-6 grid gap-6">
                            {/* Key Points */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Extracted Key Points</h4>
                                <div className="flex flex-wrap gap-2">
                                    {data.aiData?.extracted_fields?.key_points.map((point, i) => (
                                        <span key={i} className="bg-white border border-indigo-200 text-indigo-800 px-3 py-1.5 rounded-lg text-sm shadow-sm">
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Sentiment & Mood */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">HCP Mood</h4>
                                    <p className="text-lg font-semibold text-slate-700">{data.aiData?.extracted_fields?.hcp_mood}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Confidence Score</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="grow h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500" style={{ width: `${(data.ai_confidence_score || 0) * 100}%` }}></div>
                                        </div>
                                        <span className="font-bold text-slate-700">{Math.round((data.ai_confidence_score || 0) * 100)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transcript / Raw Input */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <FileText size={20} className="text-gray-400" /> Source Input
                        </h3>
                        <div className="p-4 bg-gray-50 rounded-lg text-gray-700 leading-relaxed font-serif italic border-l-4 border-gray-300">
                            "{data.aiData?.raw_input || data.summary}"
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-right">Processed in {data.aiData?.processing_time_ms}ms</p>
                    </div>
                </div>

                {/* Sidebar: Actions & Metadata */}
                <div className="space-y-6">
                    {/* Follow Up Actions */}
                    <div className="card">
                        <div className="p-4 border-b border-gray-100 font-bold flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-600" /> Suggested Actions
                        </div>
                        <div className="divide-y divide-gray-100">
                            {data.aiData?.follow_up_actions?.map((action, i) => (
                                <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-sm font-semibold capitalize bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                            {action.action.replace('_', ' ')}
                                        </span>
                                        {action.priority === 'urgent' && <AlertCircle size={14} className="text-red-500" />}
                                    </div>
                                    <p className="text-sm text-gray-800 mb-2">{action.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-red-500 font-medium">
                                        <Clock size={12} /> Due: {action.deadline}
                                    </div>
                                </div>
                            ))}
                            {!data.aiData?.follow_up_actions?.length && (
                                <div className="p-4 text-sm text-gray-400 text-center">No actions detected.</div>
                            )}
                        </div>
                        <div className="p-2 border-t border-gray-100">
                            <button className="w-full btn btn-ghost text-primary text-sm">Add Manual Action</button>
                        </div>
                    </div>

                    {/* Context */}
                    <div className="card p-5 space-y-4">
                        <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Related Context</h3>

                        {data.resolvedProducts.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold mb-2">Products</p>
                                <div className="flex flex-wrap gap-2">
                                    {data.resolvedProducts.map(p => (
                                        <span key={p.id} className="badge badge-blue">{p.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.resolvedTopics.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold mb-2">Topics</p>
                                <div className="flex flex-wrap gap-2">
                                    {data.resolvedTopics.map(t => (
                                        <span key={t.id} className="text-xs border border-gray-200 px-2 py-1 rounded text-gray-600">
                                            {t.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InteractionDetail;
