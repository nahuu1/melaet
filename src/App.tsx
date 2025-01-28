import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ProviderDashboard from './pages/ProviderDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;