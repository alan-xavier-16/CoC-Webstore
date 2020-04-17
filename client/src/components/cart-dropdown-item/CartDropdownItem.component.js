import React from "react";
import "./CartDropdownItem.styles.scss";

const CartDropdownItem = ({
  item: {
    product: { name, price, photo },
    quantity,
  },
}) => {
  return (
    <div className="cart-dropdown-item">
      <div className="item-img">
        <img src={`/uploads/${photo[0]}`} alt={`product ${name}`} />
      </div>

      <div className="item-body">
        <h3>{name}</h3>
        <div>
          TT${(price / 100).toFixed(2)} x {quantity}
        </div>
        <div>Item Total: TT${((price * quantity) / 100).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CartDropdownItem;
