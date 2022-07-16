import useInput from "../hooks/use-input";
import useHttp from "../hooks/use-http";

import classes from "./InsertMeal.module.css";


const InsertMeal = (props) => {
  const {isLoading, error, sendRequest} = useHttp();
  const CreateMeal = (MealData)=>{
    const generatedId = MealData.name;
    const createdMeal = {id: generatedId, ...MealData}
    props.onAddMeal(createdMeal)
  }
  const enterMealDataHandler = async(MealData)=>{
    const responseConfiq ={
      url: "Meals.json",
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      }, 

      body:{
        Mealname: enteredFoodName,
        description:enteredFoodDescription,
        price: enteredFoodPrice,
        type: selectedFoodCategory,
        imgSrc: enteredFoodImageUrl,
      }

    }
    sendRequest(responseConfiq,CreateMeal.bind(null, MealData));
  }

  const {
    value: enteredFoodName,
    isValid: enteredFoodNameIsValid,
    hasError: foodNameHasError,
    valueChangeHandler :foodNameChangeHandler,
    inputBlurHandler: foodNameBlurHandler,
    reset: resetFoodNameInput,
  } = useInput((value)=>value.trim()!=="");

  const {
    value: enteredFoodDescription,
    isValid: enteredFoodDescriptionIsValid,
    hasError: foodDescriptionHasError,
    valueChangeHandler :foodDescriptionChangeHandler,
    inputBlurHandler: foodDescriptionBlurHandler,
    reset: resetFoodDescriptionInput,
  } = useInput((value)=>value.trim()!=="");

  const {
    value: enteredFoodPrice,
    isValid: enteredFoodPriceIsValid,
    hasError: foodPriceHasError,
    valueChangeHandler :foodPriceChangeHandler,
    inputBlurHandler: foodPriceBlurHandler,
    reset: resetFoodPriceInput,
  } = useInput((value)=>(value>0));

  const {
    value: selectedFoodCategory,
    isValid: selectedFoodCategoryIsValid,
    hasError: foodCategoryHasError,
    valueChangeHandler : foodCategoryChangeHandler,
    inputBlurHandler: foodCategoryBlurHandler,
    reset: resetfoodCategoryInput,
  } = useInput((value)=>value.trim()!=="");

  const {
    value: enteredFoodImageUrl,
    isValid: enteredFoodImageUrlIsValid,
    hasError: foodImageUrlHasError,
    valueChangeHandler :foodImageUrlChangeHandler,
    inputBlurHandler: foodImageUrlBlurHandler,
    reset: resetFoodImageUrlInput,
  } = useInput((value)=>value.trim()!=="");

  let formIsValid = false;
  if(enteredFoodNameIsValid && selectedFoodCategoryIsValid && enteredFoodDescriptionIsValid && enteredFoodPriceIsValid && enteredFoodImageUrlIsValid){
    formIsValid = true;
  }
  const SubmitFormHandler = (event)=>{
    event.preventDefault();
    if(!enteredFoodNameIsValid || !selectedFoodCategoryIsValid || !enteredFoodDescriptionIsValid || !enteredFoodImageUrlIsValid || !enteredFoodPriceIsValid){
      return;
    }
    console.log(enteredFoodName,"\n", enteredFoodDescription, "\n",enteredFoodPrice, "\n", enteredFoodImageUrl, "\n", selectedFoodCategory );
    const MealData= {
      Mealname: enteredFoodName,
      description:enteredFoodDescription,
      price: enteredFoodPrice,
      type: selectedFoodCategory,
      imgSrc: enteredFoodImageUrl,
    }
    enterMealDataHandler(MealData);
    
    resetFoodNameInput();
    resetFoodDescriptionInput();
    resetFoodPriceInput();
    resetFoodImageUrlInput();
    resetfoodCategoryInput();
  };


  const FoodNameClass = foodNameHasError ? `${classes["form-control"]}  ${classes.invalid}` : `${classes["form-control"]}`;
  const FoodDescriptionClass = foodDescriptionHasError ? `${classes["form-control"]}  ${classes.invalid}` : `${classes["form-control"]}`;
  const FoodPriceClass = foodPriceHasError ? `${classes["form-control"]}  ${classes.invalid}` : `${classes["form-control"]}`;
  const FoodImageUrlClass = foodImageUrlHasError ? `${classes["form-control"]}  ${classes.invalid}` : `${classes["form-control"]}`;
  const FoodCategoryClass = foodCategoryHasError ? `${classes["form-control"]}  ${classes.invalid}` : `${classes["form-control"]}`;
  return (
    <>
      <div className={classes.container}>
        <form onSubmit={SubmitFormHandler}>
          <div className={classes["control-group"]}>
            <div className={FoodNameClass}>
              <label htmlFor="FoodName">Dish Name</label>
              <input type="text" id="dish Name"  value={enteredFoodName} onChange={foodNameChangeHandler} onBlur={foodNameBlurHandler}/>
              {foodNameHasError && <p className={classes['error-text']}>Please Enter a Valid Name</p>}
            </div>

            <div className={FoodDescriptionClass}>
              <label>Food Description</label>
              <input type="text" value={enteredFoodDescription} onChange={foodDescriptionChangeHandler} onBlur={foodDescriptionBlurHandler}/>
              {foodDescriptionHasError && <p className={classes['error-text']}>Please Enter a Valid Description</p>}
            </div>

            <div className={FoodPriceClass}>
              <label>Food Price</label>
              <input type="number"  value={enteredFoodPrice} onChange={foodPriceChangeHandler} onBlur={foodPriceBlurHandler}/>
              {foodPriceHasError && <p className={classes['error-text']}>Please Enter a Valid Price</p>}
            </div>

            <div className={FoodCategoryClass}>
              <label>Food Category</label>
              <select value={selectedFoodCategory} onChange={foodCategoryChangeHandler} onBlur={foodCategoryBlurHandler}>
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                <option value="BreakFast">BreakFast</option>
                <option value="Biryani & Pulao">Biryani & Pulao</option>
                <option value="Indian Curries">Indian Curries</option>
                <option value="Chinese">Chinese</option>
                <option value="Karhai">Karhai</option>
                <option value="Daal">Daal</option>
              </select>
              {foodCategoryHasError && <p className={classes['error-text']}>Please Select a Category</p>}
            </div>

            <div className={FoodImageUrlClass}>
              <label>Image Url</label>
              <input type="url" value={enteredFoodImageUrl} onChange={foodImageUrlChangeHandler} onBlur={foodImageUrlBlurHandler}/>
              {foodImageUrlHasError && <p className={classes['error-text']}>Please Enter a Valid URL</p>}
            </div>
          </div>
          <div className={classes['form-actions']}>
            <button disabled={!formIsValid}>{isLoading?"Sending...":"Submit"}</button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default InsertMeal;
