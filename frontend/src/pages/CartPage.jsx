// import React from 'react'
// import { useCart } from '../context/CartContext'
// import { Link } from 'react-router-dom';

// function CartPage() {
//     const { cartItems, total, removeFromCart, updateQuantity } = useCart();
//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
//     console.log("Cart Items:", cartItems);

//     // const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

//     return (
//         <div className='pt-20 min-h-screen bg-gray-100 p-8'>
//             <h1 className=' text-3xl font-bold mb-6 text-center'>Your Cart</h1>

//             {cartItems.length === 0 ? (
//                 <p className='text-center text-gray-600'>Ypur cart is empty</p>
//             ) : (
//                 <div className=' d'>
//                     {cartItems.map((item) => (
//                         <div key={item.id} className='flex item-center justify-center mb-4'>

//                             <div className='flex items-center gap-4'>
//                                 {item.product_image && (
//                                     <img src={`${BASEURL}${item.product_image}`} alt={item.product_name} className='w-20 h-20 object-cover rounded' />
//                                 )}
//                             </div>
//                             <div>
//                                 <h2 className='text-lg font-semibold'>{item.product_name}</h2>
//                                 <p className='text-gray-600'>$ {item.product_price}</p>
//                             </div>

//                             <div className='flex itmes-center gap-3'>

//                                 <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className='bg-gray-300 px-3 py-1 rounded'>-</button>
//                                 <span>{item.quantity}</span>
//                                 <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className='bg-gray-300 px-3 py-1 rounded'>+</button>
//                                 <button onClick={() => removeFromCart(item.id)} className='text-red-500'>Remove</button>

//                             </div>

//                         </div>
//                     ))}

//                     <div className='border-t pt-4 mt-4 flex  justify-center items-center'>
//                         <h2 className='text-xl font-bold'>Total:</h2>
//                         <p className='text-xl font-semibold'>${total.toFixed(2)}</p>
//                         <Link to='/checkout' className='bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-blue-700'>Proceed to checkout</Link>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default CartPage




import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom';

function CartPage() {
    const { cartItems, total, removeFromCart, updateQuantity } = useCart();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    return (
        <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-24'>

            {/* Header */}
            <div className='text-center mb-10'>
                <h1 className='text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent tracking-tight'>
                    Your Cart
                </h1>
                <div className='w-16 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto mt-4' />
            </div>

            {/* Empty State */}
            {cartItems.length === 0 ? (
                <div className='flex flex-col items-center justify-center gap-4 mt-20'>
                    <div className='w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center'>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                    </div>
                    <p className='text-gray-500 font-medium text-lg'>Your cart is empty</p>
                    <p className='text-gray-400 text-sm'>Add some products to get started</p>
                    <Link
                        to='/'
                        className='
                            mt-2 px-6 py-3 rounded-xl text-sm font-semibold text-white
                            bg-gradient-to-r from-emerald-500 to-emerald-600
                            shadow-[0_4px_16px_rgba(16,185,129,0.3)]
                            hover:shadow-[0_6px_24px_rgba(16,185,129,0.4)]
                            hover:-translate-y-0.5 transition-all duration-200
                        '
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className='max-w-2xl mx-auto space-y-4'>

                    {/* Cart Items */}
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className='
                                flex items-center gap-4
                                bg-white/60 backdrop-blur-xl
                                border border-emerald-100
                                rounded-2xl p-4
                                shadow-[0_4px_20px_rgba(16,185,129,0.07)]
                                transition-all duration-200
                            '
                        >
                            {/* Image */}
                            {item.product_image && (
                                <img
                                    src={`${BASEURL}${item.product_image}`}
                                    alt={item.product_name}
                                    className='w-20 h-20 object-cover rounded-xl border border-emerald-100 flex-shrink-0'
                                />
                            )}

                            {/* Name & Price */}
                            <div className='flex-1 min-w-0'>
                                <h2 className='text-base font-semibold text-gray-700 truncate'>
                                    {item.product_name}
                                </h2>
                                <p className='text-emerald-600 font-bold text-sm mt-0.5'>
                                    ${item.product_price}
                                </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className='flex items-center gap-2'>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className='
                                        w-8 h-8 rounded-lg flex items-center justify-center
                                        bg-emerald-50 border border-emerald-100
                                        text-emerald-600 font-bold
                                        hover:bg-emerald-100 hover:border-emerald-200
                                        transition-all duration-150
                                    '
                                >
                                    −
                                </button>
                                <span className='w-6 text-center text-sm font-semibold text-gray-700'>
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className='
                                        w-8 h-8 rounded-lg flex items-center justify-center
                                        bg-emerald-50 border border-emerald-100
                                        text-emerald-600 font-bold
                                        hover:bg-emerald-100 hover:border-emerald-200
                                        transition-all duration-150
                                    '
                                >
                                    +
                                </button>
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className='
                                    w-8 h-8 rounded-lg flex items-center justify-center
                                    text-gray-300 border border-gray-100
                                    hover:bg-red-50 hover:text-red-400 hover:border-red-200
                                    transition-all duration-150 flex-shrink-0
                                '
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                    <path d="M10 11v6M14 11v6"/>
                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                                </svg>
                            </button>
                        </div>
                    ))}

                    {/* Summary */}
                    <div className='
                        bg-white/60 backdrop-blur-xl
                        border border-emerald-100
                        rounded-2xl p-6
                        shadow-[0_4px_20px_rgba(16,185,129,0.07)]
                        mt-6
                    '>
                        {/* Total */}
                        <div className='flex items-center justify-between mb-5'>
                            <span className='text-gray-500 text-sm font-medium'>Order Total</span>
                            <span className='text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent'>
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        {/* Checkout Button */}
                        <Link
                            to='/checkout'
                            className='
                                w-full flex items-center justify-center gap-2
                                py-3 rounded-xl font-semibold text-sm text-white
                                bg-gradient-to-r from-emerald-500 to-emerald-600
                                shadow-[0_4px_16px_rgba(16,185,129,0.35)]
                                hover:shadow-[0_6px_24px_rgba(16,185,129,0.45)]
                                hover:-translate-y-0.5 transition-all duration-200
                            '
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                            Proceed to Checkout
                        </Link>

                        {/* Continue Shopping */}
                        <Link
                            to='/'
                            className='
                                w-full flex items-center justify-center gap-2
                                py-3 rounded-xl font-medium text-sm
                                text-emerald-700
                                hover:bg-emerald-50
                                transition-all duration-200 mt-2
                            '
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage