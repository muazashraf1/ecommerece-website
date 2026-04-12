// import React, { useEffect, useState } from 'react'
// import ProductsCard from '../components/ProductsCard'

// function ProductsList() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);


//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

//     useEffect(() => {
//         fetch(`${BASEURL}/api/products/`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch products!")
//                 }
//                 return response.json()
//             })
//             .then((data) => {
//                 setProducts(data)
//                 setLoading(false)
//             })
//             .catch((error) => {
//                 setError(error.message)
//                 setLoading(false)
//             })
//     }, [])

//     if (loading) {
//         return <div>Loading.....</div>
//     }

//     if(error) {
//         return <div>Error {error}</div>
//     }


//     return (
//         <div className='min-h-screen bg-gray-100'>
//             <h1 className='text-3xl font-bold text-center py-6 bg-white shadow-md'>Product List</h1>
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
//                 {products.length > 0 ? (
//                     products.map((product) => (
//                         <ProductsCard key={product.id} product={product} />

//                     ))

//                 ) : (
//                     <p className='col-span-full text-center text-gray-500'>No products Avilble</p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default ProductsList













import React, { useEffect, useState } from 'react'
import ProductsCard from '../components/ProductsCard'

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    useEffect(() => {
        fetch(`${BASEURL}/api/products/`)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch products!")
                return response.json()
            })
            .then((data) => {
                setProducts(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, [])

    // Loading State
    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col items-center justify-center gap-4'>
                <div className='w-14 h-14 rounded-full border-4 border-emerald-200 border-t-emerald-500 animate-spin' />
                <p className='text-emerald-700 font-medium text-sm tracking-wide'>Loading products...</p>
            </div>
        )
    }

    // Error State
    if (error) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center'>
                <div className='
                    bg-white/70 backdrop-blur-xl
                    border border-red-200
                    rounded-2xl px-10 py-8 text-center
                    shadow-[0_8px_32px_rgba(0,0,0,0.06)]
                    max-w-sm
                '>
                    <div className='w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4'>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <p className='text-red-500 font-semibold text-base mb-1'>Something went wrong</p>
                    <p className='text-gray-400 text-sm'>{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 pt-24 pb-16 px-6'>

            {/* Header */}
            <div className='text-center mb-10'>
                <h1 className='text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent tracking-tight'>
                    Our Products
                </h1>
                <p className='text-gray-400 text-sm mt-2'>Fresh picks, just for you</p>
                <div className='w-16 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto mt-4' />
            </div>

            {/* Grid */}
            {products.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
                    {products.map((product) => (
                        <ProductsCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center gap-3 mt-20 text-center'>
                    <div className='w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center'>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                    </div>
                    <p className='text-gray-500 font-medium'>No products available</p>
                    <p className='text-gray-400 text-sm'>Check back later for new arrivals</p>
                </div>
            )}
        </div>
    )
}

export default ProductsList