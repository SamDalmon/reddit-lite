import React, {useEffect} from "react";
import { fetchPostList, postsLoadingSelector, postsSelector, postsErrorSelector } from "./PostListSlice.js";
import { useDispatch, useSelector } from "react-redux"
import Post from "../../Components/Post.js"
import { useNavigate } from "react-router-dom";

export default function PostList(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(postsSelector);
  const loadingPosts = useSelector(postsLoadingSelector);
  const failedLoadingPosts = useSelector(postsErrorSelector)
  

  useEffect(()=>{
    dispatch(fetchPostList());
  }, [dispatch]);

  function handleClick(subreddit, id){
    navigate(`/post/${subreddit}/${id}`);
  }

  function content() {
    if(loadingPosts){
      return (<h1>Loading...</h1>);
    } else if (failedLoadingPosts){
      return (<h1>Load Error!!!</h1>);
    } else {
      return posts.map(({data})=> (<Post post={data} handleClick={handleClick}/>) )
    }
  }

  return (
    <div>
      {content()}
    </div>
  )
}