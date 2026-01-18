import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input';
import CompaniesTable from './CompaniesTable';
import { setSearchJobByText } from '../../../redux/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import AdminjobsTable from './AdminjobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

const AdminJobs = () => {
  useGetAllAdminJobs();

    const[input,setInput]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(setSearchJobByText(input));
    },[input])
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-center'>
                <Input className="w-fit" placeholder="filter by name"
                onChange={(e)=>setInput(e.target.value)}
                />
                <Button onClick={()=>navigate("/admin/jobs/create")}>New Company</Button>
            </div>
            <AdminjobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs