import {useContext} from 'react';

import CartContext from '../../Store/cartContext';
import classes from "./Header.module.css";

const Header = (props) => {
  const CartCtx =  useContext(CartContext);
  return (
    <>
      <nav className={classes.nav}>
        <div className={classes.container}>
          <ul className={classes.navbarLeft}>
            <li>
              <i href="#" className={classes.logo}>
                Desi Delishine
              </i>
            </li>
          </ul>
      
          <ul className={classes.navbarRight}>
            
              <li onClick={props.onShowCart}>
                <i className={classes.cart}>
                  <i className="fa fa-shopping-cart"></i> <b>Cart</b>
                  <span className={classes.badge}>{(CartCtx.items.length>0) ? CartCtx.items.length:"0"}</span>
                </i>
              </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
