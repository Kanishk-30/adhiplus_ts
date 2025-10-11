"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Droplets, Hammer, Layers, X } from "lucide-react"

const products = [
  {
    id: "tile-adhesive",
    title: "Tile Adhesive",
    description:
      "High-performance adhesive for ceramic, porcelain, and natural stone tiles. Superior bonding strength for interior and exterior applications.",
    icon: Layers,
    features: ["Water resistant", "Fast setting", "High bond strength", "Suitable for all tile types"],
    image: "adhiplus-cover.png",
    learnMoreText:
      "Tile adhesive is a specialized bonding material used to fix tiles onto various surfaces. It provides strong adhesion, durability, and resistance to environmental factors for both interior and exterior applications.",
  },
  {
    id: "epoxy",
    title: "Epoxy Solutions",
    description:
      "Premium epoxy resins and coatings for industrial flooring, repairs, and protective applications. Chemical and abrasion resistant.",
    icon: Droplets,
    features: ["Chemical resistant", "High durability", "Seamless finish", "Easy maintenance"],
    image: "epoxy_cover.png",
    learnMoreText:
      "Epoxy solutions are high-performance resins used for flooring and repairs, known for their chemical resistance, durability, and smooth finish.",
  },
  {
    id: "grout",
    title: "Grout Systems",
    description:
      "Professional-grade grout solutions for tile installations. Available in multiple colors with stain-resistant properties.",
    icon: Hammer,
    features: ["Stain resistant", "Color consistent", "Crack resistant", "Easy application"],
    image: "grout_cover.png",
    learnMoreText:
      "Grout systems fill the gaps between tiles, providing a cohesive, durable, and stain-resistant finish to tile installations.",
  },
]

export function ProductShowcase() {
  const [visibleProducts, setVisibleProducts] = useState<Set<number>>(new Set())
  const [scrollY, setScrollY] = useState(0)
  const productRefs = useRef<(HTMLDivElement | null)[]>([])
  const [modalOpenFor, setModalOpenFor] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setVisibleProducts((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 },
    )

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getParallaxOffset = (index: number) => {
    const element = productRefs.current[index]
    if (!element) return 0

    const rect = element.getBoundingClientRect()
    const elementTop = rect.top + window.scrollY
    const elementHeight = rect.height
    const windowHeight = window.innerHeight

    const elementCenter = elementTop + elementHeight / 2
    const viewportCenter = scrollY + windowHeight / 2
    const distanceFromCenter = viewportCenter - elementCenter

    const parallaxRange = windowHeight
    const parallaxStrength = Math.max(-1, Math.min(1, distanceFromCenter / parallaxRange))

    return parallaxStrength * 30
  }

  // Handle click outside modal or on container (except "Learn More")
  const handleContainerClick = (id: string) => {
    if (modalOpenFor === id) return // prevent navigation if modal is open for this product
    router.push(`/products/${id}`)
  }

  // To stop propagation of click inside modal content and prevent container navigation
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <section id="products" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full animate-pulse"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-20 h-20 bg-accent rounded-full animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-8 sm:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance animate-fade-in-up">
            Our Premium Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed animate-fade-in-up animation-delay-300">
            Engineered for excellence, our construction materials deliver superior performance and reliability.
          </p>
        </div>

        <div className="space-y-16 mb-16 px-4 md:px-8 lg:px-16">
          {products.map((product, index) => {
            const Icon = product.icon
            const isVisible = visibleProducts.has(index)
            const parallaxOffset = getParallaxOffset(index)
            const isModalOpen = modalOpenFor === product.id

            return (
              <div
                key={product.id}
                ref={(el) => {
                  productRefs.current[index] = el
                }}
                data-index={index}
                role="button"
                tabIndex={0}
                onClick={() => handleContainerClick(product.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleContainerClick(product.id)
                  }
                }}
                className={`transform transition-all duration-1000 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                aria-label={`View details for ${product.title}`}
              >
                <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group relative">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 relative overflow-hidden">
                      <div className="relative h-64 lg:h-80 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          style={{
                            transform: `translateY(${parallaxOffset}px) scale(1.1)`,
                            transformOrigin: "center center",
                          }}
                        />
                      </div>
                      <div className="absolute top-6 left-6 bg-primary p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-primary mb-4 transition-colors duration-300 group-hover:text-accent">
                        {product.title}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {product.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-foreground group/item"
                          >
                            <div className="w-2 h-2 bg-accent rounded-full mr-4 flex-shrink-0 transition-all duration-300 group-hover:scale-150 group-hover:bg-primary"></div>
                            <span className="font-medium transition-colors duration-300 group-hover:text-primary">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className="w-fit bg-accent hover:bg-accent/90 text-accent-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          setModalOpenFor(product.id)
                        }}
                        aria-haspopup="dialog"
                        aria-expanded={isModalOpen}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>

                  {/* Modal Overlay */}
                  {isModalOpen && (
                    <div
                      onClick={() => setModalOpenFor(null)}
                      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[1000]"
                      aria-modal="true"
                      role="dialog"
                      aria-labelledby={`${product.id}-modal-title`}
                    >
                      <div
                        className="bg-white rounded-xl shadow-lg max-w-lg p-6 relative mx-4"
                        onClick={stopPropagation}
                      >
                        <button
                          aria-label="Close Learn More"
                          onClick={() => setModalOpenFor(null)}
                          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
                        >
                          <X className="w-6 h-6" />
                        </button>
                        <h2
                          id={`${product.id}-modal-title`}
                          className="text-2xl font-bold mb-4 text-primary"
                        >
                          About {product.title}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{product.learnMoreText}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center px-4 md:px-8">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-4xl mx-auto hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
            <h3 className="text-3xl font-bold text-primary mb-4 animate-fade-in-up">Need a Custom Solution?</h3>
            <p className="text-lg text-muted-foreground mb-8 text-balance animate-fade-in-up animation-delay-200">
              Our technical team can help you find the perfect product for your specific project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <a href="#contact">Request Consultation</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="transform transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <a href="#contact">Download Catalog</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
