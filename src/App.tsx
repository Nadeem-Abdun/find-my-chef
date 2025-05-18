import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { Skeleton } from '@/components/ui/skeleton';

const HomePage = lazy(() => import('@/pages/Home'));
const ChefsListPage = lazy(() => import('@/pages/Chefs/ChefsList'));
const ChefDetailPage = lazy(() => import('@/pages/Chefs/ChefDetail'));
const JobsListPage = lazy(() => import('@/pages/Jobs/JobsList'));
const JobDetailPage = lazy(() => import('@/pages/Jobs/JobDetail'));
const JobNewPage = lazy(() => import('@/pages/Jobs/JobNew'));
const LoginPage = lazy(() => import('@/pages/Auth/Login'));
const RegisterPage = lazy(() => import('@/pages/Auth/Register'));
const DashboardPage = lazy(() => import('@/pages/Dashboard'));
const AboutPage = lazy(() => import('@/pages/About'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

function PageLoader() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="mb-4 h-12 w-2/3" />
      <Skeleton className="mb-8 h-6 w-1/2" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-56 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
        { path: 'chefs', element: <Suspense fallback={<PageLoader />}><ChefsListPage /></Suspense> },
        { path: 'chefs/:id', element: <Suspense fallback={<PageLoader />}><ChefDetailPage /></Suspense> },
        { path: 'jobs', element: <Suspense fallback={<PageLoader />}><JobsListPage /></Suspense> },
        { path: 'jobs/new', element: <Suspense fallback={<PageLoader />}><JobNewPage /></Suspense> },
        { path: 'jobs/:id', element: <Suspense fallback={<PageLoader />}><JobDetailPage /></Suspense> },
        { path: 'login', element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense> },
        { path: 'register', element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense> },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <DashboardPage />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        { path: 'about', element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense> },
        { path: 'contact', element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
        { path: '*', element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors closeButton position="top-right" />
    </>
  );
}
