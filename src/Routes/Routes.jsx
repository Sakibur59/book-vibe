import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import Books from "../Pages/Books/Books";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import BookDetails from "../Pages/BookDetails/BookDetails";
import PagesToRead from "../Components/PagesToRead/PagesToRead";

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
    {
        path:"/bookDetails/:bookId",
        Component:BookDetails,
        loader:()=>fetch('/booksData.json')
    },{
        path:"/page-to-read",
        Component:PagesToRead 
    }
],
    errorElement:<ErrorPage></ErrorPage>
  },
]);