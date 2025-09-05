import PopularProductsCard from '@/Components/UI/HomePage/PopularProductsCard/PopularProductsCard';
import { Box, Button, Container, Typography, Grid } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const PopularProduct = ({ populardata }: { populardata: any }) => {

    return (
        <Box sx={{ mt: 12, mb: 4 }}>
            <Container maxWidth="xl">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={4}
                    px={2}
                >
                    <Box>
                        <Typography 
                            variant='h4'
                            fontWeight={700}
                            sx={{
                                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 1
                            }}
                        >
                            Most Popular Products
                        </Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={{ maxWidth: 500 }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat.
                        </Typography>
                    </Box>

                    <Link href="/products" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            endIcon={<MdOutlineKeyboardArrowRight />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 6,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                boxShadow: 3,
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                                    boxShadow: 6,
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease-in-out'
                            }}
                        >
                            View All
                        </Button>
                    </Link>
                </Box>
                <Grid container spacing={3} px={2}>
                    {populardata?.slice(0, 4).map((pdata: any) => (
                        <Grid item xs={12} sm={6} md={3} key={pdata._id}>
                            <PopularProductsCard pdata={pdata} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default PopularProduct