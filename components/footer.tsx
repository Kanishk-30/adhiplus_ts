"use client"

import { Building2, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Building2 className="w-8 h-8 mr-3 text-white" />
              <h3 className="text-2xl font-bold text-white">Adhiplus</h3>
            </div>
            <p className="text-white mb-4 leading-relaxed">
              Premium construction materials engineered for excellence. Your trusted partner in building solutions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-white">
                <Mail className="w-4 h-4 mr-2 text-white" />
                <a href="mailto:info@adhiplus.com" className="text-white">adhiplus01@gmail.com</a>
              </div>
              <div className="flex items-center text-sm text-white">
                <Phone className="w-4 h-4 mr-2 text-white" />
                +91 7878888406
              </div>
              <div className="flex items-center text-sm text-white">
                <MapPin className="w-4 h-4 mr-2 text-white" />
                Hanumangarh, Rajasthan
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a href="#" className="text-white hover:text-white transition-colors">
                  Tile Adhesive
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-white transition-colors">
                  Epoxy Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-white transition-colors">
                  Grout Systems
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-white transition-colors">
                  Technical Data Sheets
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a href="#about" className="text-white hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-white transition-colors">
                  Quality Assurance
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a href="#" className="text-white hover:text-white transition-colors">
                  Technical Support
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-white transition-colors">
                  Installation Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-white transition-colors">
                  Warranty
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white">
            © 2024 Adhiplus. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
