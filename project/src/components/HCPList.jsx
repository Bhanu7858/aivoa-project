import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, ArrowRight } from 'lucide-react';
import { hcps } from '../services/mockData';

const HCPList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredHCPs = hcps.filter(hcp =>
        hcp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hcp.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Healthcare Professionals</h1>
                    <p className="text-gray-500">Manage your network of doctors and specialists.</p>
                </div>
                <Link to="/hcps/new" className="btn btn-primary">
                    + Add New HCP
                </Link>
            </div>

            <div className="card p-4 mb-6 flex items-center gap-4">
                <Search className="text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search by name or specialty..."
                    className="grow outline-none text-sm bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {filteredHCPs.map(hcp => (
                    <Link key={hcp.id} to={`/hcps/${hcp.id}`} className="block">
                        <div className="card p-6 h-full hover:border-blue-300 transition-colors">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`${hcp.avatarColor} w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg`}>
                                    {hcp.initials}
                                </div>
                                <span className={`badge ${hcp.status === 'active' ? 'badge-green' : 'badge-gray'}`}>
                                    {hcp.status}
                                </span>
                            </div>

                            <h3 className="font-bold text-lg mb-1">{hcp.name}</h3>
                            <p className="text-blue-600 font-medium text-sm mb-4">{hcp.specialty}</p>

                            <div className="space-y-2 text-sm text-gray-500 mb-6">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{hcp.hospital_affiliation}, {hcp.city}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} />
                                    <span>{hcp.phone}</span>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                                    View Profile <ArrowRight size={16} />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HCPList;
