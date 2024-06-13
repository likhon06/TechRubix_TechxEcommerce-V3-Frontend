
import { Box, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import Paper from '@mui/material/Paper';
import ShowUserTable from '@/Components/UI/ShowUserTable/ShowUserTable';
const allUsersPage = async () => {
    const res = await fetch('http://localhost:5000/all-users', {
        next: {
            revalidate: 1
        }
    });
    const allUsers = await res.json();
    return (
        <Box className='mt-24'>
            <TableContainer component={Paper} style={{
                tableLayout: "fixed", width: "100%",
            }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{
                    tableLayout: "fixed", width: "100%",
                    border: '1px solid rgba(224, 224, 224, 10)'
                         
                }}>
                    <TableHead >
                        <TableRow >
                            <TableCell>ID</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Action</TableCell>
                            <TableCell align="right">Make Admin</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        allUsers?.map((user: any) =>
                            <ShowUserTable
                                key={user?._id}
                                user={user} />)
                    }
                </Table>
            </TableContainer>

        </Box>
    )
}

export default allUsersPage