import PostIdPage from "../pages/PostIdPage";
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import Log from "../pages/Log";

export const privatRoutes = [
  {path: '/about', element: <About/>},
  {path: '/posts', element: <Posts/>},
  {path: '/posts/:id', element: <PostIdPage/>},
];

export const publicRoutes = [
  {path: '/login', element: <Log/>}
]