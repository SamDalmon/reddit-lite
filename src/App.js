import React from "react";
import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from "./Components/Root.js"
import Home from "./Components/Home.js";
import Post from "./Components/Post.js";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root /> }> 
    <Route path="/home" element={ <Home /> }/>
    <Route path="/post/:id" element={ <Post /> }/>
  </Route>
  
))

function App() {
  return (
    <RouterProvider router={ router }/>
  );
}

export default App;
