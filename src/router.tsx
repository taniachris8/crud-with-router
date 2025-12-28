import { createBrowserRouter } from "react-router";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CreatePostPage } from "./pages/CreatePost";
import { ViewPostPage } from "./pages/ViewPost";
import { Posts } from "./components/Posts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
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
