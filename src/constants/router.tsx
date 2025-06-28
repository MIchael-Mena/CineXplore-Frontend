import { Suspense, lazy, createElement } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import NotFound from '../components/common/not-found';
import type { NavItem } from '../models/NavItem';
import LoaderTransition from '../components/common/loader-transition';
import HomePage from '../pages/HomePage';
import Layout from '../components/layout/Layout';
import Movies from '../pages/MoviesPage';

const navItems: NavItem[] = [
  { name: 'Home', path: '/home' },
  { name: 'Movies', path: '/movies' },
];

/* const Home = lazy(() =>
  import('../modules/home/Home.tsx').catch((error) => {
    console.warn('Failed to load Home component:', error);
    return {
      default: () =>
        createElement('div', null, 'Failed to load Home component'),
    };
  })
);
const Movies = lazy(() =>
  import('../modules/movies/Movies.tsx').catch((error) => {
    console.warn('Failed to load Movies component:', error);
    return {
      default: () =>
        createElement('div', null, 'Failed to load Movies component'),
    };
  })
); */

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Navigate to="/home" /> },
      {
        path: '/home',
        element: (
          <Suspense fallback={<LoaderTransition />}>
            <HomePage />
          </Suspense>
        ),
        caseSensitive: false,
      },
      {
        path: '/movies',
        element: (
          <Suspense fallback={<LoaderTransition />}>
            <Movies />
          </Suspense>
        ),
        caseSensitive: false,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export { router, navItems };
