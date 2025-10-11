"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Phone, Mail, MapPin, Download, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background">
      {/* Logo at top left - clickable to home */}
      <header className="container mx-auto px-6 py-6">
        <Link href="/" className="inline-block">
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image 
              src="/header-logo.png" // Replace with your logo path
              alt="Adhiplus Logo" 
              width={50} 
              height={50}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-primary adhiplus-brand-text">
              ADHIPLUS
            </span>
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <section className="py-12 px-6 flex flex-col items-center justify-center">
        {/* Success Icon */}
        <div className="bg-green-50 rounded-full p-6 mb-6 animate-scale-in">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Thank You Message */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary text-center animate-fade-in-up">
          Thank You for Your Inquiry!
        </h1>
        
        <p className="max-w-2xl mb-2 text-lg text-muted-foreground text-center animate-fade-in animation-delay-200">
          We've received your message and our team will review it shortly.
        </p>
        
        <p className="max-w-2xl mb-8 text-base text-muted-foreground text-center animate-fade-in animation-delay-300">
          <strong>Expected Response Time:</strong> Within 24-48 hours during business hours (Mon-Sat, 10 AM - 6 PM IST)
        </p>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-2xl animate-fade-in animation-delay-400">
          <a
            href="https://wa.me/919876543210?text=Hello%20Adhiplus%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products" // Replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </Button>
          </a>
          
          <a
            href="/catalogs/adhiplus-catalog.pdf" // Replace with your actual catalog file path in public folder
            download="Adhiplus-Product-Catalog.pdf"
            className="flex-1"
          >
            <Button variant="outline" className="w-full px-6 py-6 text-lg flex items-center justify-center gap-2 border-2 hover:bg-primary hover:text-white">
              <Download className="w-5 h-5" />
              Download Catalog
            </Button>
          </a>
        </div>

        {/* What Happens Next Section */}
        <div className="max-w-3xl w-full bg-muted/50 rounded-lg p-8 mb-12 animate-fade-in animation-delay-500">
          <h3 className="text-2xl font-semibold mb-6 text-center text-primary">What Happens Next?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">We Review</h4>
              <p className="text-sm text-muted-foreground">Our team carefully reviews your inquiry</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">We Respond</h4>
              <p className="text-sm text-muted-foreground">Get a personalized response within 24-48 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">We Connect</h4>
              <p className="text-sm text-muted-foreground">Discuss solutions tailored to your needs</p>
            </div>
          </div>
        </div>

        {/* About Adhiplus */}
        <div className="max-w-3xl w-full text-center mb-12 animate-fade-in animation-delay-600">
          <h3 className="text-2xl font-semibold mb-4 text-primary">Why Choose Adhiplus?</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold mb-2 text-lg">🏆 Industry Leader Since 2016</h4>
              <p className="text-muted-foreground">
                Over 5 years of excellence in manufacturing premium construction adhesives, epoxy solutions, and grout systems.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold mb-2 text-lg">✅ International Standards</h4>
              <p className="text-muted-foreground">
                All products meet high quality standards with rigorous application and inspection.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold mb-2 text-lg">🌱 Friendly Solutions</h4>
              <p className="text-muted-foreground">
                Committed to sustainable manufacturing with proper quality, environmentally responsible products.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold mb-2 text-lg">🤝 Expert Technical Support</h4>
              <p className="text-muted-foreground">
                Dedicated technical team providing guidance from product selection to application.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-3xl w-full bg-primary/5 rounded-lg p-8 animate-fade-in animation-delay-700">
          <h3 className="text-xl font-semibold mb-6 text-center">Need Immediate Assistance?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-primary mb-2" />
              <p className="font-semibold mb-1">Call Us</p>
              <a href="tel:+917878888406" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                +91 7878888406
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-primary mb-2" />
              <p className="font-semibold mb-1">Email Us</p>
              <a href="mailto:info@adhiplus.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                adhiplus01@gmail.com
              </a>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-primary mb-2" />
              <p className="font-semibold mb-1">Visit Us</p>
              <p className="text-sm text-muted-foreground">Hanumangarh, Rajasthan</p>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-12 animate-fade-in animation-delay-800">
          <Link href="/">
            <Button variant="ghost" className="text-primary hover:text-secondary">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
