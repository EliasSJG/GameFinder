# 🎮 GameFinder

**GameFinder** is a website for discovering games. You can search for any game, view detailed information, add games to your favorites, wishlist, or played list, and even submit reviews. The site also provides statistics about the games you’ve played.

---

## 🛠️ Tech Stack

* React
* TypeScript
* Sass
* React Router
* Context API
* IGDB API (via Twitch)

---

## 📁 Project Structure

```
📁 src  
├── 📁 assets  
├── 📁 components  
│   ├── 📁 background  
│   ├── 📁 bestGames  
│   ├── 📁 button  
│   ├── 📁 footer  
│   ├── 📁 generalGames  
│   ├── 📁 header  
│   ├── 📁 hero  
│   ├── 📁 modal  
│   │   └── 📁 numberInput  
│   ├── 📁 search  
│   └── 📁 toast  
├── 📁 context  
├── 📁 hooks  
├── 📁 layout  
├── 📁 pages  
│   ├── 📁 detailPage  
│   ├── 📁 fullFirstPage  
│   ├── 📁 SearchResult  
│   ├── 📁 statisticPage  
│   └── 📁 generalStatistics  
├── 📁 styles  
│   ├── 📁 abstract  
│   └── 📁 base  
├── 📁 types  
└── 📁 utilities  
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/GameFinder.git
cd GameFinder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root and add the following:

```env
VITE_TWITCH_CLIENT_ID=your_client_id
VITE_TWITCH_CLIENT_SECRET=your_client_secret
```

---

## 📄 License

This project is licensed under the MIT License
