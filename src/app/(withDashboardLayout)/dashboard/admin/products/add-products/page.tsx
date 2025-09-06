"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import Image from 'next/image';
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    Card, 
    CardContent, 
    Grid, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    FormControlLabel, 
    Switch, 
    Paper, 
    Stepper, 
    Step, 
    StepLabel, 
    Chip,
    Alert,
    LinearProgress,
    useTheme,
    useMediaQuery,
    Divider
} from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { 
    Inventory, 
    Category, 
    AttachMoney, 
    LocalShipping, 
    Description,
    Image as ImageIcon,
    CheckCircle
} from '@mui/icons-material';

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

const steps = ['Product Details', 'Pricing & Inventory', 'Media & Description', 'Review & Submit'];

const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Books',
    'Beauty',
    'Toys',
    'Automotive',
    'Health',
    'Food & Beverage'
];

const AddProductPage = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            flashsale: false,
            stock: 0
        }
    });

    const watchedValues = watch();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", data.file[0]);
            
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_KEY}`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                const productData = {
                    image: result.data.url,
                    name: data.name,
                    category: data.category,
                    regular_price: data.regular_price,
                    sale_price: data.sale_price,
                    discount: data.discount,
                    description: data.description,
                    stock: data.stock,
                    flashsale: data.flashsale
                };

                    const res = await fetch('https://tech-rubix-backend.vercel.app/flash-products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    body: JSON.stringify(productData),
                    });

                    if (res.ok) {
                    toast.success(`${data.name} uploaded successfully!`);
                    router.push(`/dashboard/admin/products`);
                    } else {
                    toast.error('Failed to upload product');
                }
            } else {
                toast.error('Image upload failed');
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error('An error occurred while uploading');
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                        <Grid item xs={12}>
                            <TextField
                                {...register("name", { required: "Product name is required" })}
                                label="Product Name"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                size={isMobile ? "small" : "medium"}
                                InputProps={{
                                    startAdornment: <Inventory sx={{ mr: 1, color: 'text.secondary', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    },
                                    '& .MuiInputBase-input': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={!!errors.category} size={isMobile ? "small" : "medium"}>
                                <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Category</InputLabel>
                                <Select
                                    {...register("category", { required: "Category is required" })}
                                    label="Category"
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: { xs: '0.875rem', sm: '1rem' }
                                        }
                                    }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("stock", { 
                                    required: "Stock is required",
                                    min: { value: 0, message: "Stock must be 0 or greater" }
                                })}
                                label="Stock Quantity"
                                type="number"
                                fullWidth
                                error={!!errors.stock}
                                helperText={errors.stock?.message}
                                size={isMobile ? "small" : "medium"}
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    },
                                    '& .MuiInputBase-input': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("regular_price", { required: "Regular price is required" })}
                                label="Regular Price"
                                type="number"
                                fullWidth
                                error={!!errors.regular_price}
                                helperText={errors.regular_price?.message}
                                size={isMobile ? "small" : "medium"}
                                InputProps={{
                                    startAdornment: <AttachMoney sx={{ mr: 1, color: 'text.secondary', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    },
                                    '& .MuiInputBase-input': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("sale_price")}
                                label="Sale Price"
                                type="number"
                                fullWidth
                                size={isMobile ? "small" : "medium"}
                                InputProps={{
                                    startAdornment: <AttachMoney sx={{ mr: 1, color: 'text.secondary', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    },
                                    '& .MuiInputBase-input': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("discount")}
                                label="Discount (%)"
                                type="number"
                                fullWidth
                                size={isMobile ? "small" : "medium"}
                                inputProps={{ min: 0, max: 100 }}
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    },
                                    '& .MuiInputBase-input': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                height: '100%',
                                minHeight: { xs: 56, sm: 56, md: 56 }
                            }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        {...register("flashsale")}
                                        color="warning"
                                            size={isMobile ? "small" : "medium"}
                                        />
                                    }
                                    label={
                                        <Typography sx={{ 
                                            fontSize: { xs: '0.875rem', sm: '1rem' },
                                            fontWeight: 500
                                        }}>
                                            Flash Sale Item
                                        </Typography>
                                    }
                                />
                            </Box>
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                        <Grid item xs={12}>
                            <TextField
                                {...register("description", { required: "Description is required" })}
                                label="Product Description"
                                multiline
                                rows={isMobile ? 4 : isTablet ? 5 : 6}
                                fullWidth
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                size={isMobile ? "small" : "medium"}
                                InputProps={{
                                    startAdornment: <Description sx={{ 
                                        mr: 1, 
                                        color: 'text.secondary', 
                                        alignSelf: 'flex-start', 
                                        mt: 1,
                                        fontSize: { xs: '1.2rem', sm: '1.5rem' }
                                    }} />
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    },
                                    '& .MuiInputBase-input': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: { xs: 2, sm: 3, md: 4 },
                                    border: '2px dashed',
                                    borderColor: 'divider',
                                    textAlign: 'center',
                                    backgroundColor: 'grey.50',
                                    borderRadius: { xs: 2, sm: 3 }
                                }}
                            >
                                <ImageIcon sx={{ 
                                    fontSize: { xs: 36, sm: 48, md: 56 }, 
                                    color: 'text.secondary', 
                                    mb: { xs: 1, sm: 2 } 
                                }} />
                                <Typography 
                                    variant={isMobile ? "subtitle1" : "h6"} 
                                    gutterBottom
                                    sx={{ 
                                        fontSize: { xs: '1rem', sm: '1.25rem' },
                                        fontWeight: 600
                                    }}
                                >
                                    Upload Product Image
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary" 
                                    sx={{ 
                                        mb: { xs: 2, sm: 3 },
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                        px: { xs: 1, sm: 0 }
                                    }}
                                >
                                    Choose a high-quality image for your product
                                </Typography>
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    size={isMobile ? "small" : "medium"}
                                    sx={{ 
                                        mb: { xs: 2, sm: 3 },
                                        minWidth: { xs: 120, sm: 140 },
                                        height: { xs: 36, sm: 40 }
                                    }}
                                >
                                    Choose File
                                    <VisuallyHiddenInput 
                                        {...register("file", { required: "Image is required" })}
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                                {uploadedImage && (
                                    <Box sx={{ 
                                        mt: { xs: 2, sm: 3 },
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <Image 
                                            src={uploadedImage} 
                                            alt="Preview" 
                                            width={isMobile ? 150 : isTablet ? 200 : 250}
                                            height={isMobile ? 150 : isTablet ? 200 : 250}
                                            style={{ 
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                            }} 
                                        />
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                );
            case 3:
                return (
                    <Box>
                        <Typography 
                            variant={isMobile ? "subtitle1" : "h6"} 
                            gutterBottom
                            sx={{ 
                                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                                fontWeight: 600,
                                mb: { xs: 2, sm: 3 }
                            }}
                        >
                          Review Your Product
                        </Typography>
                        <Card sx={{ 
                            mb: { xs: 2, sm: 3 },
                            boxShadow: { xs: 1, sm: 2 },
                            borderRadius: { xs: 2, sm: 3 }
                        }}>
                            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                <Grid container spacing={{ xs: 2, sm: 3 }}>
                                    <Grid item xs={12} sm={4} md={3}>
                                        {uploadedImage && (
                                            <Box sx={{ 
                                                display: 'flex', 
                                                justifyContent: { xs: 'center', sm: 'flex-start' },
                                                mb: { xs: 2, sm: 0 }
                                            }}>
                                                <Image 
                                                    src={uploadedImage} 
                                                    alt="Product" 
                                                    width={300}
                                                    height={isMobile ? 120 : isTablet ? 150 : 180}
                                                    style={{ 
                                                        width: '100%', 
                                                        height: isMobile ? '120px' : isTablet ? '150px' : '180px',
                                                        objectFit: 'cover',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        <Typography 
                                            variant={isMobile ? "subtitle1" : "h6"}
                                            sx={{ 
                                                fontSize: { xs: '1rem', sm: '1.25rem' },
                                                fontWeight: 600,
                                                mb: 1
                                            }}
                                        >
                                            {watchedValues.name || 'Product Name'}
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <Chip 
                                                label={watchedValues.category || 'Category'} 
                                                color="primary" 
                                                size={isMobile ? "small" : "medium"}
                                                sx={{ mb: 1 }}
                                            />
                                        </Box>
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ 
                                                mb: 2,
                                                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                                lineHeight: 1.5,
                                                display: '-webkit-box',
                                                WebkitLineClamp: isMobile ? 3 : 4,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}
                                        >
                                          {watchedValues.description || 'Product description will appear here...'}
                                        </Typography>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            flexDirection: { xs: 'column', sm: 'row' },
                                            gap: { xs: 1, sm: 2 }, 
                                            mb: 2,
                                            alignItems: { xs: 'flex-start', sm: 'center' }
                                        }}>
                                            <Typography 
                                                variant={isMobile ? "subtitle2" : "h6"} 
                                                color="primary"
                                                sx={{ 
                                                    fontSize: { xs: '1rem', sm: '1.25rem' },
                                                    fontWeight: 600
                                                }}
                                            >
                                              ${watchedValues.regular_price || '0'}
                                            </Typography>
                                            {watchedValues.sale_price && (
                                                <Typography 
                                                    variant={isMobile ? "body2" : "h6"} 
                                                    color="text.secondary" 
                                                    sx={{ 
                                                        textDecoration: 'line-through',
                                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                                    }}
                                                >
                                                  ${watchedValues.sale_price}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            gap: 1, 
                                            flexWrap: 'wrap',
                                            justifyContent: { xs: 'flex-start', sm: 'flex-start' }
                                        }}>
                                            <Chip 
                                                label={`Stock: ${watchedValues.stock || 0}`} 
                                                color="info" 
                                                size={isMobile ? "small" : "medium"}
                                                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                                            />
                                            {watchedValues.flashsale && (
                                                <Chip 
                                                    label="Flash Sale" 
                                                    color="warning" 
                                                    size={isMobile ? "small" : "medium"}
                                                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                                                />
                                            )}
                                            {watchedValues.discount && (
                                                <Chip 
                                                    label={`${watchedValues.discount}% OFF`} 
                                                    color="success" 
                                                    size={isMobile ? "small" : "medium"}
                                                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                                                />
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Box sx={{ 
            p: { xs: 2, sm: 3, md: 4 },
            maxWidth: '100%',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <Box sx={{ 
                mb: { xs: 3, sm: 4, md: 5 },
                textAlign: { xs: 'center', sm: 'left' }
            }}>
                <Typography 
                    variant={isMobile ? "h5" : isTablet ? "h4" : "h3"} 
                    component="h1" 
                    sx={{ 
                        fontWeight: 700, 
                        mb: { xs: 1, sm: 2 },
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                    }}
                >
                  Add New Product
                </Typography>
                <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        maxWidth: { xs: '100%', sm: '600px' }
                    }}
                >
                  Create a new product listing for your store
                </Typography>
            </Box>

            {/* Stepper */}
            <Paper sx={{ 
                p: { xs: 2, sm: 3, md: 4 }, 
                mb: { xs: 3, sm: 4, md: 5 },
                overflow: 'hidden'
            }}>
                <Stepper 
                    activeStep={activeStep} 
                    alternativeLabel={!isMobile}
                    orientation={isMobile ? "vertical" : "horizontal"}
                    sx={{
                        '& .MuiStepLabel-root': {
                            '& .MuiStepLabel-label': {
                                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                fontWeight: 500
                            }
                        },
                        '& .MuiStepConnector-root': {
                            display: { xs: 'none', sm: 'block' }
                        }
                    }}
                >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel
                                sx={{
                                    '& .MuiStepLabel-labelContainer': {
                                        '& .MuiStepLabel-label': {
                                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                                            lineHeight: 1.2,
                                            textAlign: { xs: 'left', sm: 'center' }
                                        }
                                    }
                                }}
                            >
                                {isMobile ? `${index + 1}. ${label}` : label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>

            {/* Form */}
            <Card sx={{ 
                boxShadow: { xs: 1, sm: 2, md: 3 },
                borderRadius: { xs: 2, sm: 3 }
            }}>
                <CardContent sx={{ 
                    p: { xs: 2, sm: 3, md: 4 },
                    '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } }
                }}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        {renderStepContent(activeStep)}
                        
                        <Divider sx={{ 
                            my: { xs: 2, sm: 3, md: 4 },
                            mx: { xs: -2, sm: -3, md: -4 }
                        }} />
                        
                        {/* Navigation Buttons */}
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'stretch', sm: 'center' },
                            gap: { xs: 2, sm: 0 }
                        }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outlined"
                                fullWidth={isMobile}
                                sx={{ 
                                    minWidth: { xs: 'auto', sm: 100 },
                                    order: { xs: 2, sm: 1 }
                                }}
                            >
                                Back
                        </Button>
                            <Box sx={{ 
                                order: { xs: 1, sm: 2 },
                                width: { xs: '100%', sm: 'auto' }
                            }}>
                                {activeStep === steps.length - 1 ? (
                        <Button
                            type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        startIcon={loading ? <LinearProgress /> : <CheckCircle />}
                                        fullWidth={isMobile}
                                        sx={{ 
                                            minWidth: { xs: 'auto', sm: 140 },
                                            height: { xs: 48, sm: 40 }
                                        }}
                                    >
                                        {loading ? 'Uploading...' : 'Submit Product'}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        fullWidth={isMobile}
                                        sx={{ 
                                            minWidth: { xs: 'auto', sm: 100 },
                                            height: { xs: 48, sm: 40 }
                                        }}
                                    >
                                        Next
                        </Button>
                                )}
                    </Box>
                </Box>
            </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AddProductPage;
