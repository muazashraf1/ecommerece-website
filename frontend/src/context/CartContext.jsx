import { createContext, useContext, useEffect, useState } from "react";
import { authFetch, getAccessToken } from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0)

    // fetch cart from backend

    const fetchCart = async () => {
        try {
            // const res = await fetch(`${BASEURL}/api/cart/`)
            const res = await authFetch(`${BASEURL}/api/cart/`)
            // if (!res.ok) {
            //     throw new Error("Failed to fetch cart")
            // }

            const data = await res.json()
            setCartItems(data.items || [])
            setTotal(data.total || 0)
        } catch (error) {
            console.error("Error fetching the cart:", error)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    // Add to cart
    // const addToCart = (product) => {
    //     const existing = cartItems.find((item) => item.id === product.id);
    //     if (existing) {
    //         setCartItems(
    //             cartItems.map((item) =>
    //                 item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    //             )
    //         )
    //     } else {
    //         setCartItems([...cartItems, { ...product, quantity: 1 }])
    //     }
    // }

    // proper API adding
    const addToCart = async (productID) => {
        try {
            // await fetch(`${BASEURL}/api/cart/add/`, {
            await authFetch(`${BASEURL}/api/cart/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ product_id: productID }),
            })
            fetchCart()
        } catch (error) {
            console.error("Error in adding to cart:", error)
        }
    }
    // Remove from cart
    // const removeFromCart = (id) => {
    //     setCartItems(cartItems.filter((item) => item.id !== id))
    // }

    // proper API removing
    const removeFromCart = async (itemId) => {
        try {
            // await fetch(`${BASEURL}/api/cart/remove/`, {
            await authFetch(`${BASEURL}/api/cart/remove/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ item_id: itemId })
            });
            fetchCart()
        } catch (error) {
            console.error("Error in removing the item from cart:", error)
        }
    }

    // Update quantity

    // const updateQuantity = (id, quantity) => {
    //     if (quantity < 1) return
    //     setCartItems(
    //         cartItems.map((item) =>
    //             item.id == id ? { ...item, quantity } : item
    //         )
    //     )
    // }

    // proper API updating

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId)
            return;
        }
        try {
            // await fetch(`${BASEURL}/api/cart/update/`, {
            await authFetch(`${BASEURL}/api/cart/update/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ item_id: itemId, quantity }),
            })
            fetchCart()
        } catch (error) {
            console.error("Error in updating the item from cart:", error)
        }
    }

    const clearCart = () => {
        setCartItems([])
        setTotal(0)
    }

    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext)