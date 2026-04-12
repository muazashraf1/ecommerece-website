// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useCart } from '../context/CartContext'
// import { clearTokens } from '../utils/auth'
// import { getAccessToken } from '../utils/auth'

// function Navbar() {
//     const { cartItems } = useCart()
//     const navigate = useNavigate();
//     const IsLoggedIn = !!getAccessToken()
//     const handleLogout = () => {
//         clearTokens()
//         navigate('/')
//     }
//     const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
//     return (
//         <nav className='bg-white shadow-md px-6 py-4 flex justify-center items-center fixed w-full top-0 z-50'>
//             <Link to='/' className='text-2xl font-bold text-gray-800'>Muaz Cart</Link>

//             <div className='flex items-center gap-6'>
//                 {/* login/Signup or logout */}
//                 {!IsLoggedIn ? (
//                     <>
//                         <Link to='/login' className='text-gray-800 hover:text-gray-600 font-medium'>Login</Link>
//                         <Link to='/signup' className='text-gray-800 hover:text-gray-600 font-medium'>Signup</Link>
//                     </>
//                 ) : (
//                     <button onClick={handleLogout} className='text-gray-800 hover:text-gray-600 font-medium'>Logout</button>
//                 )}
//             </div>
//             <Link to='/cart' className='relative text-gray-800 hover:text-gray-600 font-medium'> Cart

//                 {cartCount > 0 && (
//                     <span className='absolute -top-2 border p-10  -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 '> {cartCount}</span>
//                 )}

//             </Link>
//         </nav>
//     )
// }

// export default Navbar






import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { clearTokens, getAccessToken } from '../utils/auth'

function Navbar() {
    const { cartItems } = useCart()
    const navigate = useNavigate();
    const IsLoggedIn = !!getAccessToken()

    const handleLogout = () => {
        clearTokens()
        navigate('/')
    }

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    return (
        <nav className='
            fixed top-0 w-full z-50
            h-16 px-6
            flex justify-between items-center
            bg-white/55 backdrop-blur-xl
            border-b border-emerald-200/40
            shadow-[0_4px_24px_rgba(16,185,129,0.08)]
        '>
            {/* Logo */}
            <Link
                to='/'
                className='text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent tracking-tight'
            >
                Muaz Cart
            </Link>

            {/* Auth Buttons */}
            <div className='flex items-center gap-3'>
                {!IsLoggedIn ? (
                    <>
                        <Link
                            to='/login'
                            className='
                                px-5 py-2 rounded-xl text-sm font-medium
                                text-emerald-800
                                border border-emerald-200
                                hover:bg-emerald-50 hover:border-emerald-300
                                transition-all duration-200
                            '
                        >
                            Login
                        </Link>
                        <Link
                            to='/signup'
                            className='
                                px-5 py-2 rounded-xl text-sm font-medium
                                text-white
                                bg-gradient-to-r from-emerald-500 to-emerald-600
                                shadow-[0_2px_12px_rgba(16,185,129,0.3)]
                                hover:shadow-[0_4px_18px_rgba(16,185,129,0.45)]
                                hover:-translate-y-0.5
                                transition-all duration-200
                            '
                        >
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className='
                            px-5 py-2 rounded-xl text-sm font-medium
                            text-emerald-800
                            bg-white/50 border border-emerald-200
                            hover:bg-red-50 hover:text-red-600 hover:border-red-200
                            transition-all duration-200 cursor-pointer
                        '
                    >
                        Logout
                    </button>
                )}
            </div>

            {/* Cart Button */}
            <Link
                to='/cart'
                className='
                    relative flex items-center gap-2
                    px-4 py-2 rounded-xl text-sm font-medium
                    text-emerald-800
                    bg-white/60 border border-emerald-200/60
                    hover:bg-white/85 hover:border-emerald-300
                    transition-all duration-200
                '
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Cart
                {cartCount > 0 && (
                    <span className='
                        absolute -top-2 -right-2
                        min-w-[19px] h-[19px] px-1
                        flex items-center justify-center
                        text-[0.65rem] font-bold text-white
                        bg-gradient-to-br from-emerald-400 to-emerald-600
                        rounded-full border-2 border-white
                        shadow-[0_2px_8px_rgba(16,185,129,0.4)]
                    '>
                        {cartCount}
                    </span>
                )}
            </Link>
        </nav>
    )
}

export default Navbar