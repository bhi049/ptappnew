import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import CustomerList from './pages/CustomerList';
import TrainingList from './pages/TrainingList';
import CalendarPage from './pages/CalendarPage';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
