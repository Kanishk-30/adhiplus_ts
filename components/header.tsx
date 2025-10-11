"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Bell } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img
                src="header-logo.png"
                alt="Adhiplus Logo"
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="adhiplus-brand-text">
              ADHIPLUS
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-accent transition-colors">
              Home
            </a>
            <a href="#products" className="text-foreground hover:text-accent transition-colors">
              Products
            </a>
            <a href="#about" className="text-foreground hover:text-accent transition-colors">
              About Us
            </a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </a>
          </nav>

          {/* Contact Button with Inquiry Badge */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="relative bg-transparent">
              <Bell className="w-4 h-4 mr-2" />
              Login
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                
              </span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <a href="#home" className="block px-3 py-2 text-foreground hover:text-accent transition-colors">
                Home
              </a>
              <a href="#products" className="block px-3 py-2 text-foreground hover:text-accent transition-colors">
                Products
              </a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-accent transition-colors">
                About Us
              </a>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:text-accent transition-colors">
                Contact
              </a>
              <div className="px-3 py-2">
                <Button variant="outline" className="w-full relative bg-transparent">
                  <Bell className="w-4 h-4 mr-2" />
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
