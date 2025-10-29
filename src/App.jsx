import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import Dashboard from './components/Dashboard.jsx';
import ConfigEditor from './components/ConfigEditor.jsx';
import Workspace from './components/Workspace.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'config' && <ConfigEditor />}
      {currentView === 'workspace' && <Workspace initialTab="plugins" />}
      {currentView === 'proofs' && <Workspace initialTab="proof" />}
    </Layout>
  );
}
