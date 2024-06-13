
import ShowProductsTable from '@/Components/UI/ShowProductsTable/ShowProductsTable'
import { Box, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import Paper from '@mui/material/Paper';
const productShowPage = async () => {
    const res = await fetch('http://localhost:5000/top-products', {
        next: {
            revalidate: 1
        }
    });
    const TableProducts = await res.json();
    return (
        <Box className='mt-24' >
            <TableContainer component={Paper} style={{
                tableLayout: "fixed", width: "100%",
            }}>
                <Table sx={{ minWidth: 650 }} size="small"  aria-label="simple table" style={{
                    tableLayout: "fixed", width: "100%",
                }}>
                    <TableHead >
                        <TableRow style={{
                    tableLayout: "fixed", width: "100%",
                    border: '1px solid rgba(224, 224, 224, 1)'
                }}>
                            <TableCell><h1 className='font-bold'>Title</h1></TableCell>
                            <TableCell align="right"><h1 className='font-bold'>Category</h1></TableCell>
                            <TableCell align="right"><h1 className='font-bold'>New Price</h1></TableCell>
                            <TableCell align="right"><h1 className='font-bold'>Previous Price</h1></TableCell>
                            <TableCell align="right"><h1 className='font-bold'>Rating</h1></TableCell>
                            <TableCell align="right"><h1 className='font-bold'>Flash Sale</h1></TableCell>
                            <TableCell align="right"><h1 className='font-bold'>Delete</h1></TableCell>
                            <TableCell align="right"><h1 className='font-bold'>Update</h1></TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        TableProducts?.map((tablep: any) =>
                            <ShowProductsTable
                                key={tablep?._id}
                                tablep={tablep} />)
                    }
                </Table>
            </TableContainer>

        </Box>
    )
}

export default productShowPage