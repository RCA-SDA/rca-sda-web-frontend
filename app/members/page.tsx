'use client';

import { useState } from 'react';
import { Member, Family, Level, Status } from '@/types';
import { FAMILIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Mail, GraduationCap, Users as UsersIcon, User, Search, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { Pagination } from '@/components/Pagination';

export default function MembersPage() {
  const [selectedFamily, setSelectedFamily] = useState<Family | 'All'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Mock data - replace with actual API calls
  const members: Member[] = [
    {
      id: '1',
      name: 'John Mensah',
      email: 'john.mensah@example.com',
      level: 'Y3',
      status: 'Current Student',
      family: 'Salvation Siblings',
      role: 'Father',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Grace Osei',
      email: 'grace.osei@example.com',
      level: 'Y2',
      status: 'Current Student',
      family: 'Salvation Siblings',
      role: 'Mother',
      profilePicture: 'https://i.pravatar.cc/300?img=33',
      createdAt: new Date('2024-02-10'),
    },
    {
      id: '3',
      name: 'Emmanuel Boateng',
      email: 'emmanuel.b@example.com',
      level: 'Y1',
      status: 'Current Student',
      family: 'Salvation Siblings',
      role: 'Member',
      createdAt: new Date('2024-03-05'),
    },
    {
      id: '4',
      name: 'Sarah Agyeman',
      email: 'sarah.agyeman@example.com',
      level: 'Y2',
      status: 'Current Student',
      family: 'Salvation Siblings',
      role: 'Member',
      profilePicture: 'https://i.pravatar.cc/300?img=33',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '5',
      name: 'David Owusu',
      email: 'david.owusu@example.com',
      level: 'Y3',
      status: 'Alumni/Graduated',
      family: 'Ebenezer',
      role: 'Father',
      createdAt: new Date('2023-09-01'),
    },
    {
      id: '6',
      name: 'Abigail Asante',
      email: 'abigail.asante@example.com',
      level: 'Y3',
      status: 'Current Student',
      family: 'Ebenezer',
      role: 'Mother',
      profilePicture: 'https://i.pravatar.cc/300?img=33',
      createdAt: new Date('2024-01-10'),
    },
    {
      id: '7',
      name: 'Michael Adjei',
      email: 'michael.adjei@example.com',
      level: 'Y1',
      status: 'Current Student',
      family: 'Ebenezer',
      role: 'Member',
      profilePicture: 'https://i.pravatar.cc/300?img=33',
      createdAt: new Date('2024-04-12'),
    },
    {
      id: '8',
      name: 'Esther Frimpong',
      email: 'esther.frimpong@example.com',
      level: 'Y2',
      status: 'Current Student',
      family: 'Ebenezer',
      role: 'Choir Secretary',
      // profilePicture: 'https://i.pravatar.cc/300?img=33',
      createdAt: new Date('2024-02-28'),
    },
    {
      id: '9',
      name: 'Samuel Appiah',
      email: 'samuel.appiah@example.com',
      level: 'Y3',
      status: 'Current Student',
      family: 'Jehova-nissi',
      role: 'Father',
      createdAt: new Date('2024-01-05'),
    },
    {
      id: '10',
      name: 'Rebecca Amoah',
      email: 'rebecca.amoah@example.com',
      level: 'Y2',
      status: 'Current Student',
      family: 'Jehova-nissi',
      role: 'Mother',
      profilePicture: 'https://i.pravatar.cc/300?img=33',
      createdAt: new Date('2024-02-15'),
    },
    {
      id: '11',
      name: 'Joseph Antwi',
      email: 'joseph.antwi@example.com',
      level: 'Y1',
      status: 'Current Student',
      family: 'Jehova-nissi',
      role: 'Member',
      profilePicture: 'https://i.pravatar.cc/300?img=33',
      createdAt: new Date('2024-03-20'),
    },
    {
      id: '12',
      name: 'Ruth Darko',
      email: 'ruth.darko@example.com',
      level: 'Y2',
      status: 'Alumni/Graduated',
      family: 'Jehova-nissi',
      role: 'Leader',
      createdAt: new Date('2023-08-15'),
    },
  ];

  const filteredMembers = members
    .filter(m => selectedFamily === 'All' || m.family === selectedFamily)
    .filter(m => 
      searchQuery === '' || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Pagination calculations
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFamilyChange = (family: Family | 'All') => {
    setSelectedFamily(family);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1">
            Church Members
          </h1>
          <Button onClick={() => setShowAddModal(true)}>
            <UserPlus className="w-5 h-5 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Family Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <Button
            variant={selectedFamily === 'All' ? 'default' : 'outline'}
            onClick={() => handleFamilyChange('All')}
          >
            All Families
          </Button>
          {FAMILIES.map(family => (
            <Button
              key={family}
              variant={selectedFamily === family ? 'default' : 'outline'}
              onClick={() => handleFamilyChange(family)}
            >
              {family}
            </Button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.length === 0 ? (
            <div className="col-span-full text-center py-12 text-zinc-500">
              No members found. Add your first member to get started.
            </div>
          ) : (
            paginatedMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredMembers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredMembers.length}
            onItemsPerPageChange={setItemsPerPage}
            itemsPerPageOptions={[6, 9, 12, 24]}
          />
        )}

        {/* Add Member Modal */}
        {showAddModal && (
          <AddMemberModal onClose={() => setShowAddModal(false)} />
        )}
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  const familyColors = {
    'Salvation Siblings': 'bg-blue-300',
    'Ebenezer': 'bg-green-300',
    'Jehova-nissi': 'bg-purple-300',
  };

  return (
    <Card className={`${familyColors[member.family]} overflow-hidden`}>
      <div className="relative w-full h-64 bg-white border-b-4 border-black">
        {member.profilePicture ? (
          <Image
            src={member.profilePicture}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-300 to-pink-300 border-b-4 border-black">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white border-4 border-black  flex items-center justify-center">
                <User className="w-16 h-16 text-black" strokeWidth={3} />
              </div>
            </div>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl uppercase">
          {member.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm font-bold">
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {member.email}
          </p>
          <p className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Level: {member.level}
          </p>
          <p>Status: {member.status}</p>
          <p>Family: {member.family}</p>
          <p>Role: {member.role}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AddMemberModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: 'Y1' as Level,
    status: 'Current Student' as Status,
    family: 'Salvation Siblings' as Family,
    role: 'Member',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImageFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call here with imageFile
    console.log('Adding member:', formData, imageFile);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture Upload */}
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex flex-col items-center gap-4">
              {profileImage ? (
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Image
                      src={profileImage}
                      alt="Profile preview"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-pink-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <User className="w-16 h-16 text-black" strokeWidth={3} />
                </div>
              )}
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-bold">
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select
              value={formData.level}
              onValueChange={(value) => setFormData({ ...formData, level: value as Level })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Y1">Y1</SelectItem>
                <SelectItem value="Y2">Y2</SelectItem>
                <SelectItem value="Y3">Y3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as Status })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Current Student">Current Student</SelectItem>
                <SelectItem value="Alumni/Graduated">Alumni/Graduated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="family">Family</Label>
            <Select
              value={formData.family}
              onValueChange={(value) => setFormData({ ...formData, family: value as Family })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FAMILIES.map(family => (
                  <SelectItem key={family} value={family}>{family}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
