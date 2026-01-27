'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Edit,
  Save,
  X,
  Users,
  Shield,
  Award
} from 'lucide-react';

export type UserProfileData = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  family: string;
  role: string;
  level?: string;
  status?: string;
  joinedDate?: Date;
  avatarUrl?: string;
};

export type UserProfileProps = {
  user: UserProfileData;
  onUpdate?: (updatedUser: Partial<UserProfileData>) => Promise<void>;
  editable?: boolean;
  showFamilyInfo?: boolean;
  showRoleInfo?: boolean;
  customFields?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
  }>;
  accentColor?: 'blue' | 'green' | 'purple' | 'yellow' | 'pink' | 'orange';
};

export default function UserProfile({
  user,
  onUpdate,
  editable = true,
  showFamilyInfo = true,
  showRoleInfo = true,
  customFields = [],
  accentColor = 'blue',
}: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfileData>>({
    name: user.name,
    email: user.email,
    phone: user.phone,
    level: user.level,
  });

  const colorClasses = {
    blue: 'bg-blue-200',
    green: 'bg-green-200',
    purple: 'bg-purple-200',
    yellow: 'bg-yellow-200',
    pink: 'bg-pink-200',
    orange: 'bg-orange-200',
  };

  const handleSave = async () => {
    if (!onUpdate) return;
    
    setIsSaving(true);
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      level: user.level,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-black uppercase transform -rotate-1">
            My Profile
          </h1>
          {editable && !isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Header Card */}
        <Card className={`mb-6 ${colorClasses[accentColor]}`}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Avatar */}
              <div className="w-32 h-32 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center flex-shrink-0">
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16" />
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h2 className="text-3xl font-black uppercase mb-2">{user.name}</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <Mail className="w-5 h-5" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 font-bold">
                      <Phone className="w-5 h-5" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role & Family Info */}
        {(showFamilyInfo || showRoleInfo) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {showFamilyInfo && (
              <Card className="bg-cyan-200">
                <CardHeader>
                  <CardTitle className="uppercase flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Family
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-black">{user.family}</p>
                </CardContent>
              </Card>
            )}

            {showRoleInfo && (
              <Card className="bg-yellow-200">
                <CardHeader>
                  <CardTitle className="uppercase flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Role
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-black">{user.role}</p>
                  {user.level && (
                    <p className="text-sm font-bold mt-2">Level: {user.level}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Custom Fields */}
        {customFields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {customFields.map((field, index) => (
              <Card key={index} className="bg-pink-200">
                <CardHeader>
                  <CardTitle className="uppercase text-sm flex items-center gap-2">
                    {field.icon || <Award className="w-5 h-5" />}
                    {field.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-black">{field.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Detailed Information */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="uppercase flex items-center justify-between">
              <span>Personal Information</span>
              {isEditing && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2 font-bold">
                  <User className="w-5 h-5" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  />
                ) : (
                  <p className="text-lg font-black p-3 bg-gray-50 border-4 border-black">
                    {user.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2 font-bold">
                  <Mail className="w-5 h-5" />
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  />
                ) : (
                  <p className="text-lg font-black p-3 bg-gray-50 border-4 border-black">
                    {user.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-2 font-bold">
                  <Phone className="w-5 h-5" />
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-lg font-black p-3 bg-gray-50 border-4 border-black">
                    {user.phone || 'Not provided'}
                  </p>
                )}
              </div>

              {/* Class/Level */}
              <div>
                <Label htmlFor="level" className="flex items-center gap-2 mb-2 font-bold">
                  <Award className="w-5 h-5" />
                  Class
                </Label>
                {isEditing ? (
                  <Select
                    value={formData.level || ''}
                    onValueChange={(value) => setFormData({ ...formData, level: value })}
                  >
                    <SelectTrigger className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Y1">Y1</SelectItem>
                      <SelectItem value="Y2">Y2</SelectItem>
                      <SelectItem value="Y3">Y3</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-lg font-black p-3 bg-gray-50 border-4 border-black">
                    {user.level || 'Not assigned'}
                  </p>
                )}
              </div>

              {/* Status & Join Date */}
              <div className="grid md:grid-cols-2 gap-6">
                {user.status && (
                  <div>
                    <Label className="flex items-center gap-2 mb-2 font-bold">
                      <Award className="w-5 h-5" />
                      Status
                    </Label>
                    <p className="text-lg font-black p-3 bg-gray-50 border-4 border-black">
                      {user.status}
                    </p>
                  </div>
                )}

                {user.joinedDate && (
                  <div>
                    <Label className="flex items-center gap-2 mb-2 font-bold">
                      <Calendar className="w-5 h-5" />
                      Member Since
                    </Label>
                    <p className="text-lg font-black p-3 bg-gray-50 border-4 border-black">
                      {new Date(user.joinedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
