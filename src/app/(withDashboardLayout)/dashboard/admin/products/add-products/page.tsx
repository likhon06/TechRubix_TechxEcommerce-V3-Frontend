"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type FormValues = {
    name: string;
    category: string;
    regular_price: string;
    discount: string;
    sale_price: string;
    description: string;
    flashsale: boolean;
    stock: number;
    file: FileList;
};

const AddProductPage = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const formData = new FormData();
            console.log(data)
            formData.append("image", data.file[0]);
            console.log(data.file[0].name);
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_KEY}`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Image uploaded successfully:", result);
                const supp = {
                    image: result.data.url,
                    name: data.name,
                    category: data.category,
                    regular_price: data.regular_price,
                    sale_price: data.sale_price,
                    discount: data.discount,
                    description: data.description
                };

                console.log(supp);

                try {
                    const res = await fetch('https://tr-ecom-backend.vercel.app/flash-products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(supp),
                    });

                    if (res.ok) {
                        const result = await res.json();
                        console.log('Uploaded', result);
                        toast.success(`${data.name} Uploaded Successfully`)
                        router.push(`/dashboard`);
                    } else {
                        console.error('Error uploading:', res.statusText);
                    }
                } catch (error) {
                    console.error('Error during fetch:', error);
                }
            } else {
                console.error("Image upload failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during image upload:", error);
        }
    };

    return (
        <>
            <Box sx={{ marginTop: "" }}>
                <Typography sx={{
                    fontWeight: '500px',
                    fontFamily: ''
                }}>Add Product</Typography>
                <Box component="form" className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                    <Box className='grid grid-cols-1'>
                        <Box className='grid grid-cols-2 gap-4 items-start'>
                            <TextField label="Name" {...register("name")} id="name" />
                            <TextField sx={{ marginTop: "" }} fullWidth  {...register("category")} label="Category" id="category" />
                            <TextField sx={{ marginTop: "20px" }}  {...register("regular_price")} label="Regular Price" id="regularprice" />
                            <TextField sx={{ marginTop: "20px" }} {...register("sale_price")} label="Sale Price" id="saleprice" />
                            <TextField sx={{ marginTop: "20px" }}  {...register("flashsale")} label="Flash Sale" id="flashsale" />
                            <TextField sx={{ marginTop: "20px" }} {...register("stock")} label="Stock" id="stock" />
                        </Box>
                        <Textarea
                            minRows={6}
                            placeholder="Description type in here…"
                            sx={{
                                '&::before': {
                                    border: '1.5px solid var(--Textarea-focusedHighlight)',
                                    transform: 'scaleX(0)',
                                    left: '2.5px',
                                    right: '2.5px',
                                    bottom: 0,
                                    top: 'unset',
                                    transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                                    borderRadius: 0,
                                    borderBottomLeftRadius: '64px 20px',
                                    borderBottomRightRadius: '64px 20px',
                                },
                                '&:focus-within::before': {
                                    transform: 'scaleX(1)',
                                },
                                marginTop: '20px'
                            }}
                            {...register("description")}
                        />
                        <TextField sx={{ marginTop: "20px" }} {...register("discount")} label="Discount" id="discount" />

                        <Button
                            component="label"
                            variant="contained"
                            {...register("file", { required: true })}
                            startIcon={<CloudUploadIcon />}
                            sx={{ marginTop: "20px", padding: "15px", borderRadius: 50 }}
                        >
                            Upload file
                            <VisuallyHiddenInput name="file" type="file" />
                        </Button>
                        <Button
                            sx={{ marginTop: "20px", padding: "15px", borderRadius: 50 }}
                            color='success'
                            variant='contained'
                            fullWidth
                            type="submit"

                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AddProductPage;
