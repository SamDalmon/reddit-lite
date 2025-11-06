import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPostDetail } from "./PostDetailSlice";
import { useParams } from "react-router-dom";

export default function PostDetail(){
  const { subreddit, id } = useParams();

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchPostDetail({subreddit, id}))
  }, [dispatch, id, subreddit]);

  return (
    <>
      <h1>Title</h1>
    </>
  );
}