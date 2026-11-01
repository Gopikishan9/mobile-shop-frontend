# Mobile Shop Frontend

A mobile shop e-commerce frontend built with **React + Vite**. It talks to a Spring Boot REST API with JWT authentication and has a separate admin area for managing products.

**Backend repo:** [mobile-shop-backend](https://github.com/Gopikishan9/mobile-shop-backend)

## Features

- Home page with image slider, categories and offers
- Product listing, categorized products and product details with specifications
- Search, Offers, About and Contact pages
- 404 page for unknown routes
- Auth context for login state, plus CSRF and API service helpers
- Admin dashboard for product management

### Status

| Area | Status |
|------|--------|
| Home, Products, Categorized Products, Product Details | Done |
| Login / authentication integration | Done |
| Admin dashboard integration | Done |
| Deployment | Planned |

## Tech Stack

- React
- Vite
- React Router
- Context API
- Plain CSS

## Project Structure

```
src/
├── admin/        # Admin dashboard
├── auth/         # Login
├── components/   # Navbar, Footer, ProductCard, CategoryCard, OfferCard, Search, ...
├── pages/        # Home, Products, CategorizedProducts, ProductDetails, Offers, About, Contact, PageNotFound
├── services/     # AuthContext, api.js, csrf.js
├── user/         # User page
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- The [backend](https://github.com/Gopikishan9/mobile-shop-backend) running locally on port 8080

### Installation

```bash
git clone https://github.com/Gopikishan9/mobile-shop-frontend.git
cd mobile-shop-frontend
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, use `copy .env.example .env` instead of `cp`.

The app runs at `http://localhost:5173` by default.

### Environment Variables

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:8080
```

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL of the Mobile Shop backend API |

## Available Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Screenshots

_Coming soon._

## Roadmap

- [ ] Finish login authentication integration
- [ ] Integrate admin dashboard with product APIs
- [ ] Deploy backend and frontend

## Author



**Gopikishan Rawat**

GitHub: [@gopikishan9](https://github.com/gopikishan9)

