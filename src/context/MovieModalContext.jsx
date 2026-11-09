import React, { createContext, useContext, useState, useCallback } from 'react';

const MovieModalContext = createContext();

export function MovieModalProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((movie) => {
    if (!movie) return;
    setSelectedMovie(movie);
    setIsOpen(true);
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedMovie(null);
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <MovieModalContext.Provider value={{ selectedMovie, isOpen, openModal, closeModal }}>
      {children}
    </MovieModalContext.Provider>
  );
}

export function useMovieModal() {
  const context = useContext(MovieModalContext);
  if (!context) {
    throw new Error('useMovieModal must be used within a MovieModalProvider');
  }
  return context;
}
