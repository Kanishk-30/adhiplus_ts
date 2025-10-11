"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2 } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="/modern-construction-site-with-concrete-and-steel-m.png"
          alt="Construction materials background"
          className="w-full h-full object-cover transition-transform duration-75 ease-out"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}>
          {/* Logo and Brand Name */}
          <div className="flex items-center justify-center mb-6 group">
            <div className="flex-shrink-0 mr-6">
              <img
                src="hero-logo.png"
                alt="Adhiplus Logo"
                className="h-20 w-20 md:h-24 md:w-24 object-contain transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  // Fallback if logo image doesn't exist
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <h1 className="adhiplus-hero-title text-5xl md:text-7xl text-white transition-all duration-300 hover:text-accent">
              ADHIPLUS
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-white/90 mb-8 text-balance leading-relaxed animate-fade-in-up animation-delay-300">
            Premium construction materials engineered for excellence. Your trusted partner in tile adhesive, epoxy, and
            grout solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Explore Products
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent transform transition-all duration-300 hover:scale-105"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center hover:border-white transition-colors duration-300">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse hover:bg-white transition-colors duration-300"></div>
        </div>
      </div>
    </section>
  )
}
