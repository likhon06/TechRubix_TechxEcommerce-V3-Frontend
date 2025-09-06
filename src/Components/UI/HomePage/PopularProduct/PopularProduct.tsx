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
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: { xs: 'flex-start', md: 'space-between' },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        mb: 4,
                        px: 2,
                        gap: { xs: 3, md: 0 }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography 
                            variant='h4'
                            fontWeight={700}
                            sx={{
                                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 1,
                                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
                            }}
                        >
                            Most Popular Products
                        </Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={{ 
                                maxWidth: { xs: '100%', md: 500 },
                                fontSize: { xs: '0.875rem', sm: '1rem' }
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat.
                        </Typography>
                    </Box>

                    <Box sx={{ 
                        alignSelf: { xs: 'stretch', md: 'auto' },
                        mt: { xs: 0, md: 0 }
                    }}>
                        <Link href="/products" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                endIcon={<MdOutlineKeyboardArrowRight />}
                                sx={{
                                    width: { xs: '100%', md: 'auto' },
                                    px: { xs: 3, md: 4 },
                                    py: { xs: 1.25, md: 1.5 },
                                    borderRadius: 6,
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    fontWeight: 600,
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    boxShadow: 3,
                                    minWidth: { xs: 'auto', md: '140px' },
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
                </Box>
                <Grid container spacing={{ xs: 2, sm: 3 }} px={{ xs: 1, sm: 2 }}>
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