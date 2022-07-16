import { useContext } from "react";
import CartContext from "../../Store/cartContext";
import classes from "./MenuItem.module.css";


const MenuItem = (props) => {
  const CartCtx = useContext(CartContext);

  const addtoCartHandler = ()=>{
    CartCtx.addItems({
      id:props.mItem.id,
      name:props.mItem.Mealname,
      amount:1,
      price: props.mItem.price
    });
 
  }
  return (
    <>
      <div className={classes.container}>
        <div className={classes.ImageArea}>
          <img
            src={props.mItem.imgSrc}
            alt={props.mItem.Mealname}
          />
    
          
        </div>

        <div className={classes.TextualArea}>
          <h2>{props.mItem.Mealname}</h2>
          <p>
            {props.mItem.description}
          </p>
          <div className={classes.price}>Rs.{props.mItem.price}</div>
          <button className={classes.add} onClick={addtoCartHandler}>+</button>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
