import React from "react";
import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from "./Components/Root.js"
import Home from "./Components/Home.js";
import PostDetail from "./Features/PostDetail/PostDetail.js";
import SearchResults from "./Features/SearchResults/SearchResults.js";
import CategoryResults from "./Features/CategoryResults/CategoryResults.js";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root /> }> 
    <Route index element={ <Home /> }/>
    <Route path="/post/:category" element={ <CategoryResults /> }/>
    <Route path="/post/:subreddit/:id" element={ <PostDetail /> }/>
    <Route path="/search" element={<SearchResults />}/>
  </Route>
  
))

function App() {
  return (
    <RouterProvider router={ router }/>
  );
}

export default App;
