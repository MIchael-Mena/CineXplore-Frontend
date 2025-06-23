import React from 'react';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import Layout from "@/layouts/Layout";

export interface NavItems {
  name: string;
  path: string;
}


const navItems: NavItems[] = [
  {name: 'Login', path: '/login'},
  {name: 'MoviesFromAdmin', path: '/movies'},
  {name: 'MoviesFromUser', path: '/movies'}
];

const Login = React.lazy(() => import('../pages/Login'));


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {path: '', element: <Navigate to="/login"/>},
      {
        path: '/login',
        element: (
          <Login/>
        ),
        caseSensitive: true,
      },
      {
        path: '*', element: <div>
          <h1>404 - Page Not Found</h1>
        </div>
      },
    ],
  },
]);

export {router, navItems};
