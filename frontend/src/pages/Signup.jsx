// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { saveToken } from '../utils/auth'

// function Signup() {

//   const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     password2 : ""
//   })

//   const [msg, setMsg] = useState("")
//   const nav = useNavigate()


//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setMsg('')
//     try {
//       const res = await fetch(`${BASEURL}/api/register/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form)
//       });
//       const data = await res.json()
//       if (res.ok) {
//         saveToken(data);
//         setMsg("Login successfull....")
//         setTimeout(() => {
//           nav('/login')
//         }, 1200)
//       } else {
//         setMsg(data.username || data.password || JSON.stringify(data))
//       }
//     } catch (error) {
//       console.error(error)
//       setMsg("Signup failed!")
//     }
//   }

//   return (
//     <div className='min-h-screen flex items-center justify-center p-6'>
//       <div className='max-w-md w-full bg-white p-6 rounded shadow'>
//         <h2 className='text-2xl font-bold mb-4'>Signup</h2>
//         <form onSubmit={handleSubmit} className='space-y-3'>
//           <input
//             type="text"
//             name="username"
//             onChange={handleChange}
//             value={form.username}
//             placeholder='Enter username'
//           />
          
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder='Enter email'
//           />
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder='Enter password'
//           />
//           <input
//             type="password"
//             name="password2"
//             value={form.password2}
//             onChange={handleChange}
//             placeholder='Enter username'
//           />
//           <button
//             type="submit"
//             className='w-full bg-blue-500 text-white p-2 rounded'
//           >
//             Signup
//           </button>

//         </form>

//         {msg && <p className='mt-3 text-sm'>{msg}</p>}
//       </div>
//     </div>
//   )
// }

// export default Signup








import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { saveToken } from '../utils/auth'

function Signup() {

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  })
  const [msg, setMsg] = useState("")
  const [msgType, setMsgType] = useState("") // "success" | "error"
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    setLoading(true)
    try {
      const res = await fetch(`${BASEURL}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json()
      if (res.ok) {
        saveToken(data);
        setMsgType("success")
        setMsg("Account created! Redirecting...")
        setTimeout(() => nav('/login'), 1200)
      } else {
        setMsgType("error")
        setMsg(data.username || data.password || JSON.stringify(data))
      }
    } catch (error) {
      console.error(error)
      setMsgType("error")
      setMsg("Signup failed!")
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent tracking-tight'>
            Create Account
          </h2>
          <p className='text-gray-400 text-sm mt-1'>Join Muaz Cart today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>

          {/* Username */}
          <div className='space-y-1'>
            <label className='text-xs font-medium text-emerald-700 ml-1'>Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={form.username}
              placeholder='Enter username'
              className='
                w-full px-4 py-3 rounded-xl text-sm
                bg-white/70 border border-emerald-100
                text-gray-700 placeholder-gray-300
                focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100
                transition-all duration-200
              '
            />
          </div>

          {/* Email */}
          <div className='space-y-1'>
            <label className='text-xs font-medium text-emerald-700 ml-1'>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder='Enter email'
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
              value={form.password}
              onChange={handleChange}
              placeholder='Enter password'
              className='
                w-full px-4 py-3 rounded-xl text-sm
                bg-white/70 border border-emerald-100
                text-gray-700 placeholder-gray-300
                focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100
                transition-all duration-200
              '
            />
          </div>

          {/* Confirm Password */}
          <div className='space-y-1'>
            <label className='text-xs font-medium text-emerald-700 ml-1'>Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={form.password2}
              onChange={handleChange}
              placeholder='Re-enter password'
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
                Creating account...
              </>
            ) : 'Create Account'}
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

        {/* Login Link */}
        <p className='text-center text-sm text-gray-400 mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-emerald-600 font-medium hover:text-emerald-700 transition-colors'>
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Signup