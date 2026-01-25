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

export default function MembersPage() {
  const [selectedFamily, setSelectedFamily] = useState<Family | 'All'>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - replace with actual API calls
  const members: Member[] = [];

  const filteredMembers = selectedFamily === 'All' 
    ? members 
    : members.filter(m => m.family === selectedFamily);

  return (
    <div className="min-h-screen bg-zinc-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">
            Church Members
          </h1>
          <Button onClick={() => setShowAddModal(true)}>
            Add Member
          </Button>
        </div>

        {/* Family Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <Button
            variant={selectedFamily === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedFamily('All')}
          >
            All Families
          </Button>
          {FAMILIES.map(family => (
            <Button
              key={family}
              variant={selectedFamily === family ? 'default' : 'outline'}
              onClick={() => setSelectedFamily(family)}
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
            filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))
          )}
        </div>

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
    'Salvation Siblings': 'border-l-blue-500',
    'Ebenezer': 'border-l-green-500',
    'Jehova-nissi': 'border-l-purple-500',
  };

  return (
    <Card className={`border-l-4 ${familyColors[member.family]}`}>
      <CardHeader>
        <CardTitle className="text-lg">{member.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm text-zinc-600">
          <p>Email: {member.email}</p>
          <p>Level: {member.level}</p>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call here
    console.log('Adding member:', formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
