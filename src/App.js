import React from "react";
import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from "./Components/Root.js"
import Home from "./Components/Home.js";
import PostDetail from "./Features/PostDetail/PostDetail.js";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root /> }> 
    <Route index element={ <Home /> }/>
    <Route path="/post/:subreddit/:id" element={ <PostDetail /> }/>
  </Route>
  
))

function App() {
  return (
    <RouterProvider router={ router }/>
  );
}

export default App;
