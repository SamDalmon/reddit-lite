import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { categorySelector } from "../Features/CategoryResults/CatergoriesResultsSlice";
import categoryList from "../res/categoryList";

export default function CategoryButtons(){
  const navigate = useNavigate();
  const { category } = useParams();

  const [categories, setCategories ] = useState(
    categoryList.map((category)=>{
      return {...category, selected: false};
    })
  )

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
            key={category.text}
            style={{backgroundColor: color}}
            onClick={(e)=> handleClick(category.value)}
          >
            {category.text}
          </button>)
      })}
    </div>
  )
}