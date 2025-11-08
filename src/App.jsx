// PATH FIX TEST
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Dashboard from './pages/Dashboard';
import ProtocolDiscovery from './pages/ProtocolDiscovery';
import Research from './pages/Research';
import ExpertQA from './pages/ExpertQA';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <Router>
      <AppShell currentPage={currentPage} setCurrentPage={setCurrentPage}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/protocols" element={<ProtocolDiscovery />} />
          <Route path="/research" element={<Research />} />
          <Route path="/qa" element={<ExpertQA />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;