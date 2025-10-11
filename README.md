# Adhiplus Construction Materials Website

A professional construction materials website with MongoDB backend, featuring inquiry management and admin dashboard.

## Features

- **Modern Design**: Professional construction-themed design with dark gray and purple color palette
- **Product Showcase**: Tile adhesive, epoxy, and grout products with detailed information
- **Contact Form**: Real-time inquiry submission with MongoDB storage
- **Admin Dashboard**: Secure admin panel for managing customer inquiries
- **Authentication**: JWT-based authentication for admin access
- **Responsive**: Mobile-first design with smooth animations

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: MongoDB with native driver
- **Authentication**: JWT with jose library
- **Deployment**: Vercel-ready

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/adhiplus?retryWrites=true&w=majority

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
\`\`\`

### 2. MongoDB Setup

1. **Create MongoDB Atlas Account**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Set up a free cluster
3. **Create Database User**: Add a user with read/write permissions
4. **Get Connection String**: Copy the connection string and update `MONGODB_URI`
5. **Whitelist IP**: Add your IP address to the network access list

### 3. Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

### 4. Database Collections

The application will automatically create the following collections:

- **inquiries**: Stores customer inquiry data
  - Fields: name, email, phone, company, message, productInterest, status, createdAt, updatedAt

## Usage

### Public Website
- Visit `/` for the main website
- Use the contact form to submit inquiries
- Browse product information and company details

### Admin Panel
- Visit `/admin/login` to access the admin panel
- Default credentials: `admin` / `admin123`
- Manage customer inquiries, update statuses, and view analytics

### API Endpoints

- `POST /api/inquiries` - Submit new inquiry
- `GET /api/inquiries` - Get inquiries (admin only)
- `PUT /api/inquiries/[id]` - Update inquiry status (admin only)
- `DELETE /api/inquiries/[id]` - Delete inquiry (admin only)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Check auth status

## Security Features

- JWT-based authentication with HTTP-only cookies
- Protected admin routes with middleware
- Input validation and sanitization
- Secure password handling
- CORS protection

## Deployment

### Vercel Deployment

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `MONGODB_URI`
- `JWT_SECRET` (generate a new secure key)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## Development

### Project Structure

\`\`\`
├── app/
│   ├── admin/           # Admin panel pages
│   ├── api/             # API routes
│   └── page.tsx         # Main website
├── components/          # React components
├── lib/                 # Utilities and database
├── public/              # Static assets
└── middleware.ts        # Route protection
\`\`\`

### Key Components

- `ContactSection`: Customer inquiry form
- `ProductShowcase`: Product display with animations
- `AdminPanel`: Inquiry management dashboard
- `AdminHeader`: Authentication and navigation

## Customization

### Styling
- Colors defined in `app/globals.css`
- Component styles use Tailwind CSS
- Animations and transitions included

### Content
- Update company information in components
- Modify product details in `ProductShowcase`
- Customize contact information in `ContactSection`

## Support

For technical support or questions, please contact the development team.
