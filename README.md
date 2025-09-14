# Content Generator Web App

A modern Next.js 14 application for creating and managing professional social media content with an intuitive drag-and-drop editor, template system, and user authentication.
<video src="https://github.com/user-attachments/assets/24f7cafb-5b33-446f-928a-51206e3f2613" autoplay loop muted playsinline width="600"></video>

## 🚀 Features

### 🎨 Content Creation
- **Drag & Drop Editor** - Intuitive canvas-based design tool powered by Fabric.js
- **Template Library** - Extensive collection of professional templates
- **Multi-format Export** - PNG, JPG, SVG, PDF support
- **Layer Management** - Hierarchical element organization
- **Property Panel** - Real-time element editing
- **Grid System** - Snap-to-grid functionality
- **Undo/Redo** - Complete history management

### 👤 User Management
- **Authentication System** - Secure login/registration with Supabase
- **Project Management** - Organize and manage content projects
- **Cloud Storage** - Access projects from anywhere
- **User Dashboard** - Comprehensive project overview

### 🛠️ Advanced Tools
- **Responsive Design** - Works on all devices
- **Real-time Updates** - Live canvas editing
- **Template Search** - Find templates quickly
- **Project History** - Track and restore changes

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Canvas Editor**: Fabric.js
- **UI Components**: Radix UI
- **Authentication**: Supabase
- **Forms**: React Hook Form
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** or **yarn**
- **Supabase Account** (for authentication and database)

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd content-generator-web

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration (if using external API)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Optional: Additional configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Development

```bash
# Start the development server
npm run dev
# or
yarn dev

# Open http://localhost:3000 in your browser
```

### 4. Build for Production

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

## 📁 Project Structure

```
content-generator-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── (dashboard)/       # Dashboard routes
│   │   │   ├── create/        # Content creation
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   ├── editor/        # Canvas editor
│   │   │   ├── history/       # Project history
│   │   │   ├── projects/      # Project management
│   │   │   ├── settings/      # User settings
│   │   │   └── templates/     # Template browser
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── editor/            # Canvas editor components
│   │   ├── layout/            # Layout components
│   │   ├── templates/         # Template components
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── store/                 # Zustand state management
│   ├── styles/                # CSS files
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.js             # Next.js configuration
```

## 🎨 Key Components

### Canvas Editor
- **Fabric.js Integration** - Powerful canvas manipulation
- **Element Tools** - Text, shapes, images, lines
- **Layer Panel** - Manage element hierarchy
- **Property Panel** - Edit element properties
- **Toolbar** - Drawing and selection tools

### Template System
- **Template Grid** - Browse available templates
- **Template Cards** - Preview and select templates
- **Category Filtering** - Filter by template type
- **Search Functionality** - Find templates quickly

### Authentication
- **Login/Register Forms** - User authentication
- **Auth Guard** - Protected routes
- **User Profile** - Manage user settings

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript types
```

### Code Style

- **ESLint** - Code linting with Next.js rules
- **Prettier** - Code formatting
- **TypeScript** - Strict type checking
- **Tailwind CSS** - Utility-first styling

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
    },
  },
  plugins: [],
}
```

### TypeScript

Strict TypeScript configuration with path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📚 Documentation

- [Complete Project Documentation](./PROJECT_DOCUMENTATION.md) - Detailed technical documentation
- [Next.js Documentation](https://nextjs.org/docs) - Next.js framework docs
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework
- [Fabric.js](http://fabricjs.com/docs) - Canvas library
- [Supabase](https://supabase.com/docs) - Backend services

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**
- **AWS Amplify**
- **Railway**
- **DigitalOcean App Platform**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the [Project Documentation](./PROJECT_DOCUMENTATION.md)
- Review the [Next.js documentation](https://nextjs.org/docs)

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS.**
