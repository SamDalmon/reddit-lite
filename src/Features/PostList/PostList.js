import React, {useEffect} from "react";
import { fetchPostList, postsLoadingSelector, postsSelector, postsErrorSelector } from "./PostListSlice.js";
import { useDispatch, useSelector } from "react-redux"
import Post from "../../Components/Post.js"

export default function PostList(){
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector);
  const loadingPosts = useSelector(postsLoadingSelector);
  const failedLoadingPosts = useSelector(postsErrorSelector)
  

  useEffect(()=>{
    dispatch(fetchPostList());
  }, [dispatch]);

  function content() {
    if(loadingPosts){
      return (<h1>Loading...</h1>);
    } else if (failedLoadingPosts){
      return (<h1>Load Error!!!</h1>);
    } else {
      return posts.map(({data})=> (<Post post={data}/>) )
    }
  }

  console.log(posts)
  return (
    <div>
      {content()}
    </div>
  )
}