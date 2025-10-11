"use client"

import { Button } from "@/components/ui/button"
import { Droplets } from "lucide-react"

export default function EpoxyPage() {
  return (
    <section className="max-w-5xl mx-auto p-8 md:p-16 bg-background rounded-lg shadow-lg">
      <header className="mb-8 flex items-center space-x-4">
        <Droplets className="w-10 h-10 text-primary" />
        <h1 className="text-4xl font-bold text-primary">Epoxy Solutions</h1>
      </header>

      <img
        src="/epoxy_cover.png"
        alt="Epoxy Solutions"
        className="w-full max-h-96 object-cover rounded-lg mb-8"
      />

      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        Premium epoxy resins and coatings for industrial flooring, repairs, and protective applications.
        Chemical and abrasion resistant. Provides high durability and a seamless finish for easy maintenance.
      </p>

      <ul className="list-disc list-inside mb-8 space-y-2 text-foreground">
        <li>Chemical resistant for harsh environments</li>
        <li>High durability under heavy wear</li>
        <li>Seamless finish with aesthetic appeal</li>
        <li>Easy maintenance and cleaning</li>
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
