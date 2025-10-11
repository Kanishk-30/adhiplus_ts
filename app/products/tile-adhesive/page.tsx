"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Layers } from "lucide-react"
import Link from "next/link"

export default function TileAdhesivePage() {
  const [openImage, setOpenImage] = useState<string | null>(null)

  const tileAdhesiveProducts = [
    {
      id: "standard-adhesive",
      name: "P103 Silver (Grey)",
      description: "P103 (Silver) Tile Adhesive is a polymer based integrated grey cement composition based adhesive for fixing cermain tiles on internal floor and walls",
      frontImage: "/P103F.png",
      backImage: "/P103B.png",
      suitableFor: [
        "Interior wall tiling",
        "Small to medium ceramic tiles", 
        "Dry area applications",
        "Highly porous tiles"
      ]
    },
    {
      id: "premium-adhesive", 
      name: "P105 Gold (Grey)",
      description: "P105 (Gold) Tile Adhesive is apolymer integrated cement-based adhesive ideal for fixing normal size ceramic & vertified tiles on floors and walls.",
      frontImage: "/P105F.png",
      backImage: "/P105B.png",
      suitableFor: [
        "Ceramic and vertified tiles",
        "internal applications",
        "Tile on tile application",
      ]
    },
    {
      id: "flexible-adhesive",
      name: "P107 Platinum (Grey)", 
      description: "P107 (Platinum) Tile Adhesive is a cement based polymer integrated adhesie for vertified tiles and natural stones for internal and external applications.",
      frontImage: "/P107F.png",
      backImage: "/P107B.png",
      suitableFor: [
        "Vertified tiles, glass mosaic tiles and natural stones",
        "Internal and external applications",
        "Verticall and horizontal surfaces",
        "Upto the height of 25 feets"
      ]
    },
    {
      id: "rapid-set-adhesive",
      name: "P109 Diamond (Grey)",
      description: "Tile Adhesive for fixing large format tiles and natural stones cladding on floor and walls.",
      frontImage: "/P109F.png", 
      backImage: "/P109B.png",
      suitableFor: [
        "Large format tiles",
        "Granite, marble and all type of stones",
        "Commercial spaces",
        "Upto 25 feets height"
      ]
    },
    {
      id: "standard-adhesive",
      name: "P105 Gold (White)",
      description: "P105 (Gold) Tile Adhesive is a polymer integrated white cement-based adhesive ideal for fixing normal size ceramic & vertified tiles on floors and walls and marbles",
      frontImage: "/P105F.png",
      backImage: "/P105B.png",
      suitableFor: [
        "Ceramic and vertified tiles",
        "Internal floor and wall applications", 
        "Dry area applications",
        "Tile on tile application"
      ]
    },
    {
      id: "standard-adhesive",
      name: "P107 Platinum (White)",
      description: "P107 (Platinum) Tile adhesive is a white cement-based polymer integrated adhesive for vertified tiles and natural stones for internal and external applications.",
      frontImage: "/P107F.png",
      backImage: "/P107B.png",
      suitableFor: [
        "vertified tiles, glass mosaic tiles and natural stones",
        "Internal and external applications", 
        "verticall and horizontal surfaces",
        "Upto the height of 35 feets"
      ]
    },
    {
      id: "standard-adhesive",
      name: "P109 Diamond (White)",
      description: "Premium quality adhesive for regular ceramic and porcelain tiles up to 300x300mm.",
      frontImage: "/P109F.png",
      backImage: "/P109B.png",
      suitableFor: [
        "Large format tiles",
        "Granite marble and all type of stones", 
        "Internal & external/Vertical & horizontal",
        "upto 35 feets height"
      ]
    },
  ]

  return (
    <section className="max-w-5xl mx-auto p-8 md:p-16 bg-background rounded-lg shadow-lg">
      {/* Main Top Section - Keep Original */}
      <header className="mb-8 flex items-center space-x-4">
        <Layers className="w-10 h-10 text-primary" />
        <h1 className="text-4xl font-bold text-primary">ADHIPLUS Tile Adhesive</h1>
      </header>

      <img
        src="/adhiplus-cover.png"
        alt="Tile Adhesive"
        className="w-full max-h-96 object-cover rounded-lg mb-8"
      />

      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        High-performance adhesive for ceramic, porcelain, and natural stone tiles.
        Offers superior bonding strength for interior and exterior applications.
        Our tile adhesive is water resistant, fast setting, and suitable for all tile types.
      </p>

      <ul className="list-disc list-inside mb-8 space-y-2 text-foreground">
        <li>Water resistant for durable applications</li>
        <li>Fast setting for quicker project completion</li>
        <li>High bond strength for lasting adhesion</li>
        <li>Compatible with all common tile materials</li>
      </ul>

      <div className="flex gap-4 mb-12">
        <Button size="lg" className="bg-accent hover:bg-accent/90">
          Download Catalogue
        </Button>
        <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
          Contact Support
        </Button>
      </div>

      {/* Products Section */}
      <div className="border-t border-muted pt-12 mt-12">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Adhiplus Tile Adhesive (20Kg)</h2>
        
        <div className="space-y-12">
          {tileAdhesiveProducts.map((product) => (
            <div key={product.id} className="bg-muted/20 rounded-lg p-6">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                
                {/* Product Images - Larger without labels */}
                <div className="md:col-span-1">
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src={product.frontImage}
                      alt={`${product.name} Front`}
                      className="w-full h-48 object-contain rounded cursor-pointer hover:scale-105 transition-transform bg-white/50 shadow-sm"
                      onClick={() => setOpenImage(product.frontImage)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setOpenImage(product.frontImage)
                        }
                      }}
                    />
                    <img
                      src={product.backImage}
                      alt={`${product.name} Back`}
                      className="w-full h-48 object-contain rounded cursor-pointer hover:scale-105 transition-transform bg-white/50 shadow-sm"
                      onClick={() => setOpenImage(product.backImage)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setOpenImage(product.backImage)
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Product Info with Button */}
                <div className="md:col-span-1 space-y-4">
                  <h3 className="text-xl font-semibold text-primary">{product.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <Link href={`/products/${product.id}`}>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                      View Details
                    </Button>
                  </Link>
                </div>

                {/* Suitable For */}
                <div className="md:col-span-1">
                  <h4 className="text-sm font-semibold text-primary mb-3">Suitable For:</h4>
                  <ul className="space-y-1">
                    {product.suitableFor.map((item, index) => (
                      <li key={index} className="text-sm text-foreground flex items-start">
                        <span className="text-accent mr-2 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-6 bg-primary/5 rounded-lg">
          <h3 className="text-lg font-semibold text-primary mb-3">Need Help Choosing?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Contact our technical team for personalized product recommendations
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Get Expert Advice
          </Button>
        </div>
      </div>

      {/* Image modal overlay */}
      {openImage && (
        <div
          onClick={() => setOpenImage(null)}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
          aria-modal="true"
          role="dialog"
        >
          <div className="relative">
            <img
              src={openImage}
              alt="Enlarged product packaging"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
            />
            <button
              onClick={() => setOpenImage(null)}
              className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 text-white rounded-full p-1 text-xs"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
