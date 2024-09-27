import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import StartRoute from "./views/start.tsx";
import CreateListRoute from "./views/create-list.tsx";
import ViewListRoute from "./views/view-list.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <StartRoute /> },
  { path: "/create", element: <CreateListRoute /> },
  { path: "/list/:listId", element: <ViewListRoute /> },
  { path: "/list/:listId/:submissionId", element: <ViewListRoute /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
