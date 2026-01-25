# Database Schema

This document outlines the recommended database schema for the RCA-SDA Church Management System.

## Tables

### 1. users
Stores all user accounts and authentication information.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('Member', 'Father', 'Mother', 'Leader', 'Choir Secretary')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. members
Stores church member information.

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  level VARCHAR(10) NOT NULL CHECK (level IN ('Y1', 'Y2', 'Y3')),
  status VARCHAR(50) NOT NULL CHECK (status IN ('Current Student', 'Alumni/Graduated')),
  family VARCHAR(50) NOT NULL CHECK (family IN ('Salvation Siblings', 'Ebenezer', 'Jehova-nissi')),
  role VARCHAR(50) NOT NULL CHECK (role IN ('Member', 'Father', 'Mother', 'Leader', 'Choir Secretary')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_members_family ON members(family);
CREATE INDEX idx_members_status ON members(status);
```

### 3. sabbath_attendance
Tracks Sabbath school attendance and activities.

```sql
CREATE TABLE sabbath_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  family VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  attended_sabbath BOOLEAN DEFAULT FALSE,
  attended_starting_sabbath BOOLEAN DEFAULT FALSE,
  studied_bible INTEGER DEFAULT 0 CHECK (studied_bible >= 0 AND studied_bible <= 7),
  visited_people BOOLEAN DEFAULT FALSE,
  was_visited BOOLEAN DEFAULT FALSE,
  helped_people BOOLEAN DEFAULT FALSE,
  was_helped BOOLEAN DEFAULT FALSE,
  recorded_by UUID REFERENCES members(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(member_id, date)
);

CREATE INDEX idx_attendance_date ON sabbath_attendance(date);
CREATE INDEX idx_attendance_family ON sabbath_attendance(family);
CREATE INDEX idx_attendance_member ON sabbath_attendance(member_id);
```

### 4. committee_meetings
Stores committee meeting notes.

```sql
CREATE TABLE committee_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  notes TEXT NOT NULL,
  attendees TEXT[], -- Array of attendee names
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_meetings_date ON committee_meetings(date DESC);
```

### 5. songs
Stores choir songs and lyrics.

```sql
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  lyrics TEXT NOT NULL,
  audio_url VARCHAR(500),
  choir_name VARCHAR(255) NOT NULL,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_songs_choir ON songs(choir_name);
```

### 6. blogs
Stores blog posts.

```sql
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('Church News', 'Word of God', 'Events')),
  author VARCHAR(255) NOT NULL,
  author_id UUID REFERENCES users(id),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_created ON blogs(created_at DESC);
```

### 7. gallery_items
Stores photos and videos.

```sql
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  media_url VARCHAR(500) NOT NULL,
  media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'video')),
  thumbnail_url VARCHAR(500),
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gallery_type ON gallery_items(media_type);
CREATE INDEX idx_gallery_created ON gallery_items(created_at DESC);
```

### 8. testimonies
Stores member testimonies.

```sql
CREATE TABLE testimonies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  author_email VARCHAR(255),
  is_approved BOOLEAN DEFAULT FALSE,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_testimonies_approved ON testimonies(is_approved);
CREATE INDEX idx_testimonies_created ON testimonies(created_at DESC);
```

## Relationships

- `users` → `members` (one-to-one)
- `members` → `sabbath_attendance` (one-to-many)
- `members` → `sabbath_attendance.recorded_by` (one-to-many)
- `users` → `committee_meetings` (one-to-many)
- `users` → `songs` (one-to-many)
- `users` → `blogs` (one-to-many)
- `users` → `gallery_items` (one-to-many)
- `users` → `testimonies.approved_by` (one-to-many)

## Sample Queries

### Get all members in a family
```sql
SELECT * FROM members 
WHERE family = 'Salvation Siblings' 
ORDER BY name;
```

### Get Sabbath attendance for a specific date
```sql
SELECT m.name, m.family, sa.*
FROM sabbath_attendance sa
JOIN members m ON sa.member_id = m.id
WHERE sa.date = '2026-01-25'
ORDER BY m.family, m.name;
```

### Get approved testimonies
```sql
SELECT * FROM testimonies 
WHERE is_approved = TRUE 
ORDER BY created_at DESC;
```

### Get recent blog posts by category
```sql
SELECT * FROM blogs 
WHERE category = 'Word of God' 
ORDER BY created_at DESC 
LIMIT 10;
```

## Notes

- All tables use UUID for primary keys for better scalability
- Timestamps are automatically managed with `created_at` and `updated_at`
- Indexes are added on frequently queried columns
- Foreign keys ensure referential integrity
- Check constraints validate enum-like values
- The schema supports soft deletes if needed (add `deleted_at` column)

## Migration Tools

Consider using one of these tools for database migrations:

- **Prisma** (TypeScript ORM with migrations)
- **Drizzle ORM** (Lightweight TypeScript ORM)
- **TypeORM** (Full-featured TypeScript ORM)
- **Knex.js** (SQL query builder with migrations)
- **Sequelize** (Traditional Node.js ORM)

## Example with Prisma

```prisma
// schema.prisma
model Member {
  id        String   @id @default(uuid())
  name      String
  email     String
  level     Level
  status    Status
  family    Family
  role      Role
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  attendance SabbathAttendance[]
}

enum Level {
  Y1
  Y2
  Y3
}

enum Status {
  CURRENT_STUDENT
  ALUMNI_GRADUATED
}

enum Family {
  SALVATION_SIBLINGS
  EBENEZER
  JEHOVA_NISSI
}
```
