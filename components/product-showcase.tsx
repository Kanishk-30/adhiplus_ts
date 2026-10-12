"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Droplets, Hammer, Layers, Sparkles, X } from "lucide-react"

const products = [
  {
    id: "tile-adhesive",
    title: "Tile Adhesive",
    description:
      "High-performance adhesive for ceramic, porcelain, and natural stone tiles. Superior bonding strength for interior and exterior applications.",
    icon: Layers,
    features: ["Water resistant", "Fast setting", "High bond strength", "Suitable for all tile types"],
    image: "/cover images/ad-cover.png",
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
    image: "/cover images/ep-cover.png",
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
    image: "/cover images/gr-cover.png",
    learnMoreText:
      "Grout systems fill the gaps between tiles, providing a cohesive, durable, and stain-resistant finish to tile installations.",
  },
  {
    id: "sbr",
    title: "SBR Latex",
    description:
      "High-performance SBR latex polymer modifier for improving bonding, flexibility, water resistance, and durability in cementitious and construction applications.",
    icon: Droplets,
    features: [
      "Superior Bonding",
      "Enhanced Flexibility",
      "Water Resistant",
      "Better Durability"
    ],
    image: "/cover images/sbr-cover.png",
    learnMoreText:
      "SBR latex is a polymer modifier used to enhance the performance of cement-based systems, improving adhesion, flexibility, water resistance, and overall durability."
  },
  {
    id: "tile-cleaner",
    title: "Tile Cleaner",
    description:
      "Powerful tile cleaning solution designed to remove tough stains, dirt, cement residue, and surface deposits while restoring a clean, fresh finish.",
    icon: Sparkles,
    features: [
      "Powerful Cleaning",
      "Removes Tough Stains",
      "Cement Residue Removal",
      "Restores Surface Shine"
    ],
    image: "/cover images/tc-cover.png",
    learnMoreText:
      "Adhiplus Tile Cleaner is designed for effective cleaning of tile and hard surfaces, helping remove stubborn dirt, stains, and construction residues for a cleaner and refreshed appearance."
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

  const handleContainerClick = (id: string) => {
    if (modalOpenFor === id) return
    router.push(`/products/${id}`)
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Improved smooth scroll with offset for fixed header
  const scrollToContactForm = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      // Adjust this offset if your header height changes
      const headerOffset = 80
      const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="products" className="py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full animate-pulse"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        {/* <div
          className="absolute bottom-20 left-1/3 w-20 h-20 bg-accent rounded-full animate-pulse"
          style={{ animationDelay: "4s" }}
        /> */}
      </div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-20 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-balance animate-fade-in-up">
            Our Premium Products
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Engineered for excellence, our construction materials deliver superior performance and reliability.
          </p>
        </div>

        <div className="space-y-14 mb-16 px-4 md:px-8 lg:px-16">
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
                    {/* Image */}
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
                    </div>

                    {/* Bullet points below the picture */}
                    <div className="lg:w-1/2 p-6 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3">{product.title}</h3>
                      <ul className="list-disc list-inside space-y-2 mb-4 text-sm md:text-base text-muted-foreground">
                        {product.features.map((feature, fi) => (
                          <li key={fi} className="group/item text-foreground transition-colors duration-300 group-hover:text-primary">
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-transform duration-300 hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation()
                          setModalOpenFor(product.id)
                        }}
                        aria-haspopup="dialog"
                        aria-expanded={isModalOpen}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>

                  {isModalOpen && (
                    <div
                      onClick={() => setModalOpenFor(null)}
                      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[1000]"
                      aria-modal="true"
                      role="dialog"
                      aria-labelledby={`${product.id}-modal-title`}
                    >
                      <div className="bg-white rounded-xl shadow-lg max-w-lg p-6 relative mx-4" onClick={stopPropagation}>
                        <button
                          aria-label="Close Learn More"
                          onClick={() => setModalOpenFor(null)}
                          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
                        >
                          <X className="w-6 h-6" />
                        </button>
                        <h2 id={`${product.id}-modal-title`} className="text-2xl font-bold mb-4 text-primary">
                          About {product.title}
                        </h2>
                        <p className="text-gray-700">{product.learnMoreText}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <a href="#contact" className="block text-inherit no-underline">
          <div className="text-center px-4 md:px-8 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 animate-fade-in-up">
                Need a Custom Solution?
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-8 animate-fade-in-up">
                Our technical team can help you find the perfect product for your specific project requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="button"
                  size="lg"
                  className="bg-accent hover:bg-accent/90 transition-transform duration-300 hover:scale-105 pointer-events-none"
                  onClick={(e) => e.preventDefault()} // Disable button click event to allow parent anchor click
                >
                  Request Consultation
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="transition-transform duration-300 hover:scale-105 pointer-events-none"
                  onClick={(e) => e.preventDefault()} // Disable button click event to allow parent anchor click
                >
                  Download Catalog
                </Button>
              </div>
            </div>
          </div>
        </a>


      </div>
    </section>
  )
}
