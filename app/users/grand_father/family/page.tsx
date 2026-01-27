'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Phone,
  Mail,
  User,
  Eye,
  X,
  Search,
  UserCheck
} from 'lucide-react';
import { Pagination } from '@/components/Pagination';

type Family = {
  id: string;
  name: string;
  fatherName: string;
  fatherEmail: string;
  fatherPhone: string;
  memberCount: number;
  status: string;
  createdDate: string;
};

// Mock data - replace with actual API calls
const mockFamilies: Family[] = [
  {
    id: '1',
    name: 'Salvation Siblings',
    fatherName: 'John Smith',
    fatherEmail: 'john.smith@example.com',
    fatherPhone: '+250 788 123 456',
    memberCount: 4,
    status: 'active',
    createdDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Grace Family',
    fatherName: 'Michael Johnson',
    fatherEmail: 'michael.j@example.com',
    fatherPhone: '+250 788 234 567',
    memberCount: 5,
    status: 'active',
    createdDate: '2024-02-20',
  },
  {
    id: '3',
    name: 'Faith Warriors',
    fatherName: 'David Brown',
    fatherEmail: 'david.brown@example.com',
    fatherPhone: '+250 788 345 678',
    memberCount: 3,
    status: 'active',
    createdDate: '2024-03-10',
  },
];

export default function AllFamiliesPage() {
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Filter families based on search query
  const filteredFamilies = mockFamilies.filter(family => 
    family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    family.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    family.fatherEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredFamilies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFamilies = filteredFamilies.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            All Families
          </h1>
          <p className="text-lg font-bold text-gray-600">
            {mockFamilies.length} Families Registered
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
        <Input
          type="text"
          placeholder="Search by family name, father name, or email..."
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
          Found {filteredFamilies.length} famil{filteredFamilies.length !== 1 ? 'ies' : 'y'}
        </p>
      )}

      {/* Families List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedFamilies.length > 0 ? (
          paginatedFamilies.map((family) => (
          <Card 
            key={family.id}
            className="bg-purple-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-3">
                  <Users className="w-10 h-10" />
                </div>
                <CardTitle className="text-xl font-black uppercase">
                  {family.name}
                </CardTitle>
                <p className="text-xs font-bold uppercase mt-2 px-3 py-1 bg-black text-white inline-block">
                  {family.memberCount} Members
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white border-2 border-black">
                <p className="text-xs font-bold uppercase text-gray-600 mb-1">Father</p>
                <p className="font-black">{family.fatherName}</p>
              </div>
              <div className="flex items-center gap-2 font-bold text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{family.fatherEmail}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{family.fatherPhone}</span>
              </div>
              <Button
                onClick={() => setSelectedFamily(family)}
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
              <p className="text-xl font-black uppercase mb-2">No Families Found</p>
              <p className="font-bold text-gray-600">
                Try adjusting your search query
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredFamilies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredFamilies.length}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[6, 9, 12, 18]}
        />
      )}

      {/* Family Details Modal */}
      {selectedFamily && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-purple-100 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-purple-400 border-b-4 border-black sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-black uppercase">
                  Family Details
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFamily(null)}
                  className="border-2 border-white bg-white hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Family Info */}
              <div className="flex flex-col items-center text-center pb-6 border-b-4 border-black">
                <div className="w-24 h-24 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-4">
                  <Users className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black uppercase mb-2">
                  {selectedFamily.name}
                </h2>
                <p className="text-sm font-bold uppercase px-4 py-2 bg-black text-white inline-block">
                  {selectedFamily.memberCount} Members
                </p>
              </div>

              {/* Father Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">
                  Father Information
                </h3>
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                  <User className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-600">Name</p>
                    <p className="font-bold">{selectedFamily.fatherName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-600">Email</p>
                    <p className="font-bold">{selectedFamily.fatherEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-600">Phone</p>
                    <p className="font-bold">{selectedFamily.fatherPhone}</p>
                  </div>
                </div>
              </div>

              {/* Family Status */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">
                  Family Status
                </h3>
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                  <UserCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-600">Status</p>
                    <p className="font-bold capitalize">{selectedFamily.status}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                  <Users className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-600">Created Date</p>
                    <p className="font-bold">
                      {new Date(selectedFamily.createdDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
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
