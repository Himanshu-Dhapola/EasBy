import { axiosInstance } from "../axios/axiosInstance";
import { toast } from "react-hot-toast";
import {
  setCart,
  setCartItems,
  setLoading,
  clearCart,
} from "../Feature/Slices/cartSlice";
import axios from "axios"


export function getCartItem() {
  return async (dispatch) => {
    const token = localStorage?.getItem("accessToken")
    try {
      const response = await axios.get(`https://easby-server.onrender.com/api/v1/cart`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setCart(response.data.data));
      dispatch(setCartItems(response.data.data.cartItem));
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
}

export function addItemToCart(cartData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    const token = localStorage?.getItem("accessToken");
    console.log(token)
    try {
     if (token) {
        const response = await axios.put(
  `https://easby-server.onrender.com/api/v1/cart/add`,
  cartData, // Pass the data (cartData) as the second argument
  {
    headers: { Authorization: `Bearer ${token}` }, // Configuration object
    withCredentials: true,
  }
);
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
      }
      dispatch(getCartItem());
      toast.success("Product added to cart", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function removeCartItem(cartItemId) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/cart_items/${cartItemId}`
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(getCartItem());
      toast.success("Cart item removed", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    dispatch(setLoading(false));
  };
}

export function updateCartItem(cartData) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/cart_items/${cartData.cartItemId}`,
        cartData
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(getCartItem());
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
}

export function emptyCart() {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(`/api/v1/cart/empty-cart`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(clearCart());
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
}
