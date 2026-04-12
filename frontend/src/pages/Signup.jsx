import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToken } from '../utils/auth'

function Signup() {

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2 : ""
  })

  const [msg, setMsg] = useState("")
  const nav = useNavigate()


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      const res = await fetch(`${BASEURL}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json()
      if (res.ok) {
        saveToken(data);
        setMsg("Login successfull....")
        setTimeout(() => {
          nav('/login')
        }, 1200)
      } else {
        setMsg(data.username || data.password || JSON.stringify(data))
      }
    } catch (error) {
      console.error(error)
      setMsg("Signup failed!")
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-6'>
      <div className='max-w-md w-full bg-white p-6 rounded shadow'>
        <h2 className='text-2xl font-bold mb-4'>Signup</h2>
        <form onSubmit={handleSubmit} className='space-y-3'>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={form.username}
            placeholder='Enter username'
          />
          
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder='Enter email'
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder='Enter password'
          />
          <input
            type="password"
            name="password2"
            value={form.password2}
            onChange={handleChange}
            placeholder='Enter username'
          />
          <button
            type="submit"
            className='w-full bg-blue-500 text-white p-2 rounded'
          >
            Signup
          </button>

        </form>

        {msg && <p className='mt-3 text-sm'>{msg}</p>}
      </div>
    </div>
  )
}

export default Signup