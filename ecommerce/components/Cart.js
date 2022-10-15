import React, { useContext, useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { Context } from "../context/StateContext";

import { urlFor } from "../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const {
    toggleCartItemQuantity,
    totalPrice,
    totalQuantity,
    cartItems,
    setShow,
    qty,
    incQty,
    decQty,
  } = useContext(Context);

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          className="cart-heading"
          type="button"
          onClick={() => {
            setShow(false);
          }}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantity} items)</span>
        </button>
        {cartItems?.length < 1 ? (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setShow(false);
                }}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="product-container">
            {cartItems?.map((item) => {
              console.log(item);
              return (
                <div key={item._id} className="product">
                  <img
                    src={item.image && urlFor(item.image[0])}
                    alt="product in cart image"
                    className="cart-product-image"
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div>
                        <p className="quantity-desc">
                          <span
                            className="minus"
                            onClick={() => {
                              toggleCartItemQuantity(item._id, "dec");
                            }}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item.quantity}</span>
                          <span
                            className="plus"
                            onClick={() => {
                              toggleCartItemQuantity(item._id, "inc");
                            }}
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => {}}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {cartItems.length >= 1 && (
              <div className="cart-bottom">
                <div className="total">
                  <h3>Subtotal:</h3>
                  <h3>${totalPrice}</h3>
                </div>
                <div className="btn-container">
                  <button onClick={() => {}} className="btn" type="button">
                    Pay with Stripe
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
