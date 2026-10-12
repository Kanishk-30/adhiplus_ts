"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const heroImages = [
  "/cover images/ad-hero1.png",
  "/cover images/ad-hero2.png",
  "/cover images/ad-hero3.png",
  "/cover images/ad-hero4.png",
  "/cover images/ad-hero5.png",
]

// ---- Timing (ms) ----
const SLIDE_DURATION = 7000 // time between image changes
const FADE_DURATION = 2000 // crossfade length
// Zoom must outlast slide + fade so it never stops mid-transition
const ZOOM_DURATION = SLIDE_DURATION + FADE_DURATION + 1000
const ZOOM_SCALE = 1.12 // final zoom level (1.12 = 12% zoom)

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const currentRef = useRef(0)

  // Preload images
  useEffect(() => {
    const promises = heroImages.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = resolve
          img.onerror = resolve
        })
    )
    Promise.all(promises).then(() => setImagesLoaded(true))
  }, [])

  // Visibility, reduced motion, scroll
  useEffect(() => {
    setIsVisible(true)

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleMotionChange)

    const handleScroll = () => setScrollY(Math.min(window.scrollY, window.innerHeight))
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Slide timer: created once, never reset by index changes
  useEffect(() => {
    if (isReducedMotion || !imagesLoaded) return

    const interval = setInterval(() => {
      const next = (currentRef.current + 1) % heroImages.length
      setPrevImageIndex(currentRef.current)
      setCurrentImageIndex(next)
      currentRef.current = next
    }, SLIDE_DURATION)

    return () => clearInterval(interval)
  }, [isReducedMotion, imagesLoaded])

  const handleExploreProducts = () => {
    const el = document.getElementById("products")
    if (el) el.scrollIntoView({ behavior: "smooth" })
    else window.location.href = "/#products"
  }

  const handleGetQuote = () => {
    const el = document.getElementById("contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
    else window.location.href = "/#contact"
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Zoom keyframes */}
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1) translate3d(0, 0, 0); }
          to   { transform: scale(${ZOOM_SCALE}) translate3d(-1.5%, 0, 0); }
        }
        .hero-zoom {
          animation: heroZoom ${ZOOM_DURATION}ms linear forwards;
        }
      `}</style>

      {/* Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Parallax wrapper (separate from zoom transform) */}
        <div
          className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform"
          style={{ transform: `translate3d(0, ${scrollY * 0.2}px, 0)` }}
        >
          {heroImages.map((image, index) => {
            const isActive = index === currentImageIndex
            const isPrev = index === prevImageIndex
            const shouldShow = isActive || isPrev

            return (
              <img
                key={index}
                src={image}
                alt={`Hero background ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover will-change-transform ${
                  shouldShow && !isReducedMotion ? "hero-zoom" : ""
                } ${shouldShow ? "opacity-100" : "opacity-0"}`}
                style={{
                  // New image fades in on top; old one stays fully visible underneath
                  zIndex: isActive ? 2 : isPrev ? 1 : 0,
                  transition: isReducedMotion ? "none" : `opacity ${FADE_DURATION}ms ease-in-out`,
                }}
              />
            )
          })}
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_45%,transparent_75%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 lg:px-10 max-w-3xl mx-auto select-none">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col items-center justify-center mb-6 group space-y-4">
            <img
              src="/hero-logo.png"
              alt="Adhiplus Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
            <h1 className="adhiplus-hero-title text-4xl sm:text-5xl md:text-7xl text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:text-accent">
              ADHIPLUS
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl font-medium text-white mb-8 leading-relaxed text-center max-w-xl mx-auto [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
            Premium construction materials engineered for excellence. Your trusted partner in tile adhesive, epoxy, and grout solutions.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto"
              onClick={handleExploreProducts}
            >
              Explore Products
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent transform transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              onClick={handleGetQuote}
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center hover:border-white transition-colors duration-300">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse hover:bg-white transition-colors duration-300"></div>
        </div>
      </div>
    </section>
  )
}