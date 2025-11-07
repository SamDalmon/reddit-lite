import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsSelector, detailFailedSelector, detailLoadingSelector, fetchPostDetail, thumbnailSelector, titleSelector } from "./PostDetailSlice";
import { useParams } from "react-router-dom";
import Comment from "../../Components/Comment";

export default function PostDetail(){
  const { subreddit, id } = useParams();
  const dispatch = useDispatch();
  const title = useSelector(titleSelector);
  const thumbnail = useSelector(thumbnailSelector);
  const comments = useSelector(commentsSelector);
  const postLoading = useSelector(detailLoadingSelector);
  const loadFailed = useSelector(detailFailedSelector);

  const style = {
    backgroundColor: '#CCCCCC',
    margin: '10px 40px',
    padding: '10px',
    border: '2px solid orange',
    borderRadius: '4px'
  };

  useEffect(()=>{
    dispatch(fetchPostDetail({subreddit, id}))
  }, [dispatch, id, subreddit]);

  function content() {
    if(postLoading){
      return (
        <>
          <div style={style}>
            <h1>Loading...</h1>
          </div>
          <div style={style}>
            <p>Loading...</p>
          </div>
        </>
      )
    } else if (loadFailed){
      return (
        <>
          <div style={style}>
            <h1>Load Error!!!</h1>
          </div>
          <div style={style}>
            <p>Load Error!!!</p>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div style={style}>
            <h1>{title}</h1>
            <img src={thumbnail} alt={title}/>
          </div>
          <div style={style}>
            <div>
              {comments.map((comment) => {
                  if(comment.data.author){
                    return (<Comment 
                      key={comment.data.id}
                      author={comment.data.author}
                      body={comment.data.body}
                      replies={comment.data.replies}
                    />)
                  } else { return <></>}
                })
              }
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      {content()}
    </>
  );
}