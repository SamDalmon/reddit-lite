import React, {useEffect} from "react";
import { fetchPostList, postsLoadingSelector, postsSelector, postsErrorSelector } from "./PostsSlice";
import { useDispatch, useSelector } from "react-redux"

export default function PostList(){
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector);
  const loadingPosts = useSelector(postsLoadingSelector);
  const failedLoadingPosts = useSelector(postsErrorSelector)
  

  useEffect(()=>{
    dispatch(fetchPostList());
    console.log("fetching posts");
  }, [dispatch]);

  function content() {
    if(loadingPosts){
      return (<h1>Loading...</h1>);
    } else if (failedLoadingPosts){
      return (<h1>Load Error!!!</h1>);
    } else {
      return (
      <h1>Posts: {JSON.stringify(posts)}</h1>
      )
    }
  }

  console.log(posts)
  return (
    <div>
      {content()}
    </div>
  )
}