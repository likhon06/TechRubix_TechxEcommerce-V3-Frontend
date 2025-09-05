"use client"
import { Box, Button, FormControl, FormGroup, TextField, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import React from 'react'

interface ResponseDataType {
    data: {
        title: string;
        category: string;
        newPrice: number;
        prevPrice: number;
        flashsale: boolean;
        rating: number;
    }
}

const UpdateProductPage = () => {
    const { productId } = useParams();
    const handleFormData = (data: any) => {
        console.log(data);
    }

    const [singleProduct, setSingleProduct] = React.useState<any>(null);
    React.useEffect(() => {
        const load = async () => {
            const res = await fetch(`https://tech-rubix-backend.vercel.app/update-products/${productId}`);
            const data = await res.json();
            setSingleProduct(data);
        };
        load();
    }, [productId]);
    console.log(singleProduct);
    return (
        <>
            <Box sx={{
                marginTop: ""
            }}>
                <Typography sx={{
                    marginBottom: "20px",
                    fontWeight: "700",
                    fontSize: "30px"
                }}>Update product</Typography>
                <Box className='grid grid-cols-2'>
                    <FormGroup onSubmit={handleFormData}>
                        <TextField fullWidth label="ID" id="fullWidth" value={singleProduct?._id} disabled/>
                        <TextField fullWidth label="Title" id="fullWidth" value={singleProduct?.title}  sx={{
                            marginTop: "20px"
                        }}/>
                        <TextField sx={{
                            marginTop: "20px"
                        }} fullWidth label="Category" id="fullWidth" value={singleProduct?.category} />
                        <TextField sx={{
                            marginTop: "20px"
                        }} fullWidth label="Previous Price" id="fullWidth" value={singleProduct?.prevPrice} />
                        <TextField sx={{
                            marginTop: "20px"
                        }} fullWidth label="New Price" id="fullWidth" value={singleProduct?.newPrice} />
                        <Button sx={{
                            marginTop: "20px",
                            padding: "15px",
                        }} variant="contained" color='success' fullWidth type="submit">Update</Button>
                    </FormGroup>
                </Box>
            </Box>

        </>
    )
}

export default UpdateProductPage