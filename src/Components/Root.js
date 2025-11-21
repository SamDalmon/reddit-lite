import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./Components.css";

export default function Root() {
    return (
        <div>
          <Header />
          <Outlet className="page"/>
        </div>
    )
}