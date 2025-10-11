"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AdminUser {
  id: string
  username: string
  role: string
}

export function AdminHeader() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check authentication status
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user)
        }
      })
      .catch(() => {
        // User not authenticated
      })
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (!user) return null

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Adhiplus Admin Panel</h1>
        <p className="text-gray-600">Manage customer inquiries and business operations</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>Welcome, {user.username}</span>
        </div>
        <Button onClick={handleLogout} variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
