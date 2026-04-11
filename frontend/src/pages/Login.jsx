import React, { useState } from 'react'
import { saveToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const [from, setForm] = useState({
        username: "",
        password: ""
    })

    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...from, [e.target.name]: e.target.value })
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

                body: JSON.stringify(from)
            })

            const data = await response.json()
            if (response.ok) {
                saveToken(data)
                setMsg("login successfull")
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } else {
                setMsg(data.detail || "login failed plz try again")
            }
        } catch (error) {
            setMsg("Error is occured")
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
                        value={from.username}
                        name='username'
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={from.password}
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
                    dont have an aaccount ? {''}
                    <a href="/signup" className='text-blue-500 hover:underline'>
                        signup
                    </a>
                </div>
            </div>
        </div>
    );
}


export default Login