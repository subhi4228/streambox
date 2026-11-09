import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MovieModalProvider } from './context/MovieModalContext';
import { WatchlistProvider } from './context/WatchlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MovieModal from './components/MovieModal';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import MyList from './pages/MyList';
import CategoryPage from './pages/CategoryPage';

export default function App() {
  return (
    <HashRouter>
      <WatchlistProvider>
        <MovieModalProvider>
          <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-rose-500 selection:text-white">
            
            {/* Sticky Navbar that transitions to solid on scroll */}
            <Navbar />

            {/* Main Routes Content */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/drama" element={<CategoryPage categoryKey="drama" />} />
                <Route path="/comedy" element={<CategoryPage categoryKey="comedy" />} />
                <Route path="/action" element={<CategoryPage categoryKey="action" />} />
                <Route path="/thriller" element={<CategoryPage categoryKey="thriller" />} />
                <Route path="/sci-fi" element={<CategoryPage categoryKey="sci-fi" />} />
                <Route path="/trending" element={<CategoryPage categoryKey="trending" />} />
                <Route path="/top-rated" element={<CategoryPage categoryKey="top-rated" />} />
                <Route path="/horror" element={<CategoryPage categoryKey="thriller" />} />
                <Route path="/movies" element={<CategoryPage categoryKey="movies" />} />
                <Route path="/my-list" element={<MyList />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* StreamBox Footer */}
            <Footer />

            {/* Global Show Details Modal */}
            <MovieModal />

          </div>
        </MovieModalProvider>
      </WatchlistProvider>
    </HashRouter>
  );
}
