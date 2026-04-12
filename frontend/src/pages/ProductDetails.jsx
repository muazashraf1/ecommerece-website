// import React from 'react'
// import { Link } from 'react-router-dom'

// function ProductDetails({product}) {
//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

//   return (
//     <Link to={`/product/${product.id}`} className='bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.2] transition-transform p-4 cursor-pointer'>
//         <img src={`${BASEURL}${product.image}`} alt={product.name} className='w-full h-56 object-cover rounded-lg mb-4' />

//         <h2 className='text-lg font-semibold text-gray-800 truncate'>{product.name}</h2>
//         <p className='text-gray-600 font-medium'>$ {product.price}</p>
//         <p className='text-gray-500 mt-2'>{product.description}</p>
//     </Link>
//   )
// }

// export default ProductDetails








// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { useCart } from '../context/CartContext';

// function ProductDetails() {
//     const { id } = useParams();
//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
//     const [product, setProduct] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState(null)
//     const { addToCart } = useCart()

//     useEffect(() => {
//         fetch(`${BASEURL}/api/products/${id}/`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Network response is not ok")
//                 }
//                 return response.json()
//             })
//             .then((data) => {
//                 setProduct(data)
//                 setLoading(false)
//             })
//             .catch((error) => {
//                 setError(error)
//                 setLoading(false)
//             })
//     }, [id, BASEURL])

//     if (loading) {
//         return <div>Loading...</div>
//     }

//     if (error) {
//         return <div>Error {error}</div>
//     }

//     if (!product) {
//         return <div>No product found</div>
//     }

//     const handleAddToCart = () => {
//         if(!localStorage.getItem('access_token')) {
//             window.location.href = '/login';
//             return;
//         }
//         addToCart(product.id)
//     }


//     return (
//         <div className='min-h-screen bg-gray-100 flex justify-center items-center py-10'>
//             <div className='bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full'>
//                 <div className='flex flex-col md:flex-row gap-8'>
//                     <img src={`${product.image}`} alt={product.name} className='w-full md:w-1/2 h-auto object-cover rounded-lg' />

//                     <div className='flex-1'>
//                         <h1 className='text-3xl font-bold text-gray-800 m-4'>{product.name}</h1>
//                         <p className='text-gray-600 mb-4'>{product.description}</p>
//                         <p className='text-2xl font-semibold text-green-600 mb-6'>{product.price}</p>

//                         {/* <button onClick={() => addToCart(product.id)} className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>Add to cart 👜</button> */}
//                         <button onClick={handleAddToCart} className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>Add to cart 👜</button>

//                         <div className='mt-4'>
//                             <a href="/" className='text-blue-600 hover:underline'>⬅️Back to home</a>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductDetails















import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext';

function ProductDetails() {
    const { id } = useParams();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [added, setAdded] = useState(false)
    const { addToCart } = useCart()

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}/`)
            .then((response) => {
                if (!response.ok) throw new Error("Network response is not ok")
                return response.json()
            })
            .then((data) => {
                setProduct(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }, [id, BASEURL])

    const handleAddToCart = () => {
        if (!localStorage.getItem('access_token')) {
            window.location.href = '/login';
            return;
        }
        addToCart(product.id)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    // Loading
    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col items-center justify-center gap-4'>
                <div className='w-14 h-14 rounded-full border-4 border-emerald-200 border-t-emerald-500 animate-spin' />
                <p className='text-emerald-700 font-medium text-sm tracking-wide'>Loading product...</p>
            </div>
        )
    }

    // Error
    if (error) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center'>
                <div className='bg-white/70 backdrop-blur-xl border border-red-200 rounded-2xl px-10 py-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.06)] max-w-sm'>
                    <div className='w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4'>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <p className='text-red-500 font-semibold text-base mb-1'>Something went wrong</p>
                    <p className='text-gray-400 text-sm'>{error.message}</p>
                </div>
            </div>
        )
    }

    // Not found
    if (!product) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center'>
                <div className='bg-white/70 backdrop-blur-xl border border-emerald-100 rounded-2xl px-10 py-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.06)]'>
                    <p className='text-gray-500 font-medium'>No product found</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center px-4 py-24'>
            <div className='
                bg-white/60 backdrop-blur-xl
                border border-emerald-100
                rounded-3xl
                shadow-[0_8px_40px_rgba(16,185,129,0.10)]
                p-8 max-w-3xl w-full
            '>
                <div className='flex flex-col md:flex-row gap-8'>

                    {/* Image */}
                    <div className='w-full md:w-1/2 rounded-2xl overflow-hidden border border-emerald-100 shadow-[0_4px_20px_rgba(16,185,129,0.08)]'>
                        <img
                            src={`${product.image}`}
                            alt={product.name}
                            className='w-full h-full object-cover'
                        />
                    </div>

                    {/* Details */}
                    <div className='flex-1 flex flex-col justify-between'>
                        <div>
                            {/* Title */}
                            <h1 className='text-3xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent tracking-tight mb-3'>
                                {product.name}
                            </h1>

                            {/* Divider */}
                            <div className='w-12 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 mb-4' />

                            {/* Description */}
                            <p className='text-gray-500 text-sm leading-relaxed mb-6'>
                                {product.description}
                            </p>

                            {/* Price */}
                            <div className='
                                inline-flex items-center gap-1
                                bg-emerald-50 border border-emerald-100
                                rounded-xl px-4 py-2 mb-8
                            '>
                                <span className='text-emerald-400 text-sm font-medium'>$</span>
                                <span className='text-2xl font-bold text-emerald-600'>{product.price}</span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className={`
                                    w-full flex items-center justify-center gap-2
                                    py-3 rounded-xl font-semibold text-sm
                                    transition-all duration-300
                                    ${added
                                        ? 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                                        : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_24px_rgba(16,185,129,0.45)] hover:-translate-y-0.5'
                                    }
                                `}
                            >
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                                </svg>
                                {added ? 'Added to Cart!' : 'Add to Cart'}
                            </button>

                            {/* Back Link */}
                            <Link
                                to='/'
                                className='
                                    w-full flex items-center justify-center gap-2
                                    py-3 rounded-xl font-medium text-sm
                                    text-emerald-700
                                    bg-white/70 border border-emerald-100
                                    hover:bg-emerald-50 hover:border-emerald-200
                                    transition-all duration-200
                                '
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                                </svg>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails