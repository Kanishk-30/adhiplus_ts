import type { ObjectId } from "mongodb"

export interface Inquiry {
  _id?: ObjectId
  name: string
  email: string
  phone: string
  company?: string
  message: string
  productInterest: "tile-adhesive" | "epoxy" | "grout" | "all"
  status: "new" | "contacted" | "closed"
  createdAt: Date
  updatedAt: Date
}

export interface InquiryStats {
  total: number
  new: number
  contacted: number
  closed: number
  thisMonth: number
}
