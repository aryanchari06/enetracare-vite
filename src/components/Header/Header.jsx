import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='flex items-center justify-around py-3 bg-teal-700 text-white'>
      <div className='flex items-center gap-2'>
        <div>
          <h1 className='border-black border p-3'>Logo</h1>
        </div>
        <div className='flex items-start flex-col'>
          <Link to='/' className='text-3xl font-semibold'>eNetraCare</Link>
          <em className="tagline text-sm">A visionary initiative by Innovease India Pvt. Ltd. </em>
        </div>
      </div>


      <div className='text-md'>
        <Link className='px-2' to='/'>Home</Link>
        <Link className='px-2' to='/about'>About</Link>
        <Link className='px-2' to='/services'>Services</Link>
        <Link className='px-2' to='/patient-resources'>Patient</Link>
        <Link className='px-2' to='/testimonials'>Testimonials</Link>
        <Link className='px-2' to='/contact-us'>Contact Us</Link>
      </div>
    </div>
  )
}

export default Header
