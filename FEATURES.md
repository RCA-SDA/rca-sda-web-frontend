# Feature Documentation

Detailed documentation of all features in the RCA-SDA Church Management System.

## 🏠 Home Page

### Hero Section
- **Welcome message** with church name
- **Call-to-action buttons**:
  - "View Members" → Navigate to members page
  - "Share Testimony" → Navigate to testimonies page
- **Gradient background** (blue to purple)

### Features Grid
7 feature cards with icons:
1. Member Management 👥
2. Sabbath School Report 📋
3. Committee Notes 📝
4. Choir Songs 🎵
5. Church Blog ✍️
6. Gallery 📸
7. Testimonies 🙏

### Church Families Section
Display of three families with descriptions:
- **Salvation Siblings** (Blue theme)
- **Ebenezer** (Green theme)
- **Jehova-nissi** (Purple theme)

---

## 👥 Member Management

### Features
- **View all members** in card layout
- **Filter by family** (All, Salvation Siblings, Ebenezer, Jehova-nissi)
- **Add new member** via modal form
- **Member details displayed**:
  - Name
  - Email
  - Level (Y1, Y2, Y3)
  - Status (Current Student, Alumni/Graduated)
  - Family
  - Role

### User Interface
- Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
- Color-coded family borders (blue, green, purple)
- Filter buttons at top
- "Add Member" button (top right)

### Modal Form Fields
- Name (text, required)
- Email (email, required)
- Level (dropdown: Y1, Y2, Y3)
- Status (dropdown: Current Student, Alumni/Graduated)
- Family (dropdown: 3 families)
- Role (dropdown: Member, Father, Mother, Leader, Choir Secretary)

### Permissions
- **View**: All users
- **Add/Edit/Delete**: Leaders only (to be implemented)

---

## 📋 Sabbath School Report

### Features
- **Date selection** for attendance marking
- **Family-specific access** (Father/Mother can only mark their family)
- **Attendance tracking** per member:
  - ✓ Attended Sabbath
  - ✓ Attended Starting Sabbath
  - ✓ Visited People
  - ✓ Was Visited
  - ✓ Helped People
  - ✓ Was Helped
  - 📊 Days Studied Bible (0-7)

### User Interface
- Date picker at top
- Family indicator showing current user's family
- One form per family member
- Checkboxes for boolean fields
- Number input for Bible study days
- "Save Attendance" button per member

### Permissions
- **Access**: Father/Mother roles only
- **Scope**: Can only mark attendance for their own family
- **View**: Can view historical data for their family

### Data Validation
- Date cannot be in future
- Bible study days: 0-7 range
- All fields optional (can mark partial attendance)

---

## 📝 Committee Meeting Notes

### Features
- **View all meetings** in chronological order
- **Add new meeting** via modal form
- **Meeting details**:
  - Title
  - Date
  - Notes (rich text)
  - Attendees list

### User Interface
- Chronological list (newest first)
- "Add Meeting Notes" button (top right)
- Each meeting card shows:
  - Title and date
  - Full notes
  - Attendees list

### Modal Form Fields
- Meeting Title (text, required)
- Date (date picker, required)
- Meeting Notes (textarea, required)
- Attendees (comma-separated text)

### Permissions
- **View**: All users
- **Add/Edit**: Leaders only

---

## 🎵 Choir Songs

### Features
- **Browse all songs** in grid layout
- **View song details** (lyrics and audio)
- **Play audio** in-browser
- **Upload new songs** (Choir Secretaries only)

### User Interface
- Grid layout (1-3 columns responsive)
- Song cards show:
  - Title
  - Choir name
  - Audio indicator (🎵 if audio available)
  - Upload date
- Click card to view details

### Song Detail Modal
- Song title and choir name
- Audio player (if audio available)
- Full lyrics in formatted text box
- Close button

### Upload Form Fields
- Song Title (text, required)
- Choir Name (text, required)
- Lyrics (textarea, required)
- Audio File (file upload, optional, accepts audio/*)

### Permissions
- **View/Play**: All users
- **Upload**: Choir Secretaries only

---

## ✍️ Church Blog

### Features
- **Browse blog posts** by category
- **Filter by category**:
  - All Posts
  - Church News
  - Word of God
  - Events
- **Write new posts** (Leaders only)
- **Image support** for posts

### User Interface
- Category filter buttons at top
- Blog posts in vertical list
- Each post shows:
  - Category badge (color-coded)
  - Title
  - Author and date
  - Featured image (if available)
  - Content preview (300 chars)
  - "Read more" link

### Category Colors
- **Church News**: Blue
- **Word of God**: Purple
- **Events**: Green

### Write Post Form Fields
- Title (text, required)
- Category (dropdown, required)
- Image URL (url, optional)
- Content (textarea, required)

### Permissions
- **View**: All users
- **Write/Edit**: Leaders only
- **Word of God posts**: Ministry leaders only (to be implemented)

---

## 📸 Gallery

### Features
- **View photos and videos** in grid
- **Filter by type** (All, Photos, Videos)
- **Full-screen viewer** for media
- **Upload new media**

### User Interface
- Filter buttons (All, Photos, Videos)
- Grid layout (2-4 columns responsive)
- Square aspect ratio thumbnails
- Hover effect shows title
- Click to open full-screen viewer

### Full-Screen Viewer
- Large media display
- Title and description
- Upload date
- Close button (X)
- Video controls (for videos)

### Upload Form Fields
- Title (text, required)
- Description (textarea, optional)
- Media Type (dropdown: Photo, Video)
- File (file upload, required)
  - Photos: accepts image/*
  - Videos: accepts video/*

### Permissions
- **View**: All users
- **Upload**: Leaders and designated members

---

## 🙏 Testimonies

### Features
- **Submit testimony** (public form)
- **View approved testimonies**
- **Approval workflow** (moderation)

### User Interface
- Hero section with call-to-action
- "Share Your Testimony" button
- Testimonies displayed in cards with:
  - Prayer hands icon (🙏)
  - Title
  - Author and date
  - Full content

### Submission Form Fields
- Your Name (text, required)
- Email (email, optional)
- Title (text, required)
- Your Testimony (textarea, required)
- Info box: "Will be reviewed before publishing"

### Success Message
After submission:
- ✅ Checkmark icon
- "Thank You!" message
- Explanation about approval process
- Close button

### Approval Workflow
1. User submits testimony
2. Testimony saved with `isApproved: false`
3. Leader reviews and approves
4. Approved testimonies appear publicly

### Permissions
- **Submit**: Anyone (public)
- **View**: All users (approved only)
- **Approve**: Leaders only

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Success**: Green (#16a34a)
- **Warning**: Purple (#9333ea)
- **Neutral**: Zinc (50-950)

### Family Colors
- **Salvation Siblings**: Blue (50, 200, 500, 800, 950)
- **Ebenezer**: Green (50, 200, 500, 800, 950)
- **Jehova-nissi**: Purple (50, 200, 500, 800, 950)

### Typography
- **Headings**: Geist Sans, bold
- **Body**: Geist Sans, regular
- **Code**: Geist Mono

### Spacing
- **Section padding**: py-8 to py-20
- **Card padding**: p-4 to p-8
- **Gap**: gap-4 to gap-8

### Borders
- **Radius**: rounded-lg (8px)
- **Width**: border or border-2
- **Color**: zinc-200 (light), zinc-800 (dark)

### Shadows
- **Cards**: shadow-sm
- **Hover**: shadow-lg
- **Modals**: shadow-xl

---

## 🔐 Role-Based Features

### Member (Default)
✓ View all content
✓ Submit testimonies
✓ View choir songs
✓ Play audio
✓ Read blog posts
✓ View gallery
✗ Cannot modify content

### Father/Mother
✓ All Member features
✓ Mark Sabbath attendance (own family only)
✓ View family reports
✗ Cannot access other families

### Choir Secretary
✓ All Member features
✓ Upload songs
✓ Upload audio files
✓ Manage choir content
✗ Limited to choir section

### Leader (Admin)
✓ All features
✓ Write blog posts
✓ Approve testimonies
✓ Document meetings
✓ Manage all content
✓ Access all families
✓ User management

---

## 📱 Responsive Behavior

### Mobile (< 768px)
- Single column layouts
- Hamburger menu
- Touch-friendly buttons (min 44px)
- Simplified navigation
- Stacked forms

### Tablet (768px - 1024px)
- 2-column grids
- Expanded navigation
- Side-by-side forms
- Larger touch targets

### Desktop (> 1024px)
- 3-4 column grids
- Full navigation bar
- Multi-column forms
- Hover effects
- Keyboard shortcuts (to be added)

---

## ♿ Accessibility Features

### Current
- Semantic HTML
- ARIA labels (to be added)
- Keyboard navigation
- Color contrast (WCAG AA)
- Dark mode support
- Focus indicators

### To Be Added
- Screen reader optimization
- Skip navigation links
- Form error announcements
- Loading state announcements
- Keyboard shortcuts

---

## 🚀 Performance Features

### Current
- Static page generation
- Image optimization (Next.js Image)
- Code splitting
- Tree shaking
- Minification

### To Be Added
- Lazy loading
- Infinite scroll
- Image lazy loading
- Service worker
- Offline support

---

## 🔄 Future Features

### Phase 2
- [ ] Search functionality
- [ ] Advanced filtering
- [ ] Export to PDF/Excel
- [ ] Email notifications
- [ ] SMS reminders

### Phase 3
- [ ] Event calendar
- [ ] Online giving
- [ ] Prayer requests
- [ ] Small groups
- [ ] Volunteer scheduling

### Phase 4
- [ ] Mobile app
- [ ] Push notifications
- [ ] Live streaming
- [ ] Chat/messaging
- [ ] Analytics dashboard

---

For implementation details, see the code in the respective page files.
