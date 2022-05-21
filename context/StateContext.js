import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast"; //this will take care of the notifications!

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //This two are normal variables (won't trigger a re-render) that are used to control quantities inside the cart!
  let foundProduct;
  let index;

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }
  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
      return prevQty - 1; 
    });
  }

  const onAdd = (product, quantity) => {
    //We have to set the new TotalPrice and TotalQuantity
    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + product.quantity);

    //Then we have to check if the item is already in the cart
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    if(checkProductInCart) {
      //We have to update the item in our cart with the new quantity
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);

    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ... product}])
    }

    //Confirmation pop up
    toast.success(`${qty} ${product.name} added to the cart.`);
  }

  /*
  * Function for removing items from the cart
  * @param {Obj} item - Asociated item.
  */  
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price*foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  /*
  * Function for changing product quantities from inside the cart
  * @param {number} id - 
  * @param {string} value - Value/flag passed from the button that decides if we are incrementing or decrementing
  */
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1){
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  //Context Provider
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context); //This let us use our context as a hook!