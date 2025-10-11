"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Database, Server, Shield } from "lucide-react"

interface TestResult {
  name: string
  status: "success" | "error" | "pending"
  message: string
  icon: React.ComponentType<any>
}

export default function TestConnection() {
  const [tests, setTests] = useState<TestResult[]>([
    {
      name: "Database Connection",
      status: "pending",
      message: "Not tested",
      icon: Database,
    },
    {
      name: "API Routes",
      status: "pending",
      message: "Not tested",
      icon: Server,
    },
    {
      name: "Authentication",
      status: "pending",
      message: "Not tested",
      icon: Shield,
    },
  ])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)

    // Test 1: Database Connection
    setTests((prev) =>
      prev.map((test) =>
        test.name === "Database Connection" ? { ...test, status: "pending", message: "Testing..." } : test,
      ),
    )

    try {
      const dbResponse = await fetch("/api/inquiries?limit=1")
      const dbResult = await dbResponse.json()

      setTests((prev) =>
        prev.map((test) =>
          test.name === "Database Connection"
            ? {
                ...test,
                status: dbResponse.ok ? "success" : "error",
                message: dbResponse.ok ? "MongoDB connected successfully" : dbResult.error || "Connection failed",
              }
            : test,
        ),
      )
    } catch (error) {
      setTests((prev) =>
        prev.map((test) =>
          test.name === "Database Connection" ? { ...test, status: "error", message: "Connection failed" } : test,
        ),
      )
    }

    // Test 2: API Routes
    setTests((prev) =>
      prev.map((test) => (test.name === "API Routes" ? { ...test, status: "pending", message: "Testing..." } : test)),
    )

    try {
      const testInquiry = {
        name: "Test User",
        email: "test@example.com",
        phone: "+1234567890",
        company: "Test Company",
        productInterest: "tile-adhesive",
        message: "This is a test inquiry",
      }

      const apiResponse = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testInquiry),
      })

      const apiResult = await apiResponse.json()

      setTests((prev) =>
        prev.map((test) =>
          test.name === "API Routes"
            ? {
                ...test,
                status: apiResponse.ok ? "success" : "error",
                message: apiResponse.ok ? "API endpoints working" : apiResult.error || "API test failed",
              }
            : test,
        ),
      )
    } catch (error) {
      setTests((prev) =>
        prev.map((test) =>
          test.name === "API Routes" ? { ...test, status: "error", message: "API test failed" } : test,
        ),
      )
    }

    // Test 3: Authentication
    setTests((prev) =>
      prev.map((test) =>
        test.name === "Authentication" ? { ...test, status: "pending", message: "Testing..." } : test,
      ),
    )

    try {
      const authResponse = await fetch("/api/auth/me")

      setTests((prev) =>
        prev.map((test) =>
          test.name === "Authentication"
            ? {
                ...test,
                status: "success",
                message: authResponse.status === 401 ? "Auth system working (not logged in)" : "Auth system working",
              }
            : test,
        ),
      )
    } catch (error) {
      setTests((prev) =>
        prev.map((test) =>
          test.name === "Authentication" ? { ...test, status: "error", message: "Auth test failed" } : test,
        ),
      )
    }

    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Connection Test</h1>
          <p className="text-gray-600">Test MongoDB connection, API routes, and authentication system</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Connection Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tests.map((test) => {
                const Icon = test.icon
                return (
                  <div key={test.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-500" />
                      <div>
                        <h3 className="font-medium">{test.name}</h3>
                        <p className="text-sm text-gray-600">{test.message}</p>
                      </div>
                    </div>
                    <div>
                      {test.status === "success" && <CheckCircle className="h-6 w-6 text-green-500" />}
                      {test.status === "error" && <XCircle className="h-6 w-6 text-red-500" />}
                      {test.status === "pending" && (
                        <div className="h-6 w-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6">
              <Button onClick={runTests} disabled={isRunning} className="w-full">
                {isRunning ? "Running Tests..." : "Run Connection Tests"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">1. Environment Variables</h4>
                <p className="text-gray-600">
                  Make sure you have set up your <code className="bg-gray-100 px-1 rounded">.env.local</code> file with:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                  <li>
                    <code>MONGODB_URI</code> - Your MongoDB connection string
                  </li>
                  <li>
                    <code>JWT_SECRET</code> - A secure secret key for JWT tokens
                  </li>
                  <li>
                    <code>ADMIN_USERNAME</code> - Admin username (default: admin)
                  </li>
                  <li>
                    <code>ADMIN_PASSWORD</code> - Admin password (default: admin123)
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">2. MongoDB Setup</h4>
                <p className="text-gray-600">Create a MongoDB Atlas cluster and get your connection string.</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">3. Test Access</h4>
                <p className="text-gray-600">
                  Visit{" "}
                  <a href="/admin/login" className="text-blue-600 hover:underline">
                    /admin/login
                  </a>{" "}
                  to test admin authentication.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
