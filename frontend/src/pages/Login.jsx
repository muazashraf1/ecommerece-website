// import React, { useState } from 'react'
// import { saveToken } from '../utils/auth'
// import { useNavigate } from 'react-router-dom'

// function Login() {
//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
//     const [form, setForm] = useState({
//         email: "",
//         password: ""
//     })

//     const [msg, setMsg] = useState("")
//     const navigate = useNavigate()

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setMsg('')
//         try {
//             const response = await fetch(`${BASEURL}/api/token/`, {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json"
//                 },

//                 body: JSON.stringify(form)
//             })

//             const data = await response.json()
//             if (response.ok) {
//                 // Verify tokens exist before saving
//                 if (!data.access || !data.refresh) {
//                     setMsg("Error: Missing tokens in response")
//                     console.error("Token response:", data)
//                     return
//                 }
//                 saveToken(data)
//                 setMsg("Login successful")
//                 setTimeout(() => {
//                     navigate('/')
//                 }, 1000)
//             } else {
//                 setMsg(data.detail || JSON.stringify(data) || "Login failed, please try again")
//                 console.error("Login error:", data)
//             }
//         } catch (error) {
//             setMsg("An error occurred: " + error.message)
//             console.error("Login error:", error)
//         }
//     }
//     return (

//         <div className="min-h-screen flex items-center justify-center p-6">
//             <div className="max-w-md w-full bg-white p-6 rounded shadow">
//                 <h2 className="text-2xl font-bold mb-4">Login</h2>

//                 <form onSubmit={handleSubmit} className="space-y-3">
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         onChange={handleChange}
//                         value={form.email}
//                         name='email'
//                         className="w-full border p-2 rounded"
//                     />

//                     <input
//                         type="password"
//                         placeholder="Password"
//                         onChange={handleChange}
//                         value={form.password}
//                         name='password'
//                         className="w-full border p-2 rounded"
//                     />

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white p-2 rounded"
//                     >
//                         Login
//                     </button>
//                 </form>

//                 {msg && <p className=''>{msg}</p>}

//                 <div>
//                     Don't have an account? {''}
//                     <a href="/signup" className='text-blue-500 hover:underline'>
//                         Sign up
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// }


// export default Login








import React, { useState } from 'react'
import { saveToken } from '../utils/auth'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const [form, setForm] = useState({ email: "", password: "" })
    const [msg, setMsg] = useState("")
    const [msgType, setMsgType] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMsg('')
        setLoading(true)
        try {
            const response = await fetch(`${BASEURL}/api/token/`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await response.json()
            if (response.ok) {
                if (!data.access || !data.refresh) {
                    setMsgType("error")
                    setMsg("Error: Missing tokens in response")
                    return
                }
                saveToken(data)
                setMsgType("success")
                setMsg("Login successful! Redirecting...")
                setTimeout(() => navigate('/'), 1000)
            } else {
                setMsgType("error")
                setMsg(data.detail || JSON.stringify(data) || "Login failed, please try again")
            }
        } catch (error) {
            setMsgType("error")
            setMsg("An error occurred: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center px-4 py-24'>

            {/* Card */}
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
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                            <polyline points="10 17 15 12 10 7"/>
                            <line x1="15" y1="12" x2="3" y2="12"/>
                        </svg>
                    </div>
                    <h2 className='text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent tracking-tight'>
                        Welcome Back
                    </h2>
                    <p className='text-gray-400 text-sm mt-1'>Login to your Muaz Cart account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='space-y-4'>

                    {/* Email */}
                    <div className='space-y-1'>
                        <label className='text-xs font-medium text-emerald-700 ml-1'>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={form.email}
                            className='
                                w-full px-4 py-3 rounded-xl text-sm
                                bg-white/70 border border-emerald-100
                                text-gray-700 placeholder-gray-300
                                focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100
                                transition-all duration-200
                            '
                        />
                    </div>

                    {/* Password */}
                    <div className='space-y-1'>
                        <label className='text-xs font-medium text-emerald-700 ml-1'>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            value={form.password}
                            className='
                                w-full px-4 py-3 rounded-xl text-sm
                                bg-white/70 border border-emerald-100
                                text-gray-700 placeholder-gray-300
                                focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100
                                transition-all duration-200
                            '
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
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
                                Logging in...
                            </>
                        ) : 'Login'}
                    </button>
                </form>

                {/* Message */}
                {msg && (
                    <div className={`
                        mt-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2
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
                        {msg}
                    </div>
                )}

                {/* Signup Link */}
                <p className='text-center text-sm text-gray-400 mt-6'>
                    Don't have an account?{' '}
                    <Link to='/signup' className='text-emerald-600 font-medium hover:text-emerald-700 transition-colors'>
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login