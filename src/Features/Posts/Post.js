import React from "react";

export default function Post({post}){
  const style = {
    backgroundColor: '#CCCCCC',
    margin: '10px 40px',
    padding: '10px',
    border: '2px solid orange',
    borderRadius: '4px'
  };

  return (
    <div style={style} key={post.id}>
      <h2>{post.title}</h2>
      <img src={post.thumbnail} alt={post.title}/>
    </div>
  )
}