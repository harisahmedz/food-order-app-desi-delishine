import { useEffect, useState } from "react";


import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import MenuTypes from "./MenuTypes";



const Menu = (props) => {
  const Meals = props.MealsData;
  const [selectedType, setSelectedType] =useState("BreakFast");
  const [selectedMeals, setSelectedMeals] =  useState([]);
  useEffect(()=>{
    setSelectedMeals(Meals.filter((item)=>(item.type ===selectedType)));
  
  },[selectedType, Meals]);
  const selectedTypeHandler =(value)=>{
    setSelectedType(value.title);
    console.log(value);
  }
  const Content = selectedMeals.length>0? (selectedMeals.map((item) => (
      <MenuItem key={item.id} mItem={item} />
    ))): (props.error ? <p>{props.error}</p>: "No Items Available")
  
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>
        Our <b>Menu</b>
      </h2>
      <MenuTypes onSelection ={selectedTypeHandler}/>
      <div className={classes.flexContainer}>
        {
          
          props.Loading?"Loading...":Content
        }
      </div>
    </div>
  );
};

export default Menu;
