import React, { useContext } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "../components";
import { Context } from "../context/StateContext";

const Navbar = () => {
  const { show, setShow, totalQuantity } = useContext(Context);
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Eliyahu Electronics</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => {
          setShow(true);
        }}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantity}</span>
      </button>
      {show && <Cart />}
    </div>
  );
};

export default Navbar;
