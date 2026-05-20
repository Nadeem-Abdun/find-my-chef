# Find My Chef

A frontend-only showcase of a niche job portal connecting chefs with restaurants, hotels, cloud kitchens, cafes and food outlets across India.

> Live: https://Nadeem-Abdun.github.io/find-my-chef/

## Tech stack

- **Build**: Vite 6 + TypeScript 5.7
- **UI**: React 19, Tailwind CSS 4, shadcn/ui (new-york style), Radix primitives, lucide-react icons
- **Fonts**: Inter (UI) + Fraunces Variable (display)
- **State**: Redux Toolkit + redux-persist (selective whitelist)
- **Forms**: react-hook-form + zod
- **Carousel**: embla-carousel-react (via shadcn `Carousel`)
- **Notifications**: sonner
- **Quality**: ESLint 9 (flat config), Prettier 3, Husky + lint-staged
- **Tests**: Vitest + @testing-library/react

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Demo accounts

| Email             | Password   | Role  |
| ----------------- | ---------- | ----- |
| `owner@demo.com`  | `demo1234` | owner |
| `chef@demo.com`   | `demo1234` | chef  |

## Scripts

| Command           | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Vite dev server with HMR (port 5173)                 |
| `npm run build`   | Type-check + production build to `dist/`             |
| `npm run preview` | Preview the production build locally                 |
| `npm run lint`    | ESLint across `src/`                                 |
| `npm run lint:fix`| ESLint with auto-fix                                 |
| `npm run format`  | Prettier write across the repo                       |
| `npm run test`    | Vitest                                               |
| `npm run type-check` | `tsc --noEmit` only                              |

## Architecture overview

### Data layer (frontend-only)

```
src/data/seed/        Pure typed seed arrays (chefs, jobs, categories, …)
src/services/mockApi/ Promise-based API stubs with simulated latency
src/store/slices/     Redux Toolkit slices using createAsyncThunk
src/store/selectors/  Memoized selectors via reselect
src/store/persist.ts  redux-persist whitelist (auth, jobs.userItems, applications, favorites, ui)
```

User-generated data (registrations, posted jobs, applications, saved items) is persisted to `localStorage` and survives full page reloads.

To clear all client data, click **Reset demo data** in the footer.

### Routing

- Wrapped in `<MainLayout />` (`Header`, `<Outlet />`, `Footer`) with `ScrollRestoration`.
- Lazy-loaded routes via `React.lazy` + `Suspense`.
- `BrowserRouter` `basename` is set to `import.meta.env.BASE_URL` so dev (`/`) and prod (`/find-my-chef/`) both work.
- Protected `/dashboard` route via `ProtectedRoute`.

### Theming

`ThemeProvider` toggles `data-theme="dark"` on `<html>`. CSS variables in `src/index.css` define the **Bistro** palette (sage + burnt amber on warm cream / espresso). Tailwind 4's `@theme inline` block maps them to design tokens consumed by shadcn components.

### Mobile

- Mobile-first layout, `react-responsive` for finer logic, sheet-based mobile nav and filter drawers.
- Safe-area insets and `prefers-reduced-motion` respected.

## Deployment to GitHub Pages

1. Push to `main` — GitHub Actions runs `.github/workflows/deploy.yml`:
   - `npm ci → npm run lint → npm run build`
   - Uploads `dist/` as a Pages artifact
   - Deploys via `actions/deploy-pages@v4`
2. In your repo settings: **Pages → Build and deployment → Source = GitHub Actions**.
3. SPA deep-link fallback: `public/404.html` uses the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) trick to bounce deep URLs back through `index.html` (already wired in `index.html`).

If you fork or rename the repo, update:
- `homepage` in `package.json`
- `base` in `vite.config.ts` (`'/<repo-name>/'`)
- `pathSegmentsToKeep` in `public/404.html` (likely stays at `1`)

## Folder structure

```
src/
  components/
    ui/         shadcn primitives
    common/     Container, SectionTitle, EmptyState, Logo, ThemeToggle, ProtectedRoute, ErrorBoundary
    features/   Banner, ChefCard, JobCard, CategoryGrid, PlatformDemo, Testimonials, Filters
    layout/     Header, Footer, MainLayout
  pages/        Home, Chefs (list/detail), Jobs (list/detail/new), Auth (login/register), Dashboard, About, Contact, NotFound
  data/seed/    Typed seed arrays
  services/mockApi/  chefsApi, jobsApi, authApi, applicationsApi, contactApi
  store/        Slices, selectors, persist config
  hooks/        useBreakpoint, useDebounce, useAuth
  lib/          utils.ts (cn), format.ts (currency/time)
  theme/        ThemeProvider, tokens
  types/        Domain types
  test/         Vitest setup + a few tests
```

## License

MIT — feel free to use any of this as a starting point.
