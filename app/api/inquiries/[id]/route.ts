import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"
import type { Inquiry } from "@/lib/models/inquiry"
import { getAuthUser } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const { status } = body

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid inquiry ID" }, { status: 400 })
    }

    if (!["new", "contacted", "closed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const db = await getDatabase()
    const inquiriesCollection = db.collection<Inquiry>("inquiries")

    const result = await inquiriesCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry updated successfully",
    })
  } catch (error) {
    console.error("Error updating inquiry:", error)
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid inquiry ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const inquiriesCollection = db.collection<Inquiry>("inquiries")

    const result = await inquiriesCollection.deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting inquiry:", error)
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 })
  }
}
