# RCA-SDA Church Management System

A comprehensive church management web application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Inspired by the clean, modern design of PayPing.

## Features

### 1. Member Management
- View all church members organized by families
- Three church families: **Salvation Siblings**, **Ebenezer**, and **Jehova-nissi**
- Track member details: name, email, level (Y1, Y2, Y3), status (Current Student, Alumni/Graduated)
- Add and remove members from their respective families
- Role-based access (Member, Father, Mother, Leader, Choir Secretary)

### 2. Sabbath School Report
- Family fathers and mothers can mark attendance for their family members
- Track multiple spiritual activities:
  - Sabbath attendance
  - Starting Sabbath event attendance
  - Daily Bible study (0-7 days)
  - Visiting people
  - Being visited
  - Helping people
  - Being helped
- Date-based reporting
- Family-specific access control

### 3. Committee Meeting Notes
- Document RCA-SDA committee meeting notes
- Track meeting dates, titles, and attendees
- Searchable meeting history
- Rich text note-taking

### 4. Choir Management
- Choir secretaries can upload song lyrics and audio files
- Browse all choir songs
- Play audio recordings
- View song lyrics
- Organized by choir name

### 5. Church Blog
- Three categories: Church News, Word of God, Events
- Leaders can write and publish blog posts
- Image support for posts
- Category filtering
- Responsive reading experience

### 6. Gallery
- Upload and view photos and videos from church events
- Filter by media type (photos/videos)
- Full-screen media viewer
- Organized chronologically

### 7. Testimonies
- Members can share their testimonies
- Approval system for moderation
- Public testimony wall
- Encouraging community feature

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd rca-sda-web-frontend
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
rca-sda-web-frontend/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout with navbar
│   ├── members/             # Member management
│   ├── sabbath-report/      # Sabbath school reporting
│   ├── committee/           # Committee meeting notes
│   ├── choir/               # Choir songs
│   ├── blog/                # Church blog
│   ├── gallery/             # Photo/video gallery
│   └── testimonies/         # Member testimonies
├── components/              # Reusable components
│   ├── Navbar.tsx          # Navigation bar
│   └── FamilyCard.tsx      # Family display card
├── types/                   # TypeScript type definitions
│   └── index.ts            # All type definitions
├── lib/                     # Utility functions
│   └── constants.ts        # App constants
└── public/                  # Static assets
```

## Key Types

### Member
```typescript
interface Member {
  id: string;
  name: string;
  email: string;
  level: 'Y1' | 'Y2' | 'Y3';
  status: 'Current Student' | 'Alumni/Graduated';
  family: 'Salvation Siblings' | 'Ebenezer' | 'Jehova-nissi';
  role: 'Member' | 'Father' | 'Mother' | 'Leader' | 'Choir Secretary';
}
```

### Sabbath Attendance
```typescript
interface SabbathAttendance {
  memberId: string;
  family: Family;
  date: Date;
  attendedSabbath: boolean;
  attendedStartingSabbath: boolean;
  studiedBible: number; // 0-7 days
  visitedPeople: boolean;
  wasVisited: boolean;
  helpedPeople: boolean;
  wasHelped: boolean;
  recordedBy: string; // Father/Mother ID
}
```

## Role-Based Access

- **Members**: View content, submit testimonies
- **Father/Mother**: Mark attendance for their family members
- **Choir Secretary**: Upload and manage choir songs
- **Leader**: Write blog posts, manage content

## Next Steps

To make this a fully functional application, you'll need to:

1. **Set up a backend API** (e.g., Node.js/Express, Python/FastAPI, or Next.js API routes)
2. **Add a database** (e.g., PostgreSQL, MongoDB, or Supabase)
3. **Implement authentication** (e.g., NextAuth.js, Clerk, or Auth0)
4. **Add file upload functionality** (e.g., AWS S3, Cloudinary, or Vercel Blob)
5. **Connect frontend to API** (replace mock data with actual API calls)
6. **Add form validation** (e.g., Zod, React Hook Form)
7. **Implement search and filtering**
8. **Add pagination for large datasets**
9. **Set up email notifications** (for attendance reminders, etc.)
10. **Deploy to production** (Vercel, Netlify, or your preferred platform)

## Design Inspiration

The UI design is inspired by PayPing's clean, modern interface featuring:
- Clear visual hierarchy
- Organized sections with cards
- Smooth transitions and hover effects
- Responsive design for all screen sizes
- Dark mode support
- Accessible color contrasts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
