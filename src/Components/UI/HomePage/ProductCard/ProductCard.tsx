import { Box, Typography, Grid, Button, Container } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import FlashSaleHomeCards from '../../Messycomponents/FlashSaleHomeCards'

const ProductCard = ({ flashsaledata }: { flashsaledata: any }) => {

  console.log(flashsaledata);

    return (
        <Box sx={{ mt: 8, mb: 4 }}>
            <Container maxWidth="xl">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={4}
                    px={2}
                >
                    <Typography 
                        variant='h4'
                        fontWeight={700}
                        sx={{
                            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Flash Sale
                    </Typography>
                    <Link href="/flashsale" style={{ textDecoration: 'none' }}>
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
                    {flashsaledata.slice(0,4).map((fdata: any) => (
                        <Grid item xs={12} sm={6} md={3} key={fdata._id}>
                            <FlashSaleHomeCards fdata={fdata} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default ProductCard