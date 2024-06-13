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
import { useDeleteUserMutation } from '@/redux/features/user.admin.delete';
import { useMakeUserAdminMutation } from '@/redux/features/make.admin.edit';


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


const ShowUserTable = ({ user }: { user: any }) => {
    const [deleteUser, { isLoading, isError }] = useDeleteUserMutation(undefined);
    const [makeUserAdmin] = useMakeUserAdminMutation(undefined);
    const router = useRouter();
    if (isLoading) {
        <p>Loading.....</p>
    }
    const handleUserDelete = async (id: string) => {
        const res = await deleteUser(id) as deletedResponse;
        console.log(res?.data?.deletedCount);
        if (res?.data?.deletedCount == 1) {
            toast.success(`${id} user deleted successfully`);
            router.refresh();
        } else {
            toast.error(`something went wrong!`);
        }
    }

    const handleMakeAdmin = async (id: string) => {
        const res = await makeUserAdmin(id) as MakeAdminResponse;
        console.log(res?.data?.modifiedCount == 1);
        if (res?.data?.modifiedCount == 1) {
            toast.success(`${id} user admin successfully`);
            router.refresh();
        } else {
            toast.error(`something went wrong!`);
        }
    }

    return (
        <TableBody>
            <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                style={{
                    tableLayout: "fixed", width: "100%",

                }}
            >
                <TableCell align="right">{user._id}</TableCell>
                <TableCell align="right">{user.first_name}</TableCell>
                <TableCell align="right">{user.last_name}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user?.role === 'admin' ? 'Admin' : 'user'}</TableCell>
                {
                    user?.role === 'admin' ? 
                    <TableCell align="right"><Button onClick={() => handleUserDelete(user._id)} variant="contained" color="error" disabled>Delete</Button></TableCell>
                    :
                    <TableCell align="right"><Button onClick={() => handleUserDelete(user._id)} variant="contained" color="error">Delete</Button></TableCell>
                }
                <TableCell align="right"><Button variant="contained" color="success" onClick={() => handleMakeAdmin(user._id)} >Make Admin</Button></TableCell>
            </TableRow>
        </TableBody>
    )
}

export default ShowUserTable