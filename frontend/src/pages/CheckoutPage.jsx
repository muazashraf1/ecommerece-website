// import React, { use, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useCart } from '../context/CartContext'
// import { authFetch } from '../utils/auth'

// function CheckOutPage() {
//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
//     const navigate = useNavigate()
//     const { clearCart } = useCart()

//     const [form, setForm] = useState({
//         name: '',
//         address: '',
//         phone: '',
//         payment_method: 'COD'
//     })

//     const [loading, setLoading] = useState(false)
//     const [message, setMessage] = useState(null)

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         })
//     }


//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         setLoading(true)
//         setMessage('')

//         try {
//             const res =await authFetch(`${BASEURL}/api/orders/create`, {
//                 method: "POST",
//                 headers : {
//                     "Content-Type" : "application/json"
//                 },
//                 body : JSON.stringify(form),
//             })

//             const data = await res.json()

//             if(res.ok) {
//                 setMessage("Order palced successfully")
//                 fetch(`${BASEURL}/api/cart/`)
//                 clearCart()
//                 setTimeout(() => {
//                     navigate('/')
//                 }, 2000)
//             }else {
//                 setMessage(data.error || "Failed to place order. plz try again")
//             }
//         } catch (error) {
//             setMessage("An error occured")
//         } 
//     }


//     return (
//         <div className='min-h-screen bg-gray-100 flex justify-center items-center p-6'>
//             <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
//                 <h1 className='text-3xl font-bold text-center mb-6'>Checkout</h1>

//                 <form className='space-y-4' onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         placeholder='Name'
//                         value={form.name}
//                         name='name'
//                         onChange={handleChange}
//                         required
//                         className='w-full border rounded-lg p-2'
//                     />
//                     <textarea
//                         placeholder='Address'
//                         value={form.address}
//                         name='address'
//                         onChange={handleChange}
//                         required
//                         className='w-full border rounded-lg p-2'
//                     />

//                     <input
//                         type="tel"
//                         placeholder='Phone number'
//                         value={form.phone}
//                         name='phone'
//                         onChange={handleChange}
//                         required
//                         className='w-full border rounded-lg p-2'
//                     />


//                     <select
//                         name="payment_method"
//                         value={form.payment_method}
//                         onChange={handleChange}
//                         className='w-full border rounded-lg p-2'
//                     >
//                         <option value="COD">COD</option>
//                         <option value="OnlinePayment">Online Payment</option>

//                     </select>


//                     <button type='submit' disabled={loading} className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'>

//                         {loading ? "processing...." : "Place Order"}
//                     </button>

//                     {message && (
//                         <p>{message}</p>
//                     )}
//                 </form>

//             </div>
//         </div>
//     )
// }

// export default CheckOutPage







import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { authFetch } from '../utils/auth'

function CheckOutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const navigate = useNavigate()
    const { clearCart } = useCart()

    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
        payment_method: 'COD'
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [msgType, setMsgType] = useState("")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setMessage('')
        try {
            const res = await authFetch(`${BASEURL}/api/orders/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (res.ok) {
                setMsgType("success")
                setMessage("Order placed successfully! Redirecting...")
                fetch(`${BASEURL}/api/cart/`)
                clearCart()
                setTimeout(() => navigate('/'), 2000)
            } else {
                setMsgType("error")
                setMessage(data.error || "Failed to place order. Please try again.")
            }
        } catch (error) {
            setMsgType("error")
            setMessage("An error occurred.")
        } finally {
            setLoading(false)
        }
    }

    const inputClass = `
        w-full px-4 py-3 rounded-xl text-sm
        bg-white/70 border border-emerald-100
        text-gray-700 placeholder-gray-300
        focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100
        transition-all duration-200
    `

    return (
        <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center px-4 py-24'>

            <div className='
                w-full max-w-md
                bg-white/60 backdrop-blur-xl
                border border-emerald-100
                rounded-3xl p-8
                shadow-[0_8px_40px_rgba(16,185,129,0.10)]
            '>
                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-[0_4px_16px_rgba(16,185,129,0.3)]'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                    </div>
                    <h2 className='text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent tracking-tight'>
                        Checkout
                    </h2>
                    <p className='text-gray-400 text-sm mt-1'>Complete your order details</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='space-y-4'>

                    {/* Name */}
                    <div className='space-y-1'>
                        <label className='text-xs font-medium text-emerald-700 ml-1'>Full Name</label>
                        <input
                            type="text"
                            placeholder='Enter your full name'
                            value={form.name}
                            name='name'
                            onChange={handleChange}
                            required
                            className={inputClass}
                        />
                    </div>

                    {/* Address */}
                    <div className='space-y-1'>
                        <label className='text-xs font-medium text-emerald-700 ml-1'>Delivery Address</label>
                        <textarea
                            placeholder='Enter your full address'
                            value={form.address}
                            name='address'
                            onChange={handleChange}
                            required
                            rows={3}
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Phone */}
                    <div className='space-y-1'>
                        <label className='text-xs font-medium text-emerald-700 ml-1'>Phone Number</label>
                        <input
                            type="tel"
                            placeholder='Enter your phone number'
                            value={form.phone}
                            name='phone'
                            onChange={handleChange}
                            required
                            className={inputClass}
                        />
                    </div>

                    {/* Payment Method */}
                    <div className='space-y-1'>
                        <label className='text-xs font-medium text-emerald-700 ml-1'>Payment Method</label>
                        <select
                            name="payment_method"
                            value={form.payment_method}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value="COD">Cash on Delivery (COD)</option>
                            <option value="OnlinePayment">Online Payment</option>
                        </select>
                    </div>

                    {/* Payment Info Badge */}
                    <div className='flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-xl'>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                            <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                        <p className='text-xs text-emerald-700 font-medium'>
                            {form.payment_method === 'COD'
                                ? 'Pay when your order arrives at your door'
                                : 'You will be redirected to payment gateway'}
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='
                            w-full py-3 rounded-xl font-semibold text-sm text-white
                            bg-gradient-to-r from-emerald-500 to-emerald-600
                            shadow-[0_4px_16px_rgba(16,185,129,0.35)]
                            hover:shadow-[0_6px_24px_rgba(16,185,129,0.45)]
                            hover:-translate-y-0.5
                            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                            transition-all duration-200 mt-2
                            flex items-center justify-center gap-2
                        '
                    >
                        {loading ? (
                            <>
                                <div className='w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin' />
                                Processing...
                            </>
                        ) : (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Place Order
                            </>
                        )}
                    </button>

                    {/* Message */}
                    {message && (
                        <div className={`
                            px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2
                            ${msgType === 'success'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-red-50 text-red-600 border border-red-200'
                            }
                        `}>
                            {msgType === 'success' ? (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            ) : (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                                </svg>
                            )}
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CheckOutPage