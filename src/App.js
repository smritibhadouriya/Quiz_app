import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizApp from './Component/QuizApp';
import ResultsPage from './Component/ResultsPage'; // Import the ResultsPage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizApp />} />
        <Route path="/results" element={<ResultsPage />} /> {/* Add the route for ResultsPage */}
      </Routes>
    </Router>
  );
};

export default App;
