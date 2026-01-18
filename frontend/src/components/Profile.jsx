import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';


// const skills=["html","css","javaScript","reactjs"]
const isResume=true;
const Profile = () => {
    useGetAppliedJobs();
    const [open,setOpen]=useState(false);
    const {user}=useSelector(store=>store.auth)
  return (
    <div>
        <Navbar/>
        <div className='max-w-5xl mx-auto bg-white border border-gray-500 rounded-2xl my-5 p-8'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar className='h-24 w-24'>
                        <AvatarImage src="https://imgs.search.brave.com/jBrp9nUWuRSA19eHAWB8Aqe291Wi-QBNu4DPQKtICLE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/Ny8xNS9tb2Rlcm4t/Z2xvYmUtaWNvbnMt/bG9nb3MtdmVjdG9y/LTM1ODQ3MTUuanBn">
                        </AvatarImage>
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl '>{user?.fullName}</h1>
                        <p>{user?.profile?.bio}</p>
                    </div>
                    <Button onClick={()=>setOpen(true)} className="text-right" variant="outline"><Pen/></Button>
                </div>
                </div>
                <div className=' my-5 gap-4'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail/>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact/>
                        <span>{user?.phoneNumber}</span>
                    </div>
            </div>
            <div className='my-5'>

                <h1 className='font-bold'>Skills</h1>
                <div className='flex items-center gap-1 rounded'>
                {
                    user?.profile?.skills.length !==0 ? user?.profile?.skills.map((item,index)=><Badge key={index} className={"bg-purple-600"}>{item}</Badge>):<span>NA</span>
                }
                </div>
            </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume?<a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor'>{user?.profile?.resumeOriginalName}</a>:<span>NA</span>
                    }
                </div>
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
            <h1 className='font-bold text-lg my-5'>AppliedJobs</h1>
            <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}></UpdateProfileDialog>
    </div>
  )
}

export default Profile;