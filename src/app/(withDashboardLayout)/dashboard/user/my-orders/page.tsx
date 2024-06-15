
"use client"
import { Box, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Paper from '@mui/material/Paper';
import ShowCartDataTable from '@/Components/UI/ShowCartDataTable/ShowCartDataTable';
const AllUsersPage = async () => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('Token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken: {
          email: string;
        } = jwtDecode(storedToken);
        setUserEmail(decodedToken.email);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);
  const res = await fetch(`http://localhost:5000/cart/${userEmail}`, {
    next: {
      revalidate: 1
    }
  });
  const cartDatas = await res.json();
  return (
    <Box className=''>
      <TableContainer component={Paper} style={{
        tableLayout: "fixed", width: "100%",
      }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{
          tableLayout: "fixed", width: "100%",

        }}>
          <TableHead >
            <TableRow >
              <TableCell align="right">OrderId</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Product Price</TableCell>
            </TableRow>
          </TableHead>
          {
            cartDatas?.map((cart: any) =>
              <ShowCartDataTable
                key={cart._id}
                cart={cart} />)
          }
        </Table>
      </TableContainer>

    </Box>
  )
}

export default AllUsersPage