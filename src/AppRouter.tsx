// AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Movie from "./Movie";
import MovieDetail from "./MovieDetail";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Movie />} />
          <Route path="/movie/:imdbID" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
