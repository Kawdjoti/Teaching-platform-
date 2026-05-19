import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import PracticeLabPage from './pages/PracticeLabPage';
import TutorialPage from './pages/TutorialPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="lessons" element={<TutorialPage />} />
            <Route path="practice" element={<PracticeLabPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="quiz" element={<QuizPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

