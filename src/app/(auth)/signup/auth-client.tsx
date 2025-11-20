"use client"

import { SignupForm } from "@/components/auth/signup-form"

export function AuthClient() {
  const handleSignup = async (data: any) => {
    // TODO: Implement actual registration logic
    console.log("Signup data:", data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return <SignupForm onSubmit={handleSignup} />
}