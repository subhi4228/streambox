import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection to switch to solid navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Drama', path: '/drama' },
    { name: 'Comedy', path: '/comedy' },
    { name: 'Action', path: '/action' },
    { name: 'Thriller', path: '/thriller' },
    { name: 'Sci-Fi', path: '/sci-fi' },
    { name: 'My List', path: '/my-list' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav-solid py-3'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-indigo-600 p-[1.5px] shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[11px] border-l-rose-500 ml-0.5 group-hover:border-l-pink-400 transition-colors" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight font-sans">
                <span className="text-white">STREAM</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">BOX</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-white/10 shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right actions: Search, TVMaze status pill, Mobile toggle */}
          <div className="flex items-center gap-3">
            
            {/* Inline Search Bar (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-zinc-900/90 border border-zinc-700/80 rounded-full px-3 py-1.5 shadow-inner">
                  <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search TV shows, series..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none w-48 lg:w-64"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1 text-zinc-400 hover:text-white transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Open search bar"
                  className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </form>

            {/* Direct Search Page Link for mobile */}
            <Link
              to="/search"
              aria-label="Go to Search"
              className="sm:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* TVMaze Live Indicator Pill (No API Key Required) */}
            <div
              title="Connected to free TVMaze API (No API key required)"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/40 border border-emerald-700/50 text-emerald-300 select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>TVMaze Live</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl md:hidden pt-20 px-6 pb-8 flex flex-col justify-between overflow-y-auto animate-fade-in">
          <div className="space-y-4">
            
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative mb-6">
              <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 shadow-lg">
                <Search className="w-5 h-5 text-zinc-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search shows, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none w-full"
                />
              </div>
            </form>

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-rose-600/20 text-rose-400 font-semibold border-l-4 border-rose-500'
                        : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Status in Mobile Menu */}
          <div className="pt-6 border-t border-zinc-800 space-y-3">
            <div className="w-full py-2.5 px-4 rounded-xl flex items-center justify-between text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>TVMaze API Connected</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                Live & Free
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 text-center">
              StreamBox • Data powered by TVMaze API
            </p>
          </div>
        </div>
      )}
    </>
  );
}
