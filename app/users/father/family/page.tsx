'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/Pagination';
import { 
  Users, 
  Phone,
  Mail,
  Calendar,
  MapPin,
  User,
  Heart,
  Eye,
  X,
  Search
} from 'lucide-react';

// Mock data - replace with actual API calls
const mockFamilyData = {
  familyName: 'Salvation Siblings',
  father: {
    id: '1',
    name: 'John Smith',
    role: 'Father',
    email: 'john.smith@example.com',
    phone: '+250 788 123 456',
    dateOfBirth: '1980-05-15',
    address: 'Kigali, Rwanda',
    status: 'active',
    baptismDate: '2010-03-20',
  },
  members: [
    {
      id: '2',
      name: 'Sarah Smith',
      role: 'Mother',
      email: 'sarah.smith@example.com',
      phone: '+250 788 123 457',
      dateOfBirth: '1982-08-22',
      status: 'active',
      baptismDate: '2010-03-20',
    },
    {
      id: '3',
      name: 'David Smith',
      role: 'Youth',
      email: 'david.smith@example.com',
      phone: '+250 788 123 458',
      dateOfBirth: '2005-11-10',
      status: 'active',
      baptismDate: '2020-06-15',
    },
    {
      id: '4',
      name: 'Emma Smith',
      role: 'Child',
      email: '',
      phone: '',
      dateOfBirth: '2012-03-05',
      status: 'active',
      baptismDate: null,
    },
  ],
};

export default function FamilyPage() {
  const [selectedMember, setSelectedMember] = useState<typeof mockFamilyData.father | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
  const allMembers = [mockFamilyData.father, ...mockFamilyData.members];

  // Filter members based on search query
  const filteredMembers = allMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'father':
        return 'bg-blue-200';
      case 'mother':
        return 'bg-pink-200';
      case 'youth':
        return 'bg-green-200';
      case 'child':
        return 'bg-yellow-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            My Family
          </h1>
          <p className="text-lg font-bold text-gray-600">
            {mockFamilyData.familyName} - {allMembers.length} Members
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
        <Input
          type="text"
          placeholder="Search by name, role, email, or phone..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-12 h-14 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-base focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Results Count */}
      {searchQuery && (
        <p className="text-sm font-bold text-gray-600">
          Found {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Family Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedMembers.length > 0 ? (
          paginatedMembers.map((member) => (
          <Card 
            key={member.id}
            className={`${getRoleColor(member.role)} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all`}
          >
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-3">
                  <User className="w-10 h-10" />
                </div>
                <CardTitle className="text-xl font-black uppercase">
                  {member.name}
                </CardTitle>
                <p className="text-xs font-bold uppercase mt-2 px-3 py-1 bg-black text-white inline-block">
                  {member.role}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {member.email && (
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{member.phone}</span>
                </div>
              )}
              <Button
                onClick={() => setSelectedMember(member)}
                className="w-full mt-3 h-10 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="inline-block p-6 bg-gray-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p className="text-xl font-black uppercase mb-2">No Members Found</p>
              <p className="font-bold text-gray-600">
                Try adjusting your search query
              </p>
            </div>
          </div>
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
          itemsPerPageOptions={[6, 9, 12, 18]}
        />
      )}

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className={`w-full max-w-2xl ${getRoleColor(selectedMember.role)} border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto`}>
            <CardHeader className="bg-black text-white border-b-4 border-black sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-black uppercase">
                  Member Details
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMember(null)}
                  className="border-2 border-white bg-white hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Profile Section */}
              <div className="flex flex-col items-center text-center pb-6 border-b-4 border-black">
                <div className="w-24 h-24 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-4">
                  <User className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black uppercase mb-2">
                  {selectedMember.name}
                </h2>
                <p className="text-sm font-bold uppercase px-4 py-2 bg-black text-white inline-block">
                  {selectedMember.role}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">
                  Contact Information
                </h3>
                {selectedMember.email && (
                  <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                    <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-600">Email</p>
                      <p className="font-bold">{selectedMember.email}</p>
                    </div>
                  </div>
                )}
                {selectedMember.phone && (
                  <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-600">Phone</p>
                      <p className="font-bold">{selectedMember.phone}</p>
                    </div>
                  </div>
                )}
                {selectedMember.role.toLowerCase() === 'father' && selectedMember.address && (
                  <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-600">Address</p>
                      <p className="font-bold">{selectedMember.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">
                  Personal Information
                </h3>
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                  <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-600">Date of Birth</p>
                    <p className="font-bold">
                      {new Date(selectedMember.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm font-bold text-gray-600 mt-1">
                      Age: {new Date().getFullYear() - new Date(selectedMember.dateOfBirth).getFullYear()} years
                    </p>
                  </div>
                </div>
                {selectedMember.baptismDate && (
                  <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                    <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-600">Baptism Date</p>
                      <p className="font-bold">
                        {new Date(selectedMember.baptismDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Family Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">
                  Family Information
                </h3>
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                  <Users className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-600">Family Name</p>
                    <p className="font-bold">{mockFamilyData.familyName}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
