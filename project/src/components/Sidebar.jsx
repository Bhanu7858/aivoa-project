import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Users,
    LayoutDashboard,
    CalendarDays,
    Settings,
    Activity
} from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="p-6 flex items-center gap-3 border-b border-gray-100">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    AI
                </div>
                <span className="font-bold text-xl text-slate-800">PharmaCRM</span>
            </div>

            <nav className="flex-1 py-6 space-y-1">
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/hcps" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Users size={20} />
                    <span>HCPs</span>
                </NavLink>
                <NavLink to="/interactions" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <CalendarDays size={20} />
                    <span>Interactions</span>
                </NavLink>
                <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Activity size={20} />
                    <span>Insights</span>
                </NavLink>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <NavLink to="/settings" className="nav-item">
                    <Settings size={20} />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
