import React, { useEffect, useState } from "react";
import useHttp from "./component/hooks/use-http";


import Cart from "./component/Cart/Cart";
import CoverSection from "./component/Layout/CoverSection";
import Footer from "./component/Layout/Footer";
import Header from "./component/Layout/Header";
import Menu from "./component/Menu/Menu";
//import InsertMeal from './component/Admin/InsertMeal';

function App() {
  const {isLoading, error, sendRequest} = useHttp();

  const [meals, setMeals] = useState([]);
  const [showCart, setShowCart]= useState(false);
  const showCartHandler = ()=>{
    console.log("Cart Show");
    setShowCart(true);
  }
  const HideCartHandler=()=>{
    setShowCart(false);
  }
  useEffect(()=>{
    const requestConfiq={
      url:"Meals.json",
    }
    const getMeals = (mealObj)=>{
      const LoadedMeals = [];
      for(const mealKey in mealObj){
        LoadedMeals.push({
          id:mealKey, 
          Mealname: mealObj[mealKey].Mealname,
          description:mealObj[mealKey].description,
          price: mealObj[mealKey].price,
          type: mealObj[mealKey].type,
          imgSrc: mealObj[mealKey].imgSrc,
        })
      }
      setMeals(LoadedMeals); 
    }
    sendRequest(requestConfiq, getMeals);
  },[sendRequest])
  const newMealHandler= (MealData)=>{
    setMeals(prevMeal => prevMeal.concat(MealData));
  }
 
  return (
    <React.Fragment>
      {showCart && <Cart onClose={HideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <CoverSection/>
      {/* <InsertMeal onAddMeal={newMealHandler}/> */}
      <Menu MealsData={meals} Loading={isLoading} error={error} />
      <Footer/>
    </React.Fragment>
  );
}

export default App;
