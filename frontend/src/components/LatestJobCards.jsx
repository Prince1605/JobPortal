import React from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'

const LatestJobCards = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
        <div>
            <h1 className='font-medium text-lg'>Company Name</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div className=''>
            <h1 className='font-bold text-lg my-2'>Job title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant={Ghost}>12 Positions</Badge>
            <Badge className={'text-red-700 font-bold'} variant={Ghost}>Part Time</Badge>
            <Badge className={'text-purple-700 font-bold'} variant={Ghost}>2LPA</Badge>
        </div>
    
    </div>
  )
}

export default LatestJobCards