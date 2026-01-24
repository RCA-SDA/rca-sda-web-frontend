'use client';

import { useState } from 'react';
import { Member, Family, Level, Status } from '@/types';
import { FAMILIES } from '@/lib/constants';

export default function MembersPage() {
  const [selectedFamily, setSelectedFamily] = useState<Family | 'All'>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - replace with actual API calls
  const members: Member[] = [];

  const filteredMembers = selectedFamily === 'All' 
    ? members 
    : members.filter(m => m.family === selectedFamily);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Church Members
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Member
          </button>
        </div>

        {/* Family Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedFamily('All')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedFamily === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            All Families
          </button>
          {FAMILIES.map(family => (
            <button
              key={family}
              onClick={() => setSelectedFamily(family)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedFamily === family
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {family}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.length === 0 ? (
            <div className="col-span-full text-center py-12 text-zinc-500 dark:text-zinc-400">
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
    'Salvation Siblings': 'border-blue-500',
    'Ebenezer': 'border-green-500',
    'Jehova-nissi': 'border-purple-500',
  };

  return (
    <div className={`bg-white dark:bg-zinc-900 border-l-4 ${familyColors[member.family]} rounded-lg p-6 shadow-sm`}>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
        {member.name}
      </h3>
      <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
        <p>Email: {member.email}</p>
        <p>Level: {member.level}</p>
        <p>Status: {member.status}</p>
        <p>Family: {member.family}</p>
        <p>Role: {member.role}</p>
      </div>
    </div>
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
          Add New Member
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Level
            </label>
            <select
              value={formData.level}
              onChange={e => setFormData({ ...formData, level: e.target.value as Level })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            >
              <option value="Y1">Y1</option>
              <option value="Y2">Y2</option>
              <option value="Y3">Y3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Status
            </label>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            >
              <option value="Current Student">Current Student</option>
              <option value="Alumni/Graduated">Alumni/Graduated</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Family
            </label>
            <select
              value={formData.family}
              onChange={e => setFormData({ ...formData, family: e.target.value as Family })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            >
              {FAMILIES.map(family => (
                <option key={family} value={family}>{family}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
