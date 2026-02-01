import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HCPList from './components/HCPList';
import HCPDetail from './components/HCPDetail';
import CreateHCP from './components/CreateHCP';
import InteractionLog from './components/InteractionLog';
import InteractionDetail from './components/InteractionDetail';

import { Provider } from 'react-redux';
import { store } from './store/store';
import LogInteractionPage from './components/Interaction/LogInteractionPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="main-content bg-slate-50">
            <Routes>
              {/* Dashboard Redirect */}
              <Route path="/" element={<Navigate to="/hcps" replace />} />

              {/* HCP Routes */}
              <Route path="/hcps" element={<HCPList />} />
              <Route path="/hcps/new" element={<CreateHCP />} />
              <Route path="/hcps/:id" element={<HCPDetail />} />

              {/* Interaction Routes */}
              <Route path="/interactions" element={<InteractionLog />} />
              <Route path="/interactions/log" element={<LogInteractionPage />} />
              <Route path="/interactions/:id" element={<InteractionDetail />} />

              {/* Future placeholder routes */}
              <Route path="/analytics" element={<div className="p-8 text-center text-gray-500">Analytics Module Coming Soon</div>} />
              <Route path="/settings" element={<div className="p-8 text-center text-gray-500">Settings Module Coming Soon</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
