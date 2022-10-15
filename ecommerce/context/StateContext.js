import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const Context = createContext();

export const StateContext = ({ children }) => {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, settotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    if (value == "inc") {
      let newCartItems = [
        ...cartItems.filter((it) => it._id != id),
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ];
      setCartItems(newCartItems);
      setTotalPrice((prev) => prev + foundProduct.price);
      settotalQuantity((prev) => prev + 1);
    } else if (value == "dec") {
      if (foundProduct.quantity > 1) {
        let newCartItems = [
          ...cartItems.filter((it) => it._id != id),
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ];
        setCartItems(newCartItems);
        setTotalPrice((prev) => prev - foundProduct.price);
        settotalQuantity((prev) => prev - 1);
      }
    }
  };

  const onAdd = (product, quantity) => {
    //checking if the items exists in the cart already
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    settotalQuantity((prev) => prev + quantity);
    if (checkProductInCart) {
      const updateCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });
      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`
    ${qty} ${product.name} add to the cart.`);
  };
  const incQty = () => {
    setQty((prev) => prev + 1);
  };
  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 <= 0) {
        return 1;
      } else {
        return prev - 1;
      }
    });
  };

  return (
    <Context.Provider
      value={{
        show,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        setShow,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};
