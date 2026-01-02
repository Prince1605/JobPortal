import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flext flex-col gap-5 my-10'>

        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-500 font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold' >Search, Apply & <br />Get Your <span className='text-purple-600'>Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quisquam quo.</p>
        <div className='flex  w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto '>
            <input type='text' placeholder='Find your Pasandida jobs' className='outline-none border-none w-full' ></input>
            <Button className='rounded-r-full bg-purple-600'><Search/></Button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection