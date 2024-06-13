"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    title: string;
    category: string;
    previousPrice: string;
    newPrice: string;
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
                    title: data.title,
                    category: data.category,
                    prevPrice: data.previousPrice,
                    newPrice: data.newPrice,
                };

                console.log(supp);

                try {
                    const res = await fetch('http://localhost:5000/top-products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(supp),
                    });

                    if (res.ok) {
                        const result = await res.json();
                        console.log('Uploaded', result);
                        toast.success(`${data.title} Uploaded Successfully`)
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
            <Box sx={{ marginTop: "100px" }}>
                <Typography sx={{
                    fontWeight : "600px"
                }}>Add Product</Typography>
                <Box component="form" className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                    <Box className='grid grid-cols-1'>
                        <TextField fullWidth label="Title" {...register("title")} id="title" />
                        <TextField sx={{ marginTop: "20px" }} fullWidth {...register("category")} label="Category" id="category" />
                        <TextField sx={{ marginTop: "20px" }} fullWidth {...register("previousPrice")} label="Previous Price" id="previousPrice" />
                        <TextField sx={{ marginTop: "20px" }} {...register("newPrice")} fullWidth label="New Price" id="newPrice" />
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
