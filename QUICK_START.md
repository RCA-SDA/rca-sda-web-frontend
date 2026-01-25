# Quick Start Guide

Get the RCA-SDA Church Management System up and running in minutes!

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd rca-sda-web-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 What's Included

### Pages
- **Home** (`/`) - Landing page with features overview
- **Members** (`/members`) - Member management by families
- **Sabbath Report** (`/sabbath-report`) - Attendance tracking
- **Committee** (`/committee`) - Meeting notes
- **Choir** (`/choir`) - Song library with audio
- **Blog** (`/blog`) - Church news and teachings
- **Gallery** (`/gallery`) - Photos and videos
- **Testimonies** (`/testimonies`) - Member testimonies

### Components
- `Navbar` - Main navigation bar
- `FamilyCard` - Family display component
- Modal forms for CRUD operations

### Types
All TypeScript types are defined in `types/index.ts`:
- Member, SabbathAttendance, CommitteeMeeting
- Song, Blog, GalleryItem, Testimony

### Utilities
- `lib/constants.ts` - App constants (families, levels, statuses)
- `lib/api.ts` - API client functions (ready for backend integration)

## 🎨 Customization

### Colors
Edit Tailwind classes in components to match your brand:
- Primary: `blue-600`
- Families: `blue-50`, `green-50`, `purple-50`

### Fonts
Fonts are configured in `app/layout.tsx`:
- Geist Sans (body text)
- Geist Mono (code)

### Logo
Replace the text logo in `components/Navbar.tsx` with your church logo.

## 🔧 Configuration

### Environment Variables
Create `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📝 Next Steps

### 1. Set Up Backend
Choose your backend technology:
- Next.js API Routes (easiest)
- Node.js/Express
- Python/FastAPI
- Any REST API

See `DATABASE_SCHEMA.md` for database structure.

### 2. Implement Authentication
Options:
- NextAuth.js (recommended for Next.js)
- Clerk
- Auth0
- Custom JWT solution

### 3. Add File Upload
Options:
- AWS S3
- Cloudinary
- Vercel Blob
- Local storage (development only)

### 4. Connect API
Replace mock data in pages with actual API calls using functions from `lib/api.ts`.

Example:
```typescript
// Before (mock data)
const members: Member[] = [];

// After (API call)
import { membersAPI } from '@/lib/api';

const [members, setMembers] = useState<Member[]>([]);

useEffect(() => {
  membersAPI.getAll().then(setMembers);
}, []);
```

## 🧪 Testing

### Run Linter
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📚 Documentation

- **README.md** - Project overview and features
- **PROJECT_OVERVIEW.md** - Detailed architecture and design
- **DATABASE_SCHEMA.md** - Database structure
- **DEPLOYMENT.md** - Deployment instructions
- **CONTRIBUTING.md** - Contribution guidelines

## 🎯 Common Tasks

### Add a New Page
1. Create file in `app/new-page/page.tsx`
2. Add link in `components/Navbar.tsx`
3. Add route to home page features

### Add a New Component
1. Create file in `components/ComponentName.tsx`
2. Import and use in your pages

### Add a New Type
1. Add to `types/index.ts`
2. Export and use throughout the app

### Modify Styles
- Use Tailwind classes directly in JSX
- Global styles in `app/globals.css`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### TypeScript Errors
```bash
# Check for errors
npx tsc --noEmit
```

## 💡 Tips

1. **Use TypeScript**: All files use `.tsx` extension
2. **Client Components**: Add `'use client'` for hooks/state
3. **Server Components**: Default in Next.js App Router
4. **Responsive Design**: Test on mobile, tablet, desktop
5. **Dark Mode**: Supported via Tailwind's `dark:` prefix

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📞 Need Help?

- Check existing documentation
- Review code comments
- Open an issue on GitHub
- Contact the development team

## ✅ Checklist

Before deploying to production:

- [ ] Set up backend API
- [ ] Implement authentication
- [ ] Add file upload functionality
- [ ] Connect all API endpoints
- [ ] Test all features
- [ ] Set up database
- [ ] Configure environment variables
- [ ] Test on multiple devices
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Add SSL certificate
- [ ] Test performance
- [ ] Review security

---

**Happy Coding! 🎉**

For detailed information, see the full documentation in the project root.
