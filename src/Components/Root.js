import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"
import PostList from "../Features/Posts/PostList";

export default function Root() {
    return (
        <>
          <Header />
          <main>
            <PostList/>
            <Outlet/>
          </main>
        </>
    )
}