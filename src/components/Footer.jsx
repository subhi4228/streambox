import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#070709] border-t border-zinc-900 text-zinc-400 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top row with Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 via-pink-600 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
                  <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[9px] border-l-rose-500 ml-0.5" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                STREAM<span className="text-rose-500">BOX</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Explore thousands of television shows, top-rated series, and acclaimed cast details in ultra-high definition.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Browse
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/trending" className="hover:text-white transition-colors">Popular Shows</Link></li>
              <li><Link to="/top-rated" className="hover:text-white transition-colors">Top Rated</Link></li>
              <li><Link to="/my-list" className="hover:text-white transition-colors">My Watchlist</Link></li>
            </ul>
          </div>

          {/* Genres */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Genres
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li><Link to="/drama" className="hover:text-white transition-colors">Drama & Stories</Link></li>
              <li><Link to="/comedy" className="hover:text-white transition-colors">Comedy & Laughs</Link></li>
              <li><Link to="/action" className="hover:text-white transition-colors">Action & Adrenaline</Link></li>
              <li><Link to="/thriller" className="hover:text-white transition-colors">Thriller & Suspense</Link></li>
              <li><Link to="/sci-fi" className="hover:text-white transition-colors">Sci-Fi & Future</Link></li>
            </ul>
          </div>

          {/* TVMaze Attribution & Notes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Data Source
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Data and television imagery powered by the free <a href="https://www.tvmaze.com/api" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white underline">TVMaze API</a> (no API key required).
            </p>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
                HashRouter • GitHub Pages Ready
              </span>
            </div>
          </div>

        </div>

        {/* Bottom divider and copyright */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} StreamBox. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with React, Vite & Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
