import React from "react";
import redditLogo from "../reddit-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { searchTermSelector } from "../Features/SearchResults/SearchResultsSlice";
import { setSearchTerm } from "../Features/SearchResults/SearchResultsSlice";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CategoryButtons from "./CategoryButtons";
import { setCategory } from "../Features/CategoryResults/CatergoriesResultsSlice";

function Header(){
  const navigate = useNavigate()
  const searchTerm = useSelector(searchTermSelector);
  const dispatch = useDispatch();

  const imageStyle = {
    width: '100px',
    height: '100px'
  }
  
  function homeClick(){
    dispatch(setCategory(""));
    dispatch(setSearchTerm(""));
    navigate(`/`);
  }

  function handleSearchClick(){
    dispatch(setCategory(""));
    if(searchTerm){
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/');
    }
  }

  return (
    <div style={{padding: "0px 10px"}}>
      <div style={{display: 'flex'}}>
        <img 
          style={imageStyle} 
          src={redditLogo} 
          alt="Reddit Logo"
          onClick={homeClick}></img>
        <h1>Reddit Lite</h1>
      </div>
      <div style={{display: "flex", padding: '10px'}}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm}
          onChange={(e)=>dispatch(setSearchTerm(e.target.value))}
        />
        <FaSearch 
          onClick={handleSearchClick}
          data-testid="searchButton"
        />
        <FaTimes 
          onClick={homeClick}
          data-testid="crossButton"
        />
      </div>
      <CategoryButtons />
    </div>
  )
}

export default Header;