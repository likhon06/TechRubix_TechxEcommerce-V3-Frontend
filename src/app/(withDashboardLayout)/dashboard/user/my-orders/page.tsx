
"use client"
import { Box, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Paper from '@mui/material/Paper';
import ShowCartDataTable from '@/Components/UI/ShowCartDataTable/ShowCartDataTable';
const AllUsersPage = async () => {
  // const [token, setToken] = useState<string | null>(null);
  // const [userEmail, setUserEmail] = useState<string | null>(null);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('Token');
  //   if (storedToken) {
  //     setToken(storedToken);
  //     try {
  //       const decodedToken: {
  //         email: string;
  //       } = jwtDecode(storedToken);
  //       setUserEmail(decodedToken.email);
  //     } catch (error) {
  //       console.error('Invalid token', error);
  //     }
  //   }
  // }, []);
  // const res = await fetch(`http://localhost:5000/cart/${userEmail}`, {
  //   next: {
  //     revalidate: 1
  //   }
  // });
  // const cartDatas = await res.json();
  return (
    <>

    </>
  )
}

export default AllUsersPage