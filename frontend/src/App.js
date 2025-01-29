import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import HomePage from './pages/HomePage';
import PhotoshootPage from "./pages/PhotoshootPage";
import NewPhotoshootPage from "./pages/NewPhotoshootPage"; // ✅ Import new page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photoshoot/:photoshootID" element={<PhotoshootPage />} />
          <Route path="/new-photoshoot" element={<NewPhotoshootPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
