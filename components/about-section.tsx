"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Factory, Truck } from "lucide-react"

const stats = [
  {
    icon: Award,
    value: "5+",
    label: "Years Experience",
    description: "Trusted by professionals",
  },
  {
    icon: Users,
    value: "5K+",
    label: "Happy Customers",
    description: "Across the region",
  },
  {
    icon: Factory,
    value: "1",
    label: "Manufacturing Units",
    description: "State-of-the-art facilities",
  },
  {
    icon: Truck,
    value: "100+",
    label: "Projects Completed",
    description: "Monthly deliveries",
  },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div
            className={`transform transition-all duration-800 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">
              Building Excellence Since 2016
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Adhiplus has been at the forefront of construction material innovation, providing premium quality tile
              adhesives, epoxy solutions, and grout systems to professionals across the industry.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our commitment to quality, innovation, and customer satisfaction has made us the preferred choice for
              contractors, architects, and builders who demand nothing but the best for their projects.
            </p>

            {/* Key Points */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Quality Assurance</h4>
                  <p className="text-muted-foreground">
                    Each product undergoes thorough on-site application testing to ensure optimal performance and customer satisfaction before reaching the market.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Technical Support</h4>
                  <p className="text-muted-foreground">Expert guidance from our experienced technical team</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Sustainable Practices</h4>
                  <p className="text-muted-foreground">Environmentally responsible manufacturing processes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className={`transform transition-all duration-800 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                      <div className="text-sm text-muted-foreground">{stat.description}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
