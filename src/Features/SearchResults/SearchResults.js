import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import Post from "../../Components/Post.js"
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSearchResults, postsErrorSelector, postsLoadingSelector, postsSelector } from "./SearchResultsSlice.js";

export default function SearchResults(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingPosts = useSelector(postsLoadingSelector);
  const failedLoadingPosts = useSelector(postsErrorSelector)
  const posts = useSelector(postsSelector)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const searchTerm = queryParams.get('query')
  

  useEffect(()=>{
    dispatch(fetchSearchResults(searchTerm));
  }, [dispatch, searchTerm]);

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