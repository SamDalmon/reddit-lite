import React from "react";
import redditLogo from "../reddit-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { searchTermSelector } from "../Features/SearchResults/SearchResultsSlice";
import { setSearchTerm } from "../Features/SearchResults/SearchResultsSlice";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CategoryButtons from "./CategoryButtons";

export default function Header(){
  const navigate = useNavigate()
  const searchTerm = useSelector(searchTermSelector);
  const dispatch = useDispatch();

  const imageStyle = {
    width: '100px',
    height: '100px'
  }
  
  function handleClick(){
    console.log(`handle click ${searchTerm}`);
    if(searchTerm){
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/');
    }
  }

  return (
    <div style={{padding: "0px 10px"}}>
      <div style={{display: 'flex'}}>
        <img style={imageStyle} src={redditLogo} alt="Reddit Logo"></img>
        <h1>Reddit</h1>
      </div>
      <div style={{display: "flex", padding: '10px'}}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm}
          onChange={(e)=>dispatch(setSearchTerm(e.target.value))}
        />
        <FaSearch onClick={handleClick}/>
        <FaTimes 
          onClick={()=>{
            dispatch(setSearchTerm(""));
            navigate('/');
          }}
        />
      </div>
      <CategoryButtons />
    </div>
  )
}