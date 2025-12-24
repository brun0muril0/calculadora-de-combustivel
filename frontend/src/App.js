import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Layout/Header';
import Calculator from './pages/Calculator';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <main className="flex-1">
          <Router>
            <Routes>
              <Route path="/" element={<Calculator />} />
            </Routes>
          </Router>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;