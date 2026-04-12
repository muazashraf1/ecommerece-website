import React, { useState } from 'react'
import { saveToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMsg('')
        try {
            const response = await fetch(`${BASEURL}/api/token/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(form)
            })

            const data = await response.json()
            if (response.ok) {
                // Verify tokens exist before saving
                if (!data.access || !data.refresh) {
                    setMsg("Error: Missing tokens in response")
                    console.error("Token response:", data)
                    return
                }
                saveToken(data)
                setMsg("Login successful")
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } else {
                setMsg(data.detail || JSON.stringify(data) || "Login failed, please try again")
                console.error("Login error:", data)
            }
        } catch (error) {
            setMsg("An error occurred: " + error.message)
            console.error("Login error:", error)
        }
    }
    return (

        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={form.email}
                        name='email'
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={form.password}
                        name='password'
                        className="w-full border p-2 rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Login
                    </button>
                </form>

                {msg && <p className=''>{msg}</p>}

                <div>
                    Don't have an account? {''}
                    <a href="/signup" className='text-blue-500 hover:underline'>
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
}


export default Login