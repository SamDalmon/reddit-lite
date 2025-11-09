import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { categorySelector } from "../Features/CategoryResults/CatergoriesResultsSlice";

export default function CategoryButtons(){
  const navigate = useNavigate();
  const { category } = useParams();

  const [categories, setCategories ] = useState([
    {text: "Cute", value:"cute", selected: false},
    {text: "Funny", value:"funny", selected: false},
    {text: "Politics", value:"politics", selected: false},
    {text: "Baking", value:"Baking", selected: false},
  ])

  useEffect(()=>{
    setCategories(categories.map((categoryObject, i)=>{
      return {...categoryObject, selected: categoryObject.value === category};
    }))
  },[category])

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