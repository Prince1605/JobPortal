import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../../utils/constant'
import axios from 'axios'
import { toast } from 'sonner'

const Signup = () => {
    const [input,setInput] = useState({
        fullName:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:null
    });
    const navigate =useNavigate();
    const changeEventHandler =(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
};
    const submitHandler = async (e)=>{
        e.preventDefault();
        const formData= new FormData();
        formData.append("fullName",input.fullName)
        formData.append("email",input.email)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("password",input.password)
        formData.append("role",input.role)
    if(input.file){
        formData.append("file",input.file)
    }
    try{
      const res = await axios.post(
  `${USER_API_END_POINT}/register`,
  formData,{
    headers:{
        "Content-Type":"multipart/form-data"
    },
    withCredentials:true
  });

      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message)
      }


    }catch(error) {
  console.log(error);
  toast.error(error?.response?.data?.message || "Something went wrong");
}
} 


  return (
    <>
    <div>
        <Navbar/>
    <div className='flex items-center justify-center max-w-7xl mx-auto'>

    <form onSubmit={submitHandler} className='w-1/2 border border-gray-400 rounded-md p-4 my-10 '>
        <h1 className='font-bold mb-5'>Signup</h1>
        
        <div>
        <Label>Full Name</Label>
        <Input type="text" placeholder="Prince Mishra" value={input.fullName} onChange={changeEventHandler} name="fullName" ></Input>
        </div>
        <div>
        <Label>Email</Label>
        <Input type="email" placeholder="email do" value={input.email} onChange={changeEventHandler} name="email"></Input>
        </div>
        <div>
        <Label>Phone Number</Label>
        <Input type="text" placeholder="Phone Number de bhadwe" value={input.phoneNumber} onChange={changeEventHandler} name="phoneNumber"></Input>
        </div>
        <div>
        <Label>Password</Label>
        <Input type="password" placeholder="Pass de Kutte" value={input.password} onChange={changeEventHandler} name="password"  ></Input>
        </div>
        <div className='flex items-center justify-between mt-4 gap-2'>
            <RadioGroup className="flex items-center gap-4 my-5" defaultValue="comfortable">
                <div className='flex items-center space-x-2'>
                        <Input 
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role==="student"}
                        onChange={changeEventHandler}
                        className="cursor-pointer"            
                        />
                        <Label htmlFor="r1">Student</Label>
                    
                </div>
                <div className='flex items-center space-x-2'>
                    <Input 
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={input.role==="recruiter"}
                        onChange={changeEventHandler}
                        className="cursor-pointer"            
                        />
                        <Label htmlFor="r2">Recuruiter</Label>
                    
                </div>
            </RadioGroup>
            <div className='flex items-center gap-4'>
                <Label>Profile</Label>
                <Input accept='image/*' 
                type="file" 
                className="cursor-pointer"
                onChange={changeFileHandler} >
                </Input>
            </div>
        </div>
            <Button type='submit' className='w-full my-4'> SignUp</Button>
            <span className='text-sm'>Already have an Account ? <Link to='/login' className='text-blue-600'>Login</Link></span>
    </form>
    </div>
    </div>
    </>
  )
}

export default Signup