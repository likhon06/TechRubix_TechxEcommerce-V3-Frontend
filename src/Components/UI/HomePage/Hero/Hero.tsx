"use client"
import Image from "next/image"
import bannerImg1 from '@/assets/images/c1.jpg'
import bannerImg2 from '@/assets/images/c2.jpg'
import { Typography } from "@mui/material"
import { Carousel } from "@material-tailwind/react"
import { useEffect } from "react"
import Glide from "@glidejs/glide"
const Hero = () => {
  useEffect(() => {
    const slider = new Glide(".glide-06", {
      type: "carousel",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,
      animationDuration: 700,
      gap: 24,
    }).mount()

    return () => {
      slider.destroy()
    }
  }, [])
  return (

    <>
      <div className="glide-06 relative w-3/4 mx-auto overflow-hidden rounded-lg mt-10">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            <li>
              <Image src={bannerImg1} alt="banner image"
                width={1500}
                height={200}
              />
            </li>
            <li>
              <Image src={bannerImg2} alt="banner image"
                width={1500}
                height={200}
              />
            </li>
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full  bg-white/70 backdrop-blur-sm hover:scale-105 transition duration-300 lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>prev slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm   transition duration-300  lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>next slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div> 
      </div>
    </>
  )
}

export default Hero