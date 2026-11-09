# StreamBox 🎬🍿

**A modern, responsive TV streaming discovery platform built with React, Vite, and Tailwind CSS.**

🔗 **Live Demo:** [streambox-orpin.vercel.app](https://streambox-orpin.vercel.app)

StreamBox is a modern streaming website UI that allows users to explore television series, discover shows by genre, search for their favourites, view detailed show information, and maintain a personal watchlist.

Powered by the [TVMaze API](https://api.tvmaze.com), StreamBox provides live television show data without requiring any API keys.

---

## ✨ Features

### 🎬 Hero Banner
- Featured television shows with high-quality background images.
- Show ratings, premiere year, synopsis, and quick action buttons.
- Dynamic content powered by TVMaze.

### 🎭 Genre-Based Browsing
Explore television shows across different genres:
- Drama & Masterpieces
- Comedy & Laughs
- Action & Adrenaline
- Thriller & Suspense
- Sci-Fi & Future Worlds

- Smooth horizontal scrolling carousels.
- Left and right navigation controls.
- Touch-friendly browsing experience.

### 🍿 Show Cards
- Interactive show poster cards.
- Smooth hover and scale animations.
- Rating badges and release year.
- Quick details and watchlist options.

### 📖 Show Details
- Detailed show information, including genres, runtime, premiere date, and ratings.
- Show synopsis and network information.
- Cast members and character details.
- Official website links.
- Watchlist and sharing options.
- Accessible modal with multiple closing options.

### 🔍 Live Search
- Search television shows instantly.
- Debounced search functionality.
- Genre filtering.
- Quick keyword suggestions.
- Live results from the TVMaze API.

### ❤️ My Watchlist
- Save favourite television shows.
- Remove shows from your watchlist.
- Watchlist data stored using browser LocalStorage.
- Saved shows remain available after refreshing the page.

### 🎨 UI & Experience
- Dark cinema-inspired interface.
- Responsive design for desktop, tablet, and mobile.
- Sticky navigation bar.
- Glassmorphism effects and smooth transitions.
- Modern neon rose and indigo accents.

### ⚡ API Integration
- Powered by the public TVMaze API.
- No API key required.
- Live show information and cast metadata.
- Curated fallback dataset for API failure scenarios.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend development |
| Vite | Build tool |
| Tailwind CSS | Styling |
| JavaScript | Application functionality |
| React Router | Navigation |
| TVMaze API | Television show data |
| LocalStorage | Watchlist persistence |
| CSS | Custom animations |
| GitHub | Version control |
| Vercel | Deployment |

---

## 📁 Project Structure

```text
streambox/
│
├── .github/
│   └── workflows/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroBanner.jsx
│   │   ├── MovieRow.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieModal.jsx
│   │   └── Footer.jsx
│   │
│   ├── context/
│   │   ├── MovieModalContext.jsx
│   │   └── Watch
