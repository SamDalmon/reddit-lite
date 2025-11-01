import React from "react";
import redditLogo from "../reddit-logo.png";

export default function Header(){
  return (
    <>
      <img src={redditLogo} alt="Reddit Logo"></img>
      <h1>Reddit</h1>
    </>
  )
}