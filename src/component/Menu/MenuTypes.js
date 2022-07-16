import { useState } from "react";

import classes from "./MenuTypes.module.css";

const Menu = [
  { id: 1, title: "BreakFast" },
  { id: 2, title: "Biryani & Pulao" },
  { id: 3, title: "Indian Curries" },
  { id: 4, title: "Chinese" },
  { id: 5, title: "Karhai" },
  { id: 6, title: "Daal" },
];

const MenuTypes = (props) => {
  const [types, setType] = useState({
    activeObject: Menu[0],
    objects: Menu,
  });

  const activeBtnHandler = (index) => {
      setType({...types, activeObject:types.objects[index]});
      props.onSelection(types.objects[index]);
  };
  const toggleActiveClass = (index)=>{
    if(types.objects[index]===types.activeObject){
        
        return `${classes.btn} ${classes.currentBtn}`;
        
    }
    else{
        return `${classes.btn}`
    }
  }
   return (
    <div className={classes.Container}>
      {types.objects.map((type, index) => (
        <button
          key={index}
          className={toggleActiveClass(index)}
          onClick={()=>{activeBtnHandler(index)}}
        >
          {type.title}
        </button>
      ))}
    </div>
  );
};
export default MenuTypes;
