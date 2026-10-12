"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Mail, Phone, Calendar, User, Package, Trash2, RefreshCw, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Inquiry, InquiryStats } from "@/lib/models/inquiry"
import { AdminHeader } from "@/components/admin-header"

export default function AdminPanel() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [stats, setStats] = useState<InquiryStats>({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0,
    thisMonth: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchInquiries = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/inquiries?status=${selectedStatus}&limit=50`)
      const data = await response.json()

      if (response.ok) {
        setInquiries(data.inquiries)
        setStats(data.stats)
      } else {
        throw new Error(data.error || "Failed to fetch inquiries")
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error)
      toast({
        title: "Error",
        description: "Failed to load inquiries. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [selectedStatus])

  const updateStatus = async (id: string, newStatus: "new" | "contacted" | "closed") => {
    try {
      setIsUpdating(id)
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const result = await response.json()

      if (response.ok) {
        setInquiries((prev) =>
          prev.map((inquiry) =>
            inquiry._id?.toString() === id ? { ...inquiry, status: newStatus, updatedAt: new Date() } : inquiry,
          ),
        )

        await fetchInquiries()

        toast({
          title: "Status Updated",
          description: `Inquiry marked as ${newStatus}`,
        })
      } else {
        throw new Error(result.error || "Failed to update status")
      }
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update inquiry status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(null)
    }
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return

    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (response.ok) {
        setInquiries((prev) => prev.filter((inquiry) => inquiry._id?.toString() !== id))
        await fetchInquiries()

        toast({
          title: "Inquiry Deleted",
          description: "The inquiry has been successfully deleted.",
        })
      } else {
        throw new Error(result.error || "Failed to delete inquiry")
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error)
      toast({
        title: "Delete Failed",
        description: "Failed to delete inquiry. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.productInterest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inquiry.company && inquiry.company.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "contacted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "closed":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getProductDisplayName = (productInterest: string) => {
    switch (productInterest) {
      case "tile-adhesive":
        return "Tile Adhesive"
      case "epoxy":
        return "Epoxy Solutions"
      case "grout":
        return "Grout Systems"
      case "all":
        return "All Products"
      default:
        return productInterest
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">New</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.new}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 text-xs sm:text-sm">New</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Contacted</p>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{stats.contacted}</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm">Progress</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Closed</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.closed}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 text-xs sm:text-sm">Done</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.thisMonth}</p>
                </div>
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Customer Inquiries</CardTitle>
                <CardDescription>Manage and respond to customer inquiries</CardDescription>
              </div>
              <Button onClick={fetchInquiries} disabled={isLoading} className="flex items-center gap-2 max-w-xs w-full sm:w-auto">
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="contacted">Contacted</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <RefreshCw className="h-8 w-8 text-gray-400 mx-auto mb-4 animate-spin" />
                <p className="text-gray-600 text-base sm:text-lg">Loading inquiries...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inquiry) => (
                    <Card key={inquiry._id?.toString()} className="border-l-4 border-l-blue-600">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <User className="h-4 w-4 text-gray-500" />
                              <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                              <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <Mail className="h-4 w-4" />
                                {inquiry.email}
                              </div>
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <Phone className="h-4 w-4" />
                                {inquiry.phone}
                              </div>
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <Package className="h-4 w-4" />
                                {getProductDisplayName(inquiry.productInterest)}
                              </div>
                              {inquiry.company && (
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                  <Building2 className="h-4 w-4" />
                                  {inquiry.company}
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                {formatDate(inquiry.createdAt)}
                              </div>
                            </div>

                            <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg break-words">{inquiry.message}</p>
                          </div>

                          <div className="flex flex-col gap-2 lg:w-48 min-w-[160px]">
                            <Button
                              size="sm"
                              variant={inquiry.status === "contacted" ? "default" : "outline"}
                              onClick={() => updateStatus(inquiry._id!.toString(), "contacted")}
                              disabled={isUpdating === inquiry._id?.toString()}
                              className="w-full"
                            >
                              {isUpdating === inquiry._id?.toString() ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                "Mark Contacted"
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant={inquiry.status === "closed" ? "default" : "outline"}
                              onClick={() => updateStatus(inquiry._id!.toString(), "closed")}
                              disabled={isUpdating === inquiry._id?.toString()}
                              className="w-full"
                            >
                              {isUpdating === inquiry._id?.toString() ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                "Mark Closed"
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteInquiry(inquiry._id!.toString())}
                              className="w-full"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
                    <p className="text-gray-600 text-base sm:text-lg">
                      No inquiries match your current search and filter criteria.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
