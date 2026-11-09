# StreamBox 🎬🍿

StreamBox is a modern, responsive streaming site UI built with **React 18**, **Vite**, and **Tailwind CSS**. It is powered by the **TVMaze API (https://api.tvmaze.com)**, delivering live trending television series, genre rows, detailed show information, cast metadata, and instant search—**with zero API keys required**.

---

## ✨ Features

- **Hero Banner**: Spotlight banner featuring top television series from `https://api.tvmaze.com/shows` with high-resolution imagery, ratings, premiere year, synopsis, and quick action buttons.
- **Genre Rows (Built by Filtering the Shows List)**:
  - 🎭 **Drama & Masterpieces**
  - 😄 **Comedy & Laughs**
  - ⚡ **Action & Adrenaline**
  - 💀 **Thriller & Suspense**
  - ✨ **Sci-Fi & Future Worlds**
  - Smooth horizontal carousel controls with left/right scroll arrows and touch support.
- **Show Poster Cards**: Fluid scale-up hover animation with quick details trigger, user rating badges, release year, and watchlist toggles.
- **Show Details Modal**:
  - Full show metadata: premiere date, runtime, genres, user rating, synopsis, and network/web channel.
  - Top cast members and character names embedded from TVMaze.
  - Official site link, watchlist bookmarking, and link sharing.
  - Accessible: close via ESC key, backdrop click, or close button.
- **Sticky Navbar**: Transitions seamlessly from transparent gradient to solid glassmorphism (`backdrop-blur-md`) on scroll, with quick search and TVMaze live indicator.
- **Live Search**: Instant debounced search querying `https://api.tvmaze.com/search/shows?q=` with genre filters and quick keyword chips.
- **My Watchlist**: Save favorite shows locally using browser `localStorage`.
- **Zero API Key Requirement**: Fully powered by the public TVMaze API out-of-the-box.
- **Dark Cinema Theme & Responsive**: Sleek cinema palette (rich dark obsidian, subtle borders, neon rose/indigo accents) optimized for mobile, tablet, and desktop screens.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+) installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
The static build will be output to `dist/`, ready to deploy to GitHub Pages, Netlify, Vercel, or any static host.

---

## 📁 Project Structure

```
streambox/
├── .env                      # Environment config (No API key needed)
├── .env.example              # Example environment config
├── .gitignore                # Git exclusions
├── index.html                # Entry HTML with custom font and favicon
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Custom cinema theme & animations
├── vite.config.js            # Vite config with base: './'
└── src/
    ├── main.jsx              # Application root
    ├── App.jsx               # HashRouter and routing setup
    ├── index.css             # Tailwind directives and custom scrollbars
    ├── components/
    │   ├── Navbar.jsx        # Sticky navbar with TVMaze live indicator
    │   ├── HeroBanner.jsx    # Featured show spotlight from TVMaze
    │   ├── MovieRow.jsx      # Horizontal scrolling carousel
    │   ├── MovieCard.jsx     # Show poster card with hover overlay
    │   ├── MovieModal.jsx    # Modal with image, summary, rating, genres & cast
    │   └── Footer.jsx        # StreamBox footer and TVMaze attribution
    ├── context/
    │   ├── MovieModalContext.jsx  # Global modal state
    │   └── WatchlistContext.jsx   # LocalStorage watchlist state
    ├── pages/
    │   ├── Home.jsx          # Hero banner + filtered genre rows (Drama, Comedy, Action, Thriller, Sci-Fi)
    │   ├── Search.jsx        # Live search using https://api.tvmaze.com/search/shows?q=
    │   ├── MyList.jsx        # Saved watchlist shows
    │   └── CategoryPage.jsx  # Filtered view with sorting options
    └── services/
        ├── tvmaze.js         # TVMaze API client (shows, genre filtering, search, details)
        └── mockData.js       # Curated TVMaze fallback dataset for offline/fallback safety
```
