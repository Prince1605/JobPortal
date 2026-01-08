import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading,setUser } from "../../../redux/authSlice";
import { Loader2 } from "lucide-react";


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const {loading}= useSelector(store=>store.auth);
  const navigate =useNavigate();
  const dispatch=useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  // const changeFileHandler = (e) => {
  //   setInput({ ...input, file: e.target.files[0] });
  // };
  const submitHandler = async (e) => {
    e.preventDefault(); 
    try{
      dispatch(setLoading(true));
      const res = await axios.post(
  `${USER_API_END_POINT}/login`,
  input,{
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true
  });

      if(res.data.success){
        dispatch(setUser(res.data.user));
        navigate("/"); //home
        toast.success(res.data.message)
      }
    }catch(error) {
  console.log(error);
  toast.error(error?.response?.data?.message || "Something went wrong");
}

  finally{
    dispatch(setLoading(false))
  }
} 


 

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-400 rounded-md p-4 my-10 "
        >
          <h1 className="font-bold mb-5">Login</h1>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="email do"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
            ></Input>
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Pass de Kutte"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
            ></Input>
          </div>
          <div className="flex items-center justify-between mt-4 gap-2">
            <RadioGroup
              className="flex items-center gap-4 my-5"
              defaultValue="comfortable"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className='w-full my-4' ><Loader2 className="mr-2 w-4 animate-spin" />Please Wait</Button>:
          <Button type="submit" className="w-full my-4">
            Login
          </Button>
          }
          <span className="text-sm">
            Don't have an Account ?{" "}
            <Link to="/signup" className="text-blue-600">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
