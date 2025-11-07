import React from 'react';

export default function Comment({author, body, replies}){
  const style = {
    backgroundColor: '#CCCCCC',
    margin: '2px 2px',
    padding: '5px',
    border: '2px solid orange',
    borderRadius: '4px'
  };

  function replyList(){
    if (replies && replies !== ""){
      return replies.data.children.map(({data}) => {
        if(data.author && data.body){
          return <Comment
            key={data.id} 
            author={data.author}
            body={data.body}
            replies={data.replies}
          />
        }
      })
    } else {
      return
    }
  }

  return (
    <div style={style}>
      <h2>{author}</h2>
      <>{body}</>
      {replyList()}
    </div>
  )
}