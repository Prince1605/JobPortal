import React from 'react';
import { Table, TableCaption,TableHeader,TableRow,TableHead, TableCell,TableBody } from './ui/table';
import { Badge } from './ui/badge';


const AppliedJobTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>
                A list of your applied job 
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                    [1,2,3,4].map((item,index)=>(
                        <TableRow key={index}>
                            <TableCell>27-12-2024</TableCell>
                            <TableCell>Frontend Developer</TableCell>
                            <TableCell>Micorsoft</TableCell>
                            <TableCell><Badge>Selected</Badge></TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable