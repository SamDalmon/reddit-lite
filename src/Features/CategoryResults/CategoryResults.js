import React, { useEffect } from "react";
import { fetchCategoriesResults, postsErrorSelector, postsLoadingSelector, postsSelector, setCategory } from "./CatergoriesResultsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../Components/Post.js";

export default function CategoryResults(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  dispatch(setCategory(category));

  const posts = useSelector(postsSelector)
  const loadingPosts = useSelector(postsLoadingSelector);
  const failedLoadingPosts = useSelector(postsErrorSelector);

  useEffect(()=>{
    dispatch(fetchCategoriesResults(category));
  }, [dispatch, category]);
  
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