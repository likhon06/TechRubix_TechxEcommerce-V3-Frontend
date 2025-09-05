"use client";
import { useForm, SubmitHandler } from "react-hook-form"
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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                {...register("name", { required: "Product name is required" })}
                                label="Product Name"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                InputProps={{
                                    startAdornment: <Inventory sx={{ mr: 1, color: 'text.secondary' }} />
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!errors.category}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    {...register("category", { required: "Category is required" })}
                                    label="Category"
                                    startAdornment={<Category sx={{ mr: 1, color: 'text.secondary' }} />}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...register("regular_price", { required: "Regular price is required" })}
                                label="Regular Price"
                                type="number"
                                fullWidth
                                error={!!errors.regular_price}
                                helperText={errors.regular_price?.message}
                                InputProps={{
                                    startAdornment: <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...register("sale_price")}
                                label="Sale Price"
                                type="number"
                                fullWidth
                                InputProps={{
                                    startAdornment: <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...register("discount")}
                                label="Discount (%)"
                                type="number"
                                fullWidth
                                inputProps={{ min: 0, max: 100 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        {...register("flashsale")}
                                        color="warning"
                                    />
                                }
                                label="Flash Sale Item"
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
    return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                {...register("description", { required: "Description is required" })}
                                label="Product Description"
                                multiline
                                rows={6}
                                fullWidth
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                InputProps={{
                                    startAdornment: <Description sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }} />
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Paper
                            sx={{
                                    p: 3,
                                    border: '2px dashed',
                                    borderColor: 'divider',
                                    textAlign: 'center',
                                    backgroundColor: 'grey.50'
                                }}
                            >
                                <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    Upload Product Image
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Choose a high-quality image for your product
                                </Typography>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                                    sx={{ mb: 2 }}
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
                                    <Box sx={{ mt: 2 }}>
                                        <img 
                                            src={uploadedImage} 
                                            alt="Preview" 
                                            style={{ 
                                                maxWidth: '200px', 
                                                maxHeight: '200px', 
                                                objectFit: 'cover',
                                                borderRadius: '8px'
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
                        <Typography variant="h6" gutterBottom>
                          Review Your Product
                        </Typography>
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        {uploadedImage && (
                                            <img 
                                                src={uploadedImage} 
                                                alt="Product" 
                                                style={{ 
                                                    width: '100%', 
                                                    height: '150px', 
                                                    objectFit: 'cover',
                                                    borderRadius: '8px'
                                                }} 
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant="h6">{watchedValues.name}</Typography>
                                        <Chip label={watchedValues.category} color="primary" sx={{ mb: 1 }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                          {watchedValues.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                                            <Typography variant="h6" color="primary">
                                              ${watchedValues.regular_price}
                                            </Typography>
                                            {watchedValues.sale_price && (
                                                <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                                  ${watchedValues.sale_price}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            <Chip 
                                                label={`Stock: ${watchedValues.stock}`} 
                                                color="info" 
                                                size="small" 
                                            />
                                            {watchedValues.flashsale && (
                                                <Chip label="Flash Sale" color="warning" size="small" />
                                            )}
                                            {watchedValues.discount && (
                                                <Chip label={`${watchedValues.discount}% OFF`} color="success" size="small" />
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
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                  Add New Product
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Create a new product listing for your store
                </Typography>
            </Box>

            {/* Stepper */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel={!isMobile}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>

            {/* Form */}
            <Card>
                <CardContent sx={{ p: 4 }}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        {renderStepContent(activeStep)}
                        
                        <Divider sx={{ my: 3 }} />
                        
                        {/* Navigation Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                        </Button>
                            <Box>
                                {activeStep === steps.length - 1 ? (
                        <Button
                            type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        startIcon={loading ? <LinearProgress /> : <CheckCircle />}
                                        sx={{ minWidth: 120 }}
                                    >
                                        {loading ? 'Uploading...' : 'Submit Product'}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
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
