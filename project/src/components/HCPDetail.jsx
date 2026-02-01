import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHCPDetails } from '../services/mockData';
import { Calendar, Clock, ChevronRight, Activity, Mail, Phone, Video, MapPin, Building } from 'lucide-react';

const HCPDetail = () => {
    const { id } = useParams();
    const hcp = getHCPDetails(id);

    if (!hcp) return <div>HCP not found</div>;

    const getIcon = (type) => {
        switch (type) {
            case 'in-person': return <Building size={16} />;
            case 'video-call': return <Video size={16} />;
            case 'phone-call': return <Phone size={16} />;
            default: return <Mail size={16} />;
        }
    };

    return (
        <div className="animate-fade-in pb-10">
            {/* Header Profile */}
            <div className="card mb-8">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="px-8 pb-8">
                    <div className="flex justify-between items-end -mt-10 mb-6">
                        <div className={`w-24 h-24 rounded-2xl border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold ${hcp.avatarColor} bg-white`}>
                            {hcp.initials}
                        </div>
                        <div className="flex gap-3">
                            <button className="btn btn-ghost border border-gray-200 bg-white">Edit Profile</button>
                            <Link to="/interactions/log" className="btn btn-primary text-white hover:text-white no-underline">+ Log Interaction</Link>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-2">{hcp.name}</h1>
                        <div className="flex flex-wrap gap-6 text-gray-500">
                            <span className="flex items-center gap-2"><Activity size={18} className="text-blue-500" /> {hcp.specialty}</span>
                            <span className="flex items-center gap-2"><Building size={18} /> {hcp.hospital_affiliation}</span>
                            <span className="flex items-center gap-2"><MapPin size={18} /> {hcp.city}, {hcp.state}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Interaction Timeline */}
                <div className="col-span-2 space-y-6" style={{ gridColumn: 'span 2' }}>
                    <h2 className="text-xl font-bold mb-4">Interaction History</h2>

                    {hcp.interactions.length === 0 ? (
                        <div className="card p-8 text-center text-gray-500">No interactions recorded.</div>
                    ) : (
                        <div className="space-y-4">
                            {hcp.interactions.map(interaction => (
                                <Link to={`/interactions/${interaction.id}`} key={interaction.id} className="block group">
                                    <div className="card p-5 hover:border-blue-400 transition-all flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {getIcon(interaction.interaction_type)}
                                            </div>
                                            <div className="h-full w-0.5 bg-gray-100 my-2"></div>
                                        </div>
                                        <div className="grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-bold text-gray-900">{interaction.interaction_type.replace('-', ' ').toUpperCase()}</p>
                                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                                        <Calendar size={14} /> {interaction.interaction_date} · <Clock size={14} /> {interaction.duration_minutes} min
                                                    </p>
                                                </div>
                                                <div className={`badge ${interaction.outcome === 'positive' ? 'badge-green' : interaction.outcome === 'negative' ? 'badge-red' : 'badge-gray'}`}>
                                                    {interaction.outcome}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 mb-3">{interaction.summary}</p>

                                            {interaction.ai_confidence_score && (
                                                <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded w-fit">
                                                    <Activity size={12} />
                                                    AI Confidence: {Math.round(interaction.ai_confidence_score * 100)}%
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center text-gray-300 group-hover:text-blue-500">
                                            <ChevronRight />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4">Contact Info</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Email</label>
                                <p className="text-blue-600">{hcp.email}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Phone</label>
                                <p>{hcp.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-indigo-900 to-blue-900 text-white border-none">
                        <h3 className="font-bold text-lg mb-2">AI Insight</h3>
                        <p className="opacity-90 text-sm mb-4">
                            Dr. Kumar responds best to clinical data presented on tablet devices. Avoid scheduling on Mondays.
                        </p>
                        <div className="h-1 w-full bg-white/20 rounded overflow-hidden">
                            <div className="h-full bg-green-400 w-3/4"></div>
                        </div>
                        <p className="text-xs mt-2 opacity-75">Engagement Score: 75/100</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HCPDetail;
