import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { ALL_BOARDS_ROUTE, ISSUES_ROUTE, INDEX_ROUTE, BOARD_ROUTE } from './constants/routes';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import './style.css'

import { AllBoardsPage } from './pages/AllBoardsPage';
import { IssuesPage } from './pages/IssuesPage';
import { BoardPage } from './pages/BoardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Layout } from './components/common/Layout';


const navRoutes = [
  {
    path: INDEX_ROUTE,
    element: <Navigate to={ALL_BOARDS_ROUTE} />,
  },
  {
    path: ALL_BOARDS_ROUTE,
    element: <AllBoardsPage />,
  },
  {
    path: ISSUES_ROUTE,
    element: <IssuesPage />,
  },
  {
    path: BOARD_ROUTE + "/:id",
    element: <BoardPage />,
  },
];

const allRoutes = [
  {
    element: <Layout />,
    children: navRoutes,
    errorElement: <NotFoundPage />,
  },
];

const routes = createBrowserRouter(allRoutes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
