"use client"

import type React from "react"

import { useRouter } from "next/navigation"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: ["Industrial Area RIICO 2", "Hanumangarh District", "Hanumangarh, Rajasthan 335512"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 7878888406", "Mon-Sat: 10:00 AM - 5:00 PM"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["adhiplus01@gmail.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Saturday: 10:00 AM - 6:00 PM", "Sunday: 11:00 AM - 4:00 PM"],
  },
]

export function ContactSection() {
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [errors, setErrors] = useState({
    productInterest: false,
  })


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productInterest: "",
    message: "",
  })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Optimized parallax calculation for 2x2 grid
  const getCardParallax = (cardIndex: number): { x: number; y: number } => {
    if (!sectionRef.current) return { x: 0, y: 0 }

    const sectionRect = sectionRef.current.getBoundingClientRect()
    const sectionTop = sectionRect.top + window.scrollY
    const sectionCenter = sectionTop + sectionRect.height / 2
    const currentScroll = window.scrollY + window.innerHeight / 2

    // Distance from section center
    const distanceFromCenter = currentScroll - sectionCenter
    const parallaxRange = window.innerHeight * 0.8 // Reduced range for subtle effect

    // Base parallax movement (limited to ±15px)
    const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / parallaxRange))
    const baseOffset = normalizedDistance * 15

    // Different patterns for each card position in 2x2 grid
    const patterns = [
      { x: 0, y: baseOffset * 0.8 },      // Top-left: mostly vertical
      { x: baseOffset * 0.3, y: baseOffset * 1.2 }, // Top-right: slight horizontal + more vertical
      { x: baseOffset * -0.2, y: baseOffset * 0.6 }, // Bottom-left: slight left + less vertical
      { x: baseOffset * 0.1, y: baseOffset * 1.0 }   // Bottom-right: slight right + normal vertical
    ]

    const pattern = patterns[cardIndex] || { x: 0, y: baseOffset }
    return pattern
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    setErrors({ productInterest: false })

    // Validate product interest
    if (!formData.productInterest) {
      setErrors({ productInterest: true })
      toast({
        title: "Validation Error",
        description: "Please select your product of interest",
        variant: "destructive",
      })
      return // Stop form submission
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Inquiry Submitted Successfully!",
          description: "We'll get back to you within 24 hours.",
        })

        router.push("/thankyou")  // <-- Redirect to Thank You page
        return
      }
      else {
        throw new Error(result.error || "Failed to submit inquiry")
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error)
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-10 right-10 w-40 h-40 bg-accent rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-10 left-10 w-32 h-32 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Ready to start your next project? Contact our expert team for personalized solutions and professional
            guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information - Updated with proper 2x2 grid alignment */}
          <div
            className={`transform transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="space-y-8 h-full flex flex-col">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We're here to help you find the perfect construction materials for your project. Reach out to us
                  through any of the following channels.
                </p>
              </div>

              {/* Contact Info Cards - Perfect 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  const parallax = getCardParallax(index)

                  return (
                    <Card
                      key={index}
                      className="p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-500 group h-full flex flex-col justify-between"
                      style={{
                        transform: `translate(${parallax.x}px, ${parallax.y}px)`,
                        willChange: 'transform'
                      }}
                    >
                      <div className="flex flex-col items-start space-y-3 h-full">
                        <div className="bg-accent/10 p-3 rounded-full transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110 self-center">
                          <Icon className="w-5 h-5 text-accent transition-colors duration-300 group-hover:text-primary" />
                        </div>
                        <div className="text-center flex-1 flex flex-col justify-center w-full">
                          <h4 className="font-semibold text-primary mb-2 transition-colors duration-300 group-hover:text-accent text-sm">
                            {info.title}
                          </h4>
                          <div className="space-y-1">
                            {info.details.map((detail, detailIndex) => (
                              <p
                                key={detailIndex}
                                className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground break-words leading-relaxed"
                              >
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* Social Links - Maintained spacing */}
              <div className="pt-6">
                <h4 className="font-semibold text-primary mb-4">Follow Us</h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="transform transition-all duration-300 hover:scale-110 hover:shadow-lg bg-transparent"
                  >
                    PSFC India
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="transform transition-all duration-300 hover:scale-110 hover:shadow-lg bg-transparent"
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="transform transition-all duration-300 hover:scale-110 hover:shadow-lg bg-transparent"
                  >
                    Instagram
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transform transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            style={{ transitionDelay: "400ms" }}
          >
            <Card className="p-8 hover:shadow-xl transition-all duration-500 h-full">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-primary">Send Us an Inquiry</CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                {isSubmitted ? (
                  <div className="text-center py-12 animate-fade-in-up">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-xl font-semibold text-primary mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">
                      Your inquiry has been submitted successfully. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="group">
                        <Label htmlFor="name" className="transition-colors duration-300 group-hover:text-accent">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="mt-1 transition-all duration-300 focus:scale-[1.02] hover:shadow-md"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="email" className="transition-colors duration-300 group-hover:text-accent">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="mt-1 transition-all duration-300 focus:scale-[1.02] hover:shadow-md"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="mt-1"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="mt-1"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="productInterest" className={errors.productInterest ? "text-red-500" : ""}>
                        Product Interest *
                      </Label>
                      <Select
                        value={formData.productInterest}
                        onValueChange={(value) => {
                          handleInputChange("productInterest", value)
                          setErrors({ productInterest: false }) // Clear error when user selects
                        }}
                      >
                        <SelectTrigger className={`mt-1 ${errors.productInterest ? "border-red-500 border-2" : ""}`}>
                          <SelectValue placeholder="Select product of interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tile-adhesive">Tile Adhesive</SelectItem>
                          <SelectItem value="epoxy">Epoxy Solutions</SelectItem>
                          <SelectItem value="grout">Grout Systems</SelectItem>
                          <SelectItem value="all">All Products</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.productInterest && (
                        <p className="text-red-500 text-sm mt-1 font-medium">
                          Please select your product of interest
                        </p>
                      )}
                    </div>


                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        className="mt-1 min-h-[120px]"
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <Send className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
