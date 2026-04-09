// import React, { useEffect, useState } from 'react'

// function App() {

//   const [message, setMessage] = useState('')

//   useEffect(() => {
//     setInterval(() => {
//       fetch('http://127.0.0.1:8000/api/')
//       .then(response => response.json())
//       .then(data => setMessage(data.message))
//       .catch(error => console.error('Error fetching message:', error))
//     }, 3000)
//   }, [])

//   return (
//     <div>
//       <h1>Message from backend:</h1>
//       <p>{message || 'Loading...'} </p>
//     </div>
//   )
// }

// export default App




// import React, { useEffect, useState } from 'react'
// import './index.css'


// function App() {

//   const [products, setProducts] = useState([])

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/products/')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching message:', error))
//   }, [])

//   return (
//     <div className='min-h-screen bg-gray-100 text-gray-800 '>
//       <h1 className='text-3xl font-bold underline'>Product List</h1>
//       <div className='container mx-auto p-4'>
//         {products.map((product) => (
//           <div key={product.id} className='border m-3 p-4 bg-gray-200'>
//             <h2 className='text-2xl font-semibold'>{product.name}</h2>
//             <p className='text-gray-600'>{product.description}</p>
//             <p className='text-gray-800 font-bold'>{product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>


//   )
// }

// export default App



import React from 'react'
import ProductsList from "./pages/ProductsList";
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Navbar from './components/NavBar';
import CartPage from './pages/CartPage';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductsList />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </>
  )
}

export default App



