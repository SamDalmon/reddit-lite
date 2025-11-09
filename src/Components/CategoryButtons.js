import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categorySelector } from "../Features/CategoryResults/CatergoriesResultsSlice";

export default function CategoryButtons(){
  const navigate = useNavigate();
  const category = useSelector(categorySelector);

  const [categories] = useState([
    {text: "Cute", value:"cute", selected: false},
    {text: "Funny", value:"funny", selected: false},
    {text: "Politics", value:"politics", selected: false},
    {text: "Baking", value:"Baking", selected: false},
  ])

  useEffect(()=>{
    categories.forEach((categoryObject, i)=>{
      categories[i].selected = categoryObject.value === category;
    })
  },[categories, category])

  function handleClick(category) {
    navigate(`/post/${category}`);
  }

  return (
    <div style={{display: "flex"}}>
      {categories.map((category) => {
        const color = category.selected ? "blue": "gray";
        return (
          <button 
            style={{backgroundColor: color}}
            onClick={(e)=> handleClick(category.value)}
          >
            {category.text}
          </button>)
      })}
    </div>
  )
}