import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        setMessage('')

        try {
            const res =await fetch(`${BASEURL}/api/orders/create`, {
                method: "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(form),
            })

            const data = await res.json()

            if(res.ok) {
                setMessage("Order palced successfully")
                fetch(`${BASEURL}/api/cart/`)
                clearCart()
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }else {
                setMessage(data.error || "Failed to place order. plz try again")
            }
        } catch (error) {
            setMessage("An error occured")
        } 
    }


    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center p-6'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
                <h1 className='text-3xl font-bold text-center mb-6'>Checkout</h1>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Name'
                        value={form.name}
                        name='name'
                        onChange={handleChange}
                        required
                        className='w-full border rounded-lg p-2'
                    />
                    <textarea
                        placeholder='Address'
                        value={form.address}
                        name='address'
                        onChange={handleChange}
                        required
                        className='w-full border rounded-lg p-2'
                    />

                    <input
                        type="tel"
                        placeholder='Phone number'
                        value={form.phone}
                        name='phone'
                        onChange={handleChange}
                        required
                        className='w-full border rounded-lg p-2'
                    />


                    <select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        className='w-full border rounded-lg p-2'
                    >
                        <option value="COD">COD</option>
                        <option value="OnlinePayment">Online Payment</option>

                    </select>


                    <button type='submit' disabled={loading} className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'>

                        {loading ? "processing...." : "Place Order"}
                    </button>

                    {message && (
                        <p>{message}</p>
                    )}
                </form>

            </div>
        </div>
    )
}

export default CheckOutPage