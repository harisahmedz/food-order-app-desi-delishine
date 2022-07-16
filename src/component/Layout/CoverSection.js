
import classes from './CoverSection.module.css';

const CoverSection = ()=>{
    return(
        <section className={classes.main}>
        <div className={classes.container}>

              <h2>Delicious Food, <i>Delivered</i> To You</h2>
              <p>
                All our meals are cooked with high-quality ingredients,
                just-in-time and of course by experienced chefs!{" "}
              </p>
              <p>
              Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
              </p>
              <button className={classes.btn}>Order Now</button>

        </div>
      </section>
    );
}

export default CoverSection;