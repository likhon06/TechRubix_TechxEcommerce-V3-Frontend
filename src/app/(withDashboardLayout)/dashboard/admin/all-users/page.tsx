"use client"
import { Box, Button, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const AllUsersPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/all-users', {
                    next: {
                        revalidate: 1
                    }
                });
                const data = await res.json();
                const newData = data?.map((d: any) => ({ ...d, id: d?._id }));
                setAllUsers(newData);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


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
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'first_name', headerName: 'First Name', width: 150, editable: true },
        { field: 'last_name', headerName: 'Last Name', width: 150, editable: true },
        { field: 'email', headerName: 'Email', type: 'number', width: 110, editable: true },
        { field: 'role', headerName: 'Role', type: 'number', width: 110, editable: true },
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
        return <div>Loading...</div>;
    }



    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={allUsers}
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
    )
}

export default AllUsersPage