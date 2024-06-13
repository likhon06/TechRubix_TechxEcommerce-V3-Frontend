"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Link from 'next/link';



interface deletedResponse {
    data: {
        acknowledged: boolean;
        deletedCount: number;
    }
}

interface MakeAdminResponse {
    data: {
        acknowledged: boolean
        modifiedCount: number
        upsertedId: any
        upsertedCount: number
        matchedCount: number
    }
}


const ShowCartDataTable = ({ cart }: { cart: any }) => {


    // const handleUserDelete = async (id: string) => {
    //     const res = await deleteUser(id) as deletedResponse;
    //     console.log(res?.data?.deletedCount);
    //     if (res?.data?.deletedCount == 1) {
    //         toast.success(`${id} user deleted successfully`);
    //         router.refresh();
    //     } else {
    //         toast.error(`something went wrong!`);
    //     }
    // }
 
    console.log('fffff');

    const handleDeleteCartData = (id : string) => {

    }

    const handleCashOnDelivery = () => {
         
    }

    return (
        <TableBody>
            <TableRow
                key={cart?._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                style={{
                    tableLayout: "fixed", width: "100%",

                }}
            >
                <TableCell align="right">{cart?.ProductId}</TableCell>
                <TableCell align="right">{cart?.ProductName}</TableCell>
                <TableCell align="right">{cart?.ProductPrice}</TableCell>
                <TableCell align="right">
                    <Button onClick={() => handleDeleteCartData(cart.ProductId)} variant="contained" color="error">Delete</Button>
                </TableCell>
                <TableCell align="right"><Button variant="contained" color="success" onClick={handleCashOnDelivery}>CashOnDelivery</Button></TableCell>
            </TableRow>
        </TableBody>
    )
}

export default ShowCartDataTable 