import React from 'react'
import { Link } from 'react-router-dom'


function ProductsCard({ product }) {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    return (
        <Link to={`/product/${product.id}`}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.03] overflow-hidden group border mt-3 cursor-pointer">

                {/* Image */}
                <div className="relative">
                    <img
                        src={`${BASEURL}${product.image} `}
                        alt={product.name}
                        className="w-full h-56 object-cover"
                    />

                </div>

                {/* Content */}
                <div className="p-4 space-y-2">

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-800 truncate group-hover:text-black">
                        {product.name}
                    </h2>

                    {/* Price */}
                    <p className="text-xl font-bold text-gray-900">
                        ${product.price}
                    </p>

                </div>
            </div>
        </Link>
    )
}

export default ProductsCard