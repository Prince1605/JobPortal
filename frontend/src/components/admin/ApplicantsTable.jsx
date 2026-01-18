import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../../utils/constant.js";
import { useState } from "react";

const shortListingStatus = ["Accepted","Rejected"]
function ApplicantsTable(){
    const [openId,setOpenId]=useState(null);
    const {applicants} = useSelector(store=>store.application);

    const statusHandler = async(status,id)=>{
try{
    axios.defaults.withCredentials=true;
const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},
    { withCredentials: true }  
);
console.log(res)
if(res.data.status){
    toast.success(res.data.message);
    setOpenId(null);
}
}catch(error){
    toast.error(error?.response?.data?.message || "Something went wrong")
}
    }
    return(
<div>
    <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>FullName</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
                {
                    applicants && applicants?.applications?.map((item)=>(
<tr key={item._id}>
                    <TableCell>{item?.applicant?.fullName}</TableCell>
                    <TableCell>{item?.applicant?.email}</TableCell>
                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                    <TableCell className="text-blue-600">
                        {
                           item.applicant?.profile?.resume ?  <a className="text-blue-600 cursor-pointer"
                           href={item?.applicant?.profile?.resume} target="_blank" rel="noopener norefrence"> {item?.applicant?.profile?.resumeOriginalName}</a>:<span>NA</span>
                        }
                       </TableCell>
                    <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="float-right cursor-pointer">
                        <Popover open={openId === item._id}
              onOpenChange={(open) =>
                setOpenId(open ? item._id : null)
              }>
                            <PopoverTrigger asChild>
                                <MoreHorizontal/>
                            </PopoverTrigger>
                        <PopoverContent className="w-32">
                        {
                            shortListingStatus.map((status,index)=>{
                                return(
                                    <div onClick={()=>statusHandler(status,item._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                                        <span>{status}</span>
                                    </div>
                                )
                            })
                        }
                        </PopoverContent>
                        </Popover>
                    </TableCell>
                </tr>
                    ))
                }
                
            </TableBody>
        
    </Table>
</div>
    )
}
export default ApplicantsTable;