"use client"

import { LoginForm } from "@/components/auth/login-form"

export function AuthClient() {
  const handleLogin = async (data: any) => {
    // TODO: Implement actual authentication logic
    console.log("Login data:", data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return <LoginForm onSubmit={handleLogin} />
}