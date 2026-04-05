import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import Books from "../Pages/Books/Books";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

 export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [{
        index:true,
        Component:HomePage,
    },
    {
        path:'/books',
        element:<Books></Books>
    },
],
    errorElement:<ErrorPage></ErrorPage>
  },
]);