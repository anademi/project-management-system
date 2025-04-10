import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BOARDS_ROUTE, ISSUES_ROUTE, INDEX_ROUTE, ITEM_ROUTE } from './constants/routes';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { BoardsPage } from './pages/BoardsPage';
import { IssuesPage } from './pages/IssuesPage';
import { ItemPage } from './pages/ItemPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Layout } from './components/common/Layout';


const navRoutes = [
  {
    path: INDEX_ROUTE,
    element: <Navigate to={BOARDS_ROUTE} />,
  },
  {
    path: BOARDS_ROUTE,
    element: <BoardsPage />,
  },
  {
    path: ISSUES_ROUTE,
    element: <IssuesPage />,
  },
  {
    path: ITEM_ROUTE + "/:id",
    element: <ItemPage />,
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
