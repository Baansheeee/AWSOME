"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Cloud,
  Shield,
  Zap,
  Users,
  BarChart3,
  CheckCircle,
  Star,
  Github,
  Twitter
} from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Visual Architecture Designer",
    description: "Drag-and-drop interface for designing cloud infrastructure with real-time Terraform code generation.",
    icon: <Cloud className="h-6 w-6" />
  },
  {
    title: "Multi-Cloud Support",
    description: "Build architectures across AWS, Azure, and GCP with unified management and cost optimization.",
    icon: <Shield className="h-6 w-6" />
  },
  {
    title: "AI-Powered Assistance",
    description: "Get intelligent recommendations and auto-generate architectures using our smart chatbot.",
    icon: <Zap className="h-6 w-6" />
  },
  {
    title: "Team Collaboration",
    description: "Work together with version control, real-time editing, and approval workflows.",
    icon: <Users className="h-6 w-6" />
  },
  {
    title: "Cost Intelligence",
    description: "Track spending, get optimization suggestions, and manage budgets across all cloud providers.",
    icon: <BarChart3 className="h-6 w-6" />
  },
  {
    title: "Performance Monitoring",
    description: "Monitor resource utilization, track performance metrics, and receive optimization alerts.",
    icon: <CheckCircle className="h-6 w-6" />
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "DevOps Lead at TechCorp",
    content: "AWSOME has revolutionized how we design and deploy cloud infrastructure. The visual interface saves us hours of work.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Cloud Architect at StartupXYZ",
    content: "The AI-powered suggestions have helped us optimize our cloud spend by 30%. Game changer for our team.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "CTO at ScaleUp Inc",
    content: "Finally, a tool that combines visual design with real Terraform code. Our team's productivity has doubled.",
    rating: 5
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Cloud className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AWSOME</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="#docs" className="text-gray-600 hover:text-gray-900">Docs</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            <Button asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Design Cloud Infrastructure
              <span className="text-primary-600"> Visually</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              The most comprehensive cloud architecture platform with drag-and-drop design,
              AI-powered assistance, and real-time Terraform code generation.
              Build, deploy, and optimize across AWS, Azure, and GCP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link href="/signup">
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
          </motion.div>

          {/* Hero Image/Animation placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 bg-gray-100 rounded-2xl h-96 flex items-center justify-center"
          >
            <p className="text-gray-500">Interactive Dashboard Preview</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Cloud Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From design to deployment, monitoring to optimization - all in one platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Cloud Teams Worldwide
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Cloud Infrastructure?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of teams already using AWSOME to build better cloud solutions
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Cloud className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AWSOME</span>
              </div>
              <p className="text-sm">
                The comprehensive cloud architecture platform for modern teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#docs" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <div className="flex gap-4">
                <Github className="h-5 w-5 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 AWSOME. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
