import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HCPCreationChat from './HCPCreationChat';

const CreateHCP = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialty: '',
        npiNumber: '',
        licenseNumber: '',
        hospitalAffiliation: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('HCP Created:', formData);
        // Simulate API call
        alert('HCP Created Successfully!');
        navigate('/hcps');
    };

    return (
        <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/hcps')}
                        className="p-2 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Register New HCP</h1>
                        <p className="text-sm text-gray-500">Add a new healthcare professional to the database.</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
                >
                    <Save size={18} /> Save Record
                </button>
            </div>

            {/* Split Layout */}
            <div className="flex gap-6 h-full pb-4">
                {/* Left Side - Form */}
                <div className="w-[60%] bg-white rounded-xl shadow-sm border border-gray-200 h-full overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Professional Information</h2>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. John"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Doe"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Specialty</label>
                                <select
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Specialty...</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Oncology">Oncology</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Dermatology">Dermatology</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="General Practice">General Practice</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">NPI Number</label>
                                <input
                                    type="text"
                                    name="npiNumber"
                                    value={formData.npiNumber}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="10-digit NPI"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Hospital / Clinic Affiliation</label>
                            <input
                                type="text"
                                name="hospitalAffiliation"
                                value={formData.hospitalAffiliation}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. City General Hospital"
                            />
                        </div>

                        <h2 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2 mt-8">Contact Details</h2>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="john.doe@hospital.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123 Medical Center Dr"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Zip Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - AI Assistant */}
                <div className="w-[40%] h-full">
                    <HCPCreationChat />
                </div>
            </div>
        </div>
    );
};

export default CreateHCP;
