"use client"

import { Button } from "@/components/ui/button"
import { Hammer } from "lucide-react"

export default function GroutPage() {
  return (
    <section className="max-w-5xl mx-auto p-8 md:p-16 bg-background rounded-lg shadow-lg">
      <header className="mb-8 flex items-center space-x-4">
        <Hammer className="w-10 h-10 text-primary" />
        <h1 className="text-4xl font-bold text-primary">Grout Systems</h1>
      </header>

      <img
        src="/grout_cover.png"
        alt="Grout Systems"
        className="w-full max-h-96 object-cover rounded-lg mb-8"
      />

      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        Professional-grade grout solutions for tile installations. Available in multiple colors with stain-resistant properties.
        Designed to provide color consistency, crack resistance, and easy application.
      </p>

      <ul className="list-disc list-inside mb-8 space-y-2 text-foreground">
        <li>Stain resistant formula for clean appearance</li>
        <li>Color consistent to meet design needs</li>
        <li>Crack resistant for long-lasting installations</li>
        <li>Easy and smooth application process</li>
      </ul>

      <div className="flex gap-4">
        <Button size="lg" className="bg-accent hover:bg-accent/90">
          Download Datasheet
        </Button>
        <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
          Contact Support
        </Button>
      </div>
    </section>
  )
}
