// User and Member Types
export type Level = 'Y1' | 'Y2' | 'Y3';
export type Status = 'Current Student' | 'Alumni/Graduated';
export type Family = 'Salvation Siblings' | 'Ebenezer' | 'Jehova-nissi';
export type Role = 'Member' | 'Father' | 'Mother' | 'Leader' | 'Choir Secretary';

export interface Member {
  id: string;
  name: string;
  email: string;
  level: Level;
  status: Status;
  family: Family;
  role: Role;
  profilePicture?: string;
  createdAt: Date;
}

// Sabbath School Report Types
export interface SabbathAttendance {
  id: string;
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
  createdAt: Date;
}

// Committee Meeting Types
export interface CommitteeMeeting {
  id: string;
  title: string;
  date: Date;
  notes: string;
  attendees: string[];
  createdBy: string;
  createdAt: Date;
}

// Choir Types
export interface Song {
  id: string;
  title: string;
  lyrics: string;
  audioUrl?: string;
  choirName: string;
  uploadedBy: string;
  createdAt: Date;
}

// Blog Types
export type BlogCategory = 'Church News' | 'Word of God' | 'Events';

export interface Blog {
  id: string;
  title: string;
  content: string;
  category: BlogCategory;
  author: string;
  authorId: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Gallery Types
export type MediaType = 'image' | 'video';

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: MediaType;
  thumbnailUrl?: string;
  uploadedBy: string;
  createdAt: Date;
}

// Testimony Types
export interface Testimony {
  id: string;
  title: string;
  content: string;
  author: string;
  authorEmail?: string;
  isApproved: boolean;
  createdAt: Date;
}

// Resource Types
export type ResourceCategory = 'Spiritual Growth' | 'Bible Study' | 'Youth' | 'Family' | 'Health' | 'Prophecy';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: ResourceCategory;
  coverImageUrl?: string;
  pdfUrl?: string;
  externalUrl?: string;
  uploadedBy: string;
  createdAt: Date;
}
