import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"
import PostList from "../Features/PostList/PostList";

export default function Root() {
    return (
        <>
          <Header />
          <Outlet />
        </>
    )
}