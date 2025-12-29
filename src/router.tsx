import { App } from "./App";
import { createBrowserRouter } from "react-router";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CreatePostPage } from "./pages/CreatePost";
import { ViewPostPage } from "./pages/ViewPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/posts/new",
    element: <CreatePostPage />,
  },
  {
    path: "/posts/:id",
    element: <ViewPostPage />,
  },
]);
