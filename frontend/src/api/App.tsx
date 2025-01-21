import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Equipment from './Equipment';
import MeetingRoom from './MeetingRoom';
import RepairRequests from './RepairRequests';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <li><a href="/equipment">Equipment</a></li>
            <li><a href="/meeting-room">Meeting Rooms</a></li>
            <li><a href="/repair-requests">Repair Requests</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/meeting-room" element={<MeetingRoom />} />
          <Route path="/repair-requests" element={<RepairRequests />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
