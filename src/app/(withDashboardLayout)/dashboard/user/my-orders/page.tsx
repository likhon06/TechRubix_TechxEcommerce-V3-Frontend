
"use client"
import { Box, Button, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Paper from '@mui/material/Paper';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const AllUsersPage = () => {

  const [tableProducts, setTableProducts] = useState<any[]>([]);
  let [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userCartData, setUserCartData] = useState<string | null>(null);
  const [singleProductData, setSingleProductData] = useState<string | null>(null);
  const [productId, setProductId] = useState<string[]>([]);

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
  }, [])


  useEffect(() => {
    const fetchCart = async () => {
      if (userEmail) {
        try {
          const res = await fetch(`http://localhost:5000/cart/${userEmail}`, {
            next: {
              revalidate: 1,
            },
          });
          const cartDatas = await res.json();
          setUserCartData(cartDatas);
          const newProductIds = cartDatas.map((cd: any) => cd.product_id);
          console.log(newProductIds);
          console.log(newProductIds);
          setProductId(newProductIds);
        } catch (error) {
          console.error('Failed to fetch cart data', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCart();
  }, [userEmail]);
  console.log(productId);
  useEffect(() => {
    const fetchCart_two = async () => {
      if (productId.length > 0) {
        try {
          const fetchProduct = async (id:any) => {
            const res = await fetch(`http://localhost:5000/products/${id}`, {
              next: { revalidate: 1 },
            });
            const singleData = await res.json();
            return singleData;
          };

          const productPromises = productId.map((id) => fetchProduct(id));
          const productResults = await Promise.all(productPromises);

          const newsData = productResults.map((d) => ({ ...d, id: d._id }));
          console.log(newsData);
          setTableProducts(newsData);
        } catch (error) {
          console.error('Failed to fetch cart data', error);
        }
      }
    };
    fetchCart_two();
  }, [productId]);
  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/delete-user/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleUpdate = async (id: string, updatedData: any) => {
    try {
      await fetch(`http://localhost:5000/update-user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 250, editable: true },
    { field: 'category', headerName: 'Category', width: 150, editable: true },
    {
      field:'regular_price', headerName:'Regular Price', width:150, renderCell:(params)=>(
        params.row.regular_price === 0 ? '' : <s>${params.row.regular_price}</s>
      ),
    },
    {
      field:'sale_price', headerName:'Sale Price', width:150, renderCell:(params)=>(
        <p>${params.row.regular_price}</p>
      ),
    },
    { field: 'discount', headerName: 'Discount', type: 'number', width: 110, editable: true },
    {
      field: 'buy',
      headerName: 'Buy',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleUpdate(params.row.id, params.row)}
            style={{ marginRight: 8 }}
          >
            Buy Now
          </Button>
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
            disabled={params.row.role === 'admin'}
          >
            Delete
          </Button>
        </div>
      ),
    }
  ];

 if (loading) {
    return <SyncLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />;
  }


  return (
    <>
      <h1>Cart Total Product Right Now: <span className='font-bold'>{userCartData?.length} </span> (items)</h1>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tableProducts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  )
}

export default AllUsersPage