"use client"
import { useProductDeleteMutation } from '@/redux/features/product.delete'
import { useUpdateProductMutation } from '@/redux/features/update.product';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Link from 'next/link';

interface deletedResponse {
    data: {
        acknowledged: boolean;
        deletedCount: number;
    }
}

interface updateResponse {
    data: {
        acknowledged: boolean;
        deletedCount: number;
    }
}


function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}



const ShowProductsTable = ({ tablep }: { tablep: any }) => {
    const [productDelete, { isLoading, isError }] = useProductDeleteMutation(undefined);
    const [productUpdate] = useUpdateProductMutation(undefined);
    const router = useRouter();
    if (isLoading) {
        <p>Loading.....</p>
    }
    const handleDelete = async (id: string) => {
        const res = await productDelete(id) as deletedResponse;
        console.log(res?.data?.deletedCount);
        if (res?.data?.deletedCount == 1) {
            toast.success(`${id} prouduct deleted successfully`);
            router.refresh();
        } else {
            toast.error(`something went wrong!`);
        }
    }
    const handleUpdate = async (productId: string) => {
        router.push(`/dashboard/update-product/${productId}`)
    }
    return (
        <TableBody>
            <TableRow
                key={tablep._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                style={{
                    tableLayout: "fixed", width: "100%",
                    border: '1px solid rgba(224, 224, 224, 1)'
                }}
                
            >
                <TableCell component="th" scope="row" >{tablep.title}</TableCell>
                <TableCell align="right">{tablep.category}</TableCell>
                <TableCell align="right">{tablep.newPrice}</TableCell>
                <TableCell align="right">{tablep.prevPrice}</TableCell>
                <TableCell align="right">{tablep.rating ? tablep.rating : `not rated!`}</TableCell>
                <TableCell align="right">{tablep.flashsale ? "Yes" : "No"}</TableCell>
                <TableCell align="right"><Button onClick={() => handleDelete(tablep._id)} sx={{
    borderRadius: 50
  }} variant="contained" color="error">Delete</Button></TableCell>
                <TableCell  align="right"><Button sx={{
    borderRadius: 50
  }} variant="contained"  color="success" onClick={() => handleUpdate(tablep._id)}>Update</Button></TableCell>
            </TableRow>
        </TableBody>
    )
}

export default ShowProductsTable