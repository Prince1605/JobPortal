import React from 'react'
import { Button } from './ui/button'
import { Bookmark, Ghost } from 'lucide-react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Job = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-r-gray-100'>
        <div className='flex items-center justify-between'>
        <p className='text-sm  text-gray-600'>2 days ago</p>
        <Button variant='outline' className='rounded-full' size='icon'><Bookmark/></Button>
            
        </div>
        <div className='flex items-center gap-2 my-2'> 
            <Button className='p-6' variant='outline' size='icon' >
                <Avatar>
                    <AvatarImage src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'>

                    </AvatarImage>
                </Avatar>
            </Button>
            <div>
                <h1>
                    Company name
                </h1>
                <p>India</p>
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'> Title</h1>
            <p className='text-sm text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, unde.
            </p>
        </div>
        <div>
            <Badge className={'text-blue-700 font-bold'} variant={Ghost}>12 Positions</Badge>
            <Badge className={'text-red-700 font-bold'} variant={Ghost}>Part Time</Badge>
            <Badge className={'text-purple-700 font-bold'} variant={Ghost}>2LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button variant="outline" >Details</Button>
            <Button className="bg-purple-600">Save For Later</Button>
        </div>
    </div>
  )
}

export default Job