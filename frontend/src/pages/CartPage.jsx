import React from 'react'
import { useCart } from '../context/CartContext'

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity } = useCart()

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    return (
        <div className='pt-20 min-h-screen bg-gray-100 p-8'>
            <h1 className=' text-3xl font-bold mb-6 text-center'>Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className='text-center text-gray-600'>Ypur cart is empty</p>
            ) : (
                <div className='max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md'>
                    {cartItems.map((item) => (
                        <div key={item.id} className='flex item-center justify-center mb-4'>

                            <div>
                                <h2 className='text-lg font-semibold'>{item.name}</h2>
                                <p className='text-gray-600'>$ {item.price}</p>
                            </div>

                            <div className='flex itmes-center gap-3'>

                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className='bg-gray-300 px-3 py-1 rounded'>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className='bg-gray-300 px-3 py-1 rounded'>+</button>
                                <button onClick={() => removeFromCart(item.id)} className='text-red-500'>Remove</button>

                            </div>

                        </div>
                    ))}

                    <div className='border-t pt-4 mt-4 flex  justify-center items-center'>
                        <h2 className='text-xl font-bold'>Total:</h2>
                        <p className='text-xl font-semibold'>${total.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage