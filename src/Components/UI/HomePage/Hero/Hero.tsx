"use client"
import Image from "next/image"
import { Box, Skeleton, useTheme, useMediaQuery } from "@mui/material"
import { useEffect, useState, useRef, useCallback } from "react"
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material"

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const slides = [
    {
      src: "https://dlcdnwebimgs.asus.com/gain/F913AABE-A7FC-4997-9490-F1EF4FF734DA/fwebp",
      alt: "ASUS Gaming Laptops - High Performance",
      title: "Gaming Laptops",
      subtitle: "High Performance Gaming"
    },
    {
      src: "https://dlcdnwebimgs.asus.com/gain/5F92407A-A9AD-48B5-9117-6DB04B6431A9/fwebp",
      alt: "ASUS ROG Gaming Series",
      title: "ROG Series",
      subtitle: "Republic of Gamers"
    },
    {
      src: "https://dlcdnwebimgs.asus.com/gain/EFC25057-77EB-4531-905F-2D75B3FDC298/fwebp",
      alt: "ASUS TUF Gaming Collection",
      title: "TUF Gaming",
      subtitle: "Tough & Reliable"
    },
    {
      src: "https://dlcdnwebimgs.asus.com/gain/3BADD312-0E9D-4C2C-BC7C-8C205E8324ED/fwebp",
      alt: "ASUS ProArt Professional Series",
      title: "ProArt Series",
      subtitle: "Professional Creativity"
    },
    {
      src: "https://dlcdnwebimgs.asus.com/gain/AD829375-EE30-44B0-A8B2-F0D4309B54FC/fwebp",
      alt: "ASUS ZenBook Ultrabook",
      title: "ZenBook",
      subtitle: "Ultrabook Excellence"
    },
    {
      src: "https://dlcdnwebimgs.asus.com/gain/1AE907C1-3EC7-43D1-95C8-48318C6C2260/fwebp",
      alt: "ASUS VivoBook Everyday Laptop",
      title: "VivoBook",
      subtitle: "Everyday Computing"
    }
  ];

  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning, slides.length]);

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  useEffect(() => {
    // Mark as hydrated after first render
    setIsHydrated(true);
    
    // Set loaded state after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-play functionality
    if (isLoaded) {
      intervalRef.current = setInterval(goToNextSlide, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoaded, currentSlide, goToNextSlide]);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isLoaded) {
      intervalRef.current = setInterval(goToNextSlide, 4000);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Loading Skeleton - only show on server or before hydration */}
      {!isHydrated || !isLoaded ? (
        <Skeleton 
          variant="rectangular" 
          height={isMobile ? 300 : isTablet ? 400 : 500} 
          sx={{ width: '100%' }}
        />
      ) : null}

      {/* Custom Vertical Carousel */}
      <Box 
        sx={{ 
          opacity: isHydrated && isLoaded ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
          position: 'relative',
          width: '100%',
          height: isMobile ? 300 : isTablet ? 400 : 500,
          overflow: 'hidden'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: index === currentSlide ? 1 : 0,
                transform: `translateY(${index === currentSlide ? 0 : index < currentSlide ? '-100%' : '100%'})`,
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                zIndex: index === currentSlide ? 2 : 1
              }}
            >
              <Image 
                src={slide.src} 
                alt={slide.alt} 
                width={2000}
                height={500}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                priority={index === 0}
              />
              
              {/* Overlay Content */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: 'white',
                  zIndex: 2
                }}
              >
                <Box
                  sx={{
                    transform: index === currentSlide ? 'translateY(0)' : 'translateY(30px)',
                    opacity: index === currentSlide ? 1 : 0,
                    transition: 'all 0.8s ease-out 0.3s',
                  }}
                >
                  <Box
                    component="h1"
                    sx={{
                      fontSize: { xs: '2rem', md: '3rem', lg: '4rem' },
                      fontWeight: 700,
                      margin: 0,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      letterSpacing: '2px'
                    }}
                  >
                    {slide.title}
                  </Box>
                  <Box
                    component="p"
                    sx={{
                      fontSize: { xs: '1rem', md: '1.2rem', lg: '1.5rem' },
                      margin: '10px 0 0 0',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      letterSpacing: '1px'
                    }}
                  >
                    {slide.subtitle}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Navigation Buttons */}
        <button
          className="hero-nav-btn hero-nav-btn--prev"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
          disabled={isTransitioning}
          style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            zIndex: 10,
            width: isMobile ? 40 : 48,
            height: isMobile ? 40 : 48,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            opacity: isTransitioning ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!isTransitioning) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
          }}
        >
          <KeyboardArrowUp sx={{ fontSize: { xs: 20, md: 24 } }} />
        </button>
        
        <button
          className="hero-nav-btn hero-nav-btn--next"
          onClick={goToNextSlide}
          aria-label="Next slide"
          disabled={isTransitioning}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 10,
            width: isMobile ? 40 : 48,
            height: isMobile ? 40 : 48,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            opacity: isTransitioning ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!isTransitioning) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
          }}
        >
          <KeyboardArrowDown sx={{ fontSize: { xs: 20, md: 24 } }} />
        </button>

        {/* Pagination Dots */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            gap: '8px'
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
              style={{
                width: isMobile ? 10 : 12,
                height: isMobile ? 10 : 12,
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: isTransitioning ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                transform: index === currentSlide ? 'scale(1.3)' : 'scale(1)',
                boxShadow: index === currentSlide ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none',
                opacity: isTransitioning ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (!isTransitioning && index !== currentSlide) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.transform = 'scale(1.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentSlide) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'scale(1)';
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