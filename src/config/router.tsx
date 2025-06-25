import { Suspense, lazy, createElement } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import NotFound from '../modules/core/components/not-found';
import type { NavItem } from '../models/NavItem';
import LoaderTransition from '../modules/core/components/loader-transition';
import Home from '../modules/home/Home';
import Movies from '../modules/movies/Movies';

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
            <Home />
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
