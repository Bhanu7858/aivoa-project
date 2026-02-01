import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, Filter } from 'lucide-react';
import { interactions, hcps } from '../services/mockData';

const InteractionLog = () => {
    // Join interactions with HCP data for display
    const enrichedInteractions = interactions.map(i => {
        const hcp = hcps.find(h => h.id === i.hcp_id);
        return { ...i, hcpName: hcp ? hcp.name : 'Unknown' };
    });

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Interaction Log</h1>
                    <p className="text-gray-500">History of all field engagement.</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-ghost border border-gray-200 bg-white shadow-sm">
                        <Filter size={18} /> Filters
                    </button>
                    <Link to="/interactions/log" className="btn btn-primary text-white hover:text-white no-underline">
                        + Log New
                    </Link>
                </div>
            </div>

            <div className="card">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 text-sm border-b border-gray-100">
                            <th className="p-4 font-medium uppercase text-xs tracking-wider">Date</th>
                            <th className="p-4 font-medium uppercase text-xs tracking-wider">HCP</th>
                            <th className="p-4 font-medium uppercase text-xs tracking-wider">Type</th>
                            <th className="p-4 font-medium uppercase text-xs tracking-wider">Summary</th>
                            <th className="p-4 font-medium uppercase text-xs tracking-wider">Mood</th>
                            <th className="p-4 font-medium uppercase text-xs tracking-wider">Status</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {enrichedInteractions.map(interaction => (
                            <tr key={interaction.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-gray-600 w-32">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar size={14} />
                                        {interaction.interaction_date}
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-slate-700">
                                    {interaction.hcpName}
                                </td>
                                <td className="p-4">
                                    <span className="capitalize text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                        {interaction.interaction_type}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500 max-w-xs truncate">
                                    {interaction.summary}
                                </td>
                                <td className="p-4">
                                    <span className={`text-xs font-semibold px-2 py-1 rounded 
                                        ${interaction.outcome === 'positive' ? 'bg-green-100 text-green-700' :
                                            interaction.outcome === 'negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {interaction.ai_sentiment || interaction.outcome}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`badge 
                                        ${interaction.status === 'approved' ? 'badge-blue' :
                                            interaction.status === 'draft' ? 'badge-gray' : 'badge-yellow'}`}>
                                        {interaction.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <Link to={`/interactions/${interaction.id}`} className="btn btn-ghost text-primary text-sm p-1 px-3">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InteractionLog;
