// import React from 'react'
// import { Link } from 'react-router-dom'


// function ProductsCard({ product }) {
//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

//     return (
//         <Link to={`/product/${product.id}`}>
//             <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.03] overflow-hidden group border mt-3 cursor-pointer">

//                 {/* Image */}
//                 <div className="relative">
//                     <img
//                         src={`${BASEURL}${product.image} `}
//                         alt={product.name}
//                         className="w-full h-56 object-cover"
//                     />

//                 </div>

//                 {/* Content */}
//                 <div className="p-4 space-y-2">

//                     {/* Title */}
//                     <h2 className="text-lg font-semibold text-gray-800 truncate group-hover:text-black">
//                         {product.name}
//                     </h2>

//                     {/* Price */}
//                     <p className="text-xl font-bold text-gray-900">
//                         ${product.price}
//                     </p>

//                 </div>
//             </div>
//         </Link>
//     )
// }

// export default ProductsCard









import React from 'react'
import { Link } from 'react-router-dom'

function ProductsCard({ product }) {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    return (
        <Link to={`/product/${product.id}`} className='block mt-3'>
            <div className='
                group relative
                bg-white/60 backdrop-blur-xl
                border border-emerald-100
                rounded-2xl overflow-hidden
                shadow-[0_4px_20px_rgba(16,185,129,0.07)]
                hover:shadow-[0_8px_32px_rgba(16,185,129,0.18)]
                hover:-translate-y-1.5
                transition-all duration-300
                cursor-pointer
            '>
                {/* Image */}
                <div className='relative overflow-hidden h-56'>
                    <img
                        src={`${BASEURL}${product.image}`}
                        alt={product.name}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                    {/* subtle green overlay on hover */}
                    <div className='absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </div>

                {/* Content */}
                <div className='p-4 space-y-2'>

                    {/* Title */}
                    <h2 className='text-base font-semibold text-gray-700 truncate group-hover:text-emerald-700 transition-colors duration-200'>
                        {product.name}
                    </h2>

                    {/* Price Row */}
                    <div className='flex items-center justify-between'>
                        <span className='
                            text-lg font-bold
                            bg-gradient-to-r from-emerald-600 to-emerald-400
                            bg-clip-text text-transparent
                        '>
                            ${product.price}
                        </span>

                        {/* View arrow */}
                        <span className='
                            w-8 h-8 rounded-xl
                            flex items-center justify-center
                            bg-emerald-50 text-emerald-500
                            group-hover:bg-emerald-500 group-hover:text-white
                            transition-all duration-200
                        '>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductsCard
