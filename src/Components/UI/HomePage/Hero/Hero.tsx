"use client"
import Image from "next/image"
import { Box, Skeleton, useTheme, useMediaQuery, IconButton, Fade } from "@mui/material"
import { useEffect, useState } from "react"
import Glide from "@glidejs/glide"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [glideInstance, setGlideInstance] = useState<Glide | null>(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const slides = [
    {
      src: "https://dlcdnwebimgs.asus.com/gain/F913AABE-A7FC-4997-9490-F1EF4FF734DA/fwebp",
      alt: "ASUS Gaming Laptops - High Performance"
    },
    {
      src: "https://dlcdnwebimgs.asus.com/gain/5F92407A-A9AD-48B5-9117-6DB04B6431A9/fwebp",
      alt: "ASUS ROG Gaming Series"
    },
    {
      src: "https://dlcdnwebimgs.asus.com/gain/EFC25057-77EB-4531-905F-2D75B3FDC298/fwebp",
      alt: "ASUS TUF Gaming Collection"
    },
    {
      src: "https://dlcdnwebimgs.asus.com/gain/3BADD312-0E9D-4C2C-BC7C-8C205E8324ED/fwebp",
      alt: "ASUS ProArt Professional Series"
    },
    {
      src: "https://dlcdnwebimgs.asus.com/gain/AD829375-EE30-44B0-A8B2-F0D4309B54FC/fwebp",
      alt: "ASUS ZenBook Ultrabook"
    },
    {
      src: "https://dlcdnwebimgs.asus.com/gain/1AE907C1-3EC7-43D1-95C8-48318C6C2260/fwebp",
      alt: "ASUS VivoBook Everyday Laptop"
    }
  ];

  useEffect(() => {
    // Initialize carousel after component mounts
    const initCarousel = () => {
    const slider = new Glide(".glide-06", {
      type: "carousel",
      focusAt: "center",
      perView: 1,
        autoplay: 4000,
        animationDuration: 800,
        gap: 0,
        startAt: 0,
        rewind: true,
        rewindDuration: 1200,
        hoverpause: true,
        keyboard: true,
        dragThreshold: 120,
        breakpoints: {
          1024: {
            perView: 1,
            gap: 0
          },
          768: {
            perView: 1,
            gap: 0
          }
        }
      });

      slider.on('mount.after', () => {
        setIsLoaded(true);
      });

      slider.mount();
      setGlideInstance(slider);
    };

    // Small delay to ensure DOM is ready and prevent flash
    const timer = setTimeout(initCarousel, 150);

    return () => {
      clearTimeout(timer);
      if (glideInstance) {
        glideInstance.destroy();
    }
    };
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <Skeleton 
          variant="rectangular" 
          height={isMobile ? 300 : isTablet ? 400 : 500} 
          sx={{ width: '100%' }}
        />
      )}

      {/* Carousel Container */}
      <Box 
        className="glide-06" 
        sx={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
          position: 'relative',
          width: '100%',
          '& .glide__track': {
            overflow: 'hidden'
          },
          '& .glide__slides': {
            display: 'flex',
            alignItems: 'center'
          }
        }}
      >
        {/* Slides */}
        <Box className="overflow-hidden" data-glide-el="track">
          <Box 
            className="whitespace-no-wrap flex-no-wrap relative flex w-full overflow-hidden p-0"
            sx={{
              '& > *': {
                flexShrink: 0,
                width: '100%',
                listStyle: 'none'
              }
            }}
          >
            {slides.map((slide, index) => (
              <Box key={index} component="li">
                <Image 
                  src={slide.src} 
                  alt={slide.alt} 
                width={2000}
                  height={500}
                  style={{
                    width: '100%',
                    height: isMobile ? '300px' : isTablet ? '400px' : '500px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  priority={index === 0}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Navigation Controls */}
        <Box
          className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4"
          data-glide-el="controls"
          sx={{
            transform: 'translateY(-50%)',
            zIndex: 2,
            px: { xs: 2, md: 4 }
          }}
        >
          <IconButton
            data-glide-dir="<"
            aria-label="Previous slide"
            sx={{
              width: { xs: 40, sm: 48, md: 56 },
              height: { xs: 40, sm: 48, md: 56 },
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                transform: 'scale(1.05)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ChevronLeft sx={{ fontSize: { xs: 20, md: 24 } }} />
          </IconButton>
          
          <IconButton
            data-glide-dir=">"
            aria-label="Next slide"
            sx={{
              width: { xs: 40, sm: 48, md: 56 },
              height: { xs: 40, sm: 48, md: 56 },
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                transform: 'scale(1.05)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ChevronRight sx={{ fontSize: { xs: 20, md: 24 } }} />
          </IconButton>
        </Box>

        {/* Indicators */}
        <Box
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
          data-glide-el="controls[nav]"
          sx={{
            zIndex: 2,
            gap: 1
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              component="button"
              data-glide-dir={`=${index}`}
              aria-label={`Go to slide ${index + 1}`}
              sx={{
                width: { xs: 10, md: 12 },
                height: { xs: 10, md: 12 },
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transform: 'scale(1.2)'
                },
                '&.glide__bullet--active': {
                  backgroundColor: 'white',
                  transform: 'scale(1.3)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Hero