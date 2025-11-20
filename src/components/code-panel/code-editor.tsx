"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { Editor } from "@monaco-editor/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Copy,
  Download,
  CheckCircle,
  FileCode,
  Settings,
  Play,
  AlertTriangle
} from "lucide-react"

const sampleTerraformCode = `# AWS VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "main-vpc"
    Environment = "production"
    ManagedBy   = "AWSOME"
  }
}

# Public Subnets
resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-\${count.index + 1}"
    Type = "Public"
  }
}

# Private Subnets
resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "private-subnet-\${count.index + 1}"
    Type = "Private"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}

# Route Table for Public Subnets
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "public-rt"
  }
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# EC2 Instance
resource "aws_instance" "web" {
  count                  = 2
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public[count.index].id
  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<h1>Hello from AWSOME!</h1>" > /var/www/html/index.html
              EOF

  tags = {
    Name = "web-server-\${count.index + 1}"
  }
}

# Security Group
resource "aws_security_group" "web" {
  name_prefix = "web-sg"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "web-security-group"
  }
}

# Data Sources
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

# Outputs
output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "The IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "The IDs of the private subnets"
  value       = aws_subnet.private[*].id
}

output "instance_public_ips" {
  description = "The public IP addresses of the EC2 instances"
  value       = aws_instance.web[*].public_ip
}`

const files = [
  { name: "main.tf", content: sampleTerraformCode },
  {
    name: "variables.tf",
    content: `variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "instance_count" {
  description = "Number of EC2 instances"
  type        = number
  default     = 2
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}`
  },
  {
    name: "outputs.tf",
    content: `output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "The IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "instance_public_ips" {
  description = "The public IP addresses of the EC2 instances"
  value       = aws_instance.web[*].public_ip
}`
  }
]

export function CodeEditor() {
  const [activeFile, setActiveFile] = useState(files[0])
  const [copied, setCopied] = useState(false)
  const [isValid, setIsValid] = useState(true)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([activeFile.content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = activeFile.name
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="h-full flex flex-col bg-code-panel-bg border-l border-code-panel-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-code-panel-border bg-white">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FileCode className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">Generated Code</span>
          </div>

          {/* File Tabs */}
          <div className="flex space-x-1">
            {files.map((file) => (
              <button
                key={file.name}
                onClick={() => setActiveFile(file)}
                className={`px-3 py-1 text-sm rounded-t-md transition-colors ${
                  activeFile.name === file.name
                    ? "bg-code-panel-bg text-code-panel-tabActive border-t border-x border-code-panel-border"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {file.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isValid ? (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Valid
            </div>
          ) : (
            <div className="flex items-center text-error-600 text-sm">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Errors
            </div>
          )}

          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>

          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Editor
            height="100%"
            defaultLanguage="terraform"
            value={activeFile.content}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "var(--font-geist-mono), monospace",
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              readOnly: true,
              wordWrap: "on",
              tabSize: 2,
              insertSpaces: true,
              renderWhitespace: "selection",
              bracketPairColorization: { enabled: true },
              guides: {
                bracketPairs: true,
                indentation: true
              }
            }}
          />
        </motion.div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-code-panel-border bg-white">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span>{activeFile.content.split('\n').length} lines</span>
            <span className="mx-2">•</span>
            <span>{activeFile.content.length} characters</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Validate
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}