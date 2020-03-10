import React from "react";
import "./CartDropdownItem.styles.scss";

const CartDropdownItem = ({
  item: {
    wish,
    product: { name, price, photo },
    quantity
  }
}) => {
  return (
    <div className="cart-dropdown-item">
      <div className="item-img">
        <img src={`../uploads/${photo}`} alt={`product ${name}`} />
      </div>

      <div className="item-body">
        <ul className="item-description">
          <li className="item-name title">{name}</li>
          <li className="item-price">TT${price}</li>
        </ul>

        <div className="item-quantity">Quantity: {quantity}</div>
      </div>
    </div>
  );
};

export default CartDropdownItem;
