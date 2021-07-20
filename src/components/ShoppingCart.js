import React from "react";

function ShoppingCart() {
  return (
    <div className="shoppingCarts">
      <div className="shoppingCart">
        <div className="shoppingCart_close">
          <box-icon name="x"></box-icon>
        </div>
        <h2>Su carrito</h2>
        <div className="shoppingCart_center">
          <div className="shoppingCart_item">
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
