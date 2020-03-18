import React from "react";
import "./CartDropdownItem.styles.scss";

const CartDropdownItem = ({
  item: {
    wish,
    product: { name, price, photo },
    quantity,
    total
  }
}) => {
  return (
    <div className="cart-dropdown-item">
      <div className="item-img">
        <img src={`/uploads/${photo}`} alt={`product ${name}`} />
      </div>

      <div className="item-body">
        <h3>{name}</h3>
        <div>
          TT${price} x {quantity}
        </div>
        <div>Item Total: TT${price * quantity}</div>
      </div>
    </div>
  );
};

export default CartDropdownItem;
