"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, ChevronDown, Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClick)
      return () => document.removeEventListener("mousedown", handleClick)
    }
  }, [showDropdown])

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img
                src="header-logo.png"
                alt="Adhiplus Logo"
                className="h-10 w-10 object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div className="adhiplus-brand-text text-base sm:text-lg">ADHIPLUS</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-foreground hover:text-accent transition-colors text-sm sm:text-base">Home</a>
            <a href="#products" className="text-foreground hover:text-accent transition-colors text-sm sm:text-base">Products</a>
            <a href="#about" className="text-foreground hover:text-accent transition-colors text-sm sm:text-base">About Us</a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors text-sm sm:text-base">Contact</a>
          </nav>

          {/* Login Button + Dropdown (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <Button
              variant="outline"
              className="bg-transparent flex items-center gap-1 relative z-20 text-sm sm:text-base px-3 py-1.5 sm:py-2"
              onClick={() => setShowDropdown((v) => !v)}
              ref={buttonRef}
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              Login
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? "rotate-180" : "rotate-0"}`} />
            </Button>

            {/* Dropdown */}
            <div
              ref={dropdownRef}
              className={`absolute top-full right-0 mt-0 rounded-b-lg bg-white border border-t-0 border-gray-300 shadow-lg z-10 overflow-hidden origin-top scale-y-0 transition-transform duration-300 ${showDropdown ? "scale-y-100" : "pointer-events-none"}`}
              style={{ width: buttonRef.current ? Math.min(buttonRef.current.offsetWidth * 0.75, 150) : "8rem" }}
            >
              <Link href="/dealer/login" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                Dealer Login
              </Link>
              <Link href="/admin/login" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                Admin Login
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border bg-background rounded-b-md shadow-md">
              <a href="#home" className="block px-3 py-2 text-foreground hover:text-accent transition-colors rounded-md text-base">Home</a>
              <a href="#products" className="block px-3 py-2 text-foreground hover:text-accent transition-colors rounded-md text-base">Products</a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-accent transition-colors rounded-md text-base">About Us</a>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:text-accent transition-colors rounded-md text-base">Contact</a>
              <div className="px-3 py-2">
                <Button variant="outline" className="w-full relative bg-transparent text-base py-3">
                  <Bell className="w-5 h-5 mr-2" />
                  Admin
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
