import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Inquiry } from "@/lib/models/inquiry"
import { getAuthUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, productInterest } = body

    // Validate required fields
    if (!name || !email || !phone || !message || !productInterest) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()
    const inquiriesCollection = db.collection<Inquiry>("inquiries")

    const inquiry: Omit<Inquiry, "_id"> = {
      name,
      email,
      phone,
      company: company || "",
      message,
      productInterest,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await inquiriesCollection.insertOne(inquiry)

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Inquiry submitted successfully",
    })
  } catch (error) {
    console.error("Error creating inquiry:", error)
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const skip = (page - 1) * limit

    const db = await getDatabase()
    const inquiriesCollection = db.collection<Inquiry>("inquiries")

    // Build filter
    const filter: any = {}
    if (status && status !== "all") {
      filter.status = status
    }

    // Get inquiries with pagination
    const inquiries = await inquiriesCollection.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    // Get total count
    const total = await inquiriesCollection.countDocuments(filter)

    // Get stats
    const stats = await inquiriesCollection
      .aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    const statsObj = {
      total: await inquiriesCollection.countDocuments(),
      new: stats.find((s) => s._id === "new")?.count || 0,
      contacted: stats.find((s) => s._id === "contacted")?.count || 0,
      closed: stats.find((s) => s._id === "closed")?.count || 0,
      thisMonth: await inquiriesCollection.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      }),
    }

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: statsObj,
    })
  } catch (error) {
    console.error("Error fetching inquiries:", error)
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
  }
}
