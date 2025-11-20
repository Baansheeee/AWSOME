# AWSOME - Cloud Architecture Platform

A comprehensive cloud infrastructure design platform with visual drag-and-drop interface, AI-powered assistance, and real-time Terraform code generation. Built with Next.js 16, TypeScript, and modern web technologies.

## Features

### 🎨 Visual Architecture Designer
- Drag-and-drop canvas for designing cloud infrastructure
- Real-time Terraform/HCL code generation
- Support for AWS, Azure, and GCP resources
- Multi-select with lasso tool
- Zoom/pan controls with minimap

### 🤖 AI-Powered Assistance
- Smart chatbot for architecture generation
- Natural language to infrastructure conversion
- Best practices recommendations
- Cost optimization suggestions

### 👥 Team Collaboration
- Version control integration
- Real-time collaboration
- Change tracking and reviews
- Approval workflows

### 📊 Monitoring & Analytics
- Performance metrics dashboard
- Cost intelligence and tracking
- Resource utilization monitoring
- Optimization alerts

### 🔧 DevOps Integration
- CI/CD pipeline management
- Automated deployment workflows
- Environment management
- Rollback capabilities

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **Animations**: Framer Motion
- **Data Fetching**: TanStack Query (React Query)
- **Canvas**: React Flow
- **Code Editor**: Monaco Editor
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AWSOME
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy the environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/awesome-app
MONGODB_DB_NAME=awesome

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# API Keys
OPENAI_API_KEY=your-openai-key
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret

# Feature Flags
ENABLE_AI_GENERATION=true
ENABLE_IMPORT=true
ENABLE_COLLABORATION=true
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── dashboard/           # Main dashboard
│   │   ├── architectures/       # Architecture management
│   │   ├── designer/            # Visual designer
│   │   ├── templates/           # Template gallery
│   │   ├── chatbot/             # AI assistant
│   │   ├── deployments/         # Deployment management
│   │   ├── monitoring/          # Performance monitoring
│   │   ├── costs/               # Cost intelligence
│   │   ├── collaboration/       # Team features
│   │   ├── import/              # Import/Reverse-engineer
│   │   ├── integrations/        # API integrations
│   │   ├── education/           # User education
│   │   └── admin/               # Admin dashboard
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── architectures/       # Architecture CRUD
│   │   ├── canvas/              # Canvas operations
│   │   ├── deployments/         # Deployment management
│   │   ├── import/              # Import operations
│   │   └── monitoring/          # Monitoring data
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                  # Reusable components
│   ├── ui/                      # Base UI components
│   ├── layout/                  # Layout components
│   ├── canvas/                  # Canvas/drag-drop components
│   ├── code-panel/              # Code editor components
│   ├── auth/                    # Authentication components
│   └── landing/                 # Landing page components
├── lib/                         # Utility functions
│   ├── utils.ts                 # General utilities
│   ├── auth.ts                  # Authentication helpers
│   ├── db.ts                    # Database connection
│   ├── api.ts                   # API helpers
│   └── validations.ts           # Form validations
├── hooks/                       # Custom React hooks
│   ├── use-auth.ts              # Authentication hook
│   ├── use-canvas.ts            # Canvas state hook
│   └── use-architectures.ts     # Architecture data hook
└── types/                       # TypeScript definitions
    ├── auth.ts                  # Auth types
    ├── canvas.ts                # Canvas types
    ├── architecture.ts          # Architecture types
    └── api.ts                   # API response types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Key Modules

### 1. Dashboard
- Overview with KPI cards
- Recent architectures and deployments
- Activity feed and quick actions

### 2. Architecture Designer
- Drag-and-drop canvas with React Flow
- Resource palette with cloud provider filters
- Real-time Terraform code generation
- Undo/redo with 50 action history

### 3. Templates Gallery
- Pre-built architecture templates
- Category filtering and search
- Template details with cost estimates
- One-click template application

### 4. Smart Chatbot
- AI-powered architecture generation
- Natural language processing
- Provider-specific recommendations
- Integration with canvas

### 5. Import & Reverse-Engineering
- Terraform file import
- Cloud provider connection
- Git repository integration
- Visual resource mapping

### 6. Deployment Engine
- CI/CD pipeline configuration
- Multi-environment support
- Deployment history and logs
- Rollback capabilities

### 7. Monitoring & Performance
- Real-time metrics dashboard
- Resource utilization tracking
- Performance alerts
- Historical trend analysis

### 8. Cost Intelligence
- Spending breakdown by resource
- Budget tracking and alerts
- Cost optimization recommendations
- Provider cost comparison

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Current user info

### Architectures
- `GET /api/architectures` - List architectures
- `POST /api/architectures` - Create architecture
- `GET /api/architectures/[id]` - Get specific architecture
- `PUT /api/architectures/[id]` - Update architecture

### Canvas Operations
- `POST /api/canvas/convert` - Convert canvas to Terraform
- `POST /api/canvas/validate` - Validate canvas design
- `GET /api/canvas/resources` - Get available resources

### Deployments
- `GET /api/deployments` - List deployments
- `POST /api/deployments` - Create deployment
- `GET /api/deployments/[id]/logs` - Get deployment logs

## Environment Configuration

### Required Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/awesome-app
MONGODB_DB_NAME=awesome

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloud Provider Access (optional for demo)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AZURE_CLIENT_ID=your-azure-client-id
AZURE_CLIENT_SECRET=your-azure-client-secret
GCP_PROJECT_ID=your-gcp-project-id
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
