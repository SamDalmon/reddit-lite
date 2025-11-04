import React from "react";
import redditLogo from "../reddit-logo.png";

export default function Header(){
  const imageStyle = {
    width: '100px',
    height: '100px'
  }
  
  return (
    <div style={{display: 'flex'}}>
      <img style={imageStyle} src={redditLogo} alt="Reddit Logo"></img>
      <h1>Reddit</h1>
    </div>
  )
}