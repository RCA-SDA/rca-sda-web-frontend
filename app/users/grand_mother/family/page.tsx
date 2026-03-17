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
  Loader2
} from 'lucide-react';
import { Pagination } from '@/components/Pagination';
import { useFamilies, useFamily } from '@/lib/hooks/useFamily';
import { Family, FamilyMember } from '@/lib/services/family.service';

export default function AllFamiliesPage() {
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Fetch families using React Query
  const { data: families = [], isLoading, error } = useFamilies();

  // Debug log to see what we're getting from API
  console.log('👪 Families data:', families);
  console.log('👪 Families count:', families.length);

  // Fetch selected family details
  const { data: familyDetails, isLoading: isLoadingDetails } = useFamily(
    selectedFamily?.id || 0
  );

  // Filter families based on search query
  const filteredFamilies = families.filter(family =>
    family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    family.members.some(member =>
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
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

  // Get family father (first male member or first member)
  const getFamilyFather = (family: Family) => {
    const maleMember = family.members.find(member => member.gender === 'MALE');
    return maleMember || family.members[0];
  };

  // Handle family details view
  const handleViewDetails = (family: Family) => {
    setSelectedFamily(family);
  };

  // Handle close details
  const handleCloseDetails = () => {
    setSelectedFamily(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg font-bold">Loading families...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <Card className="bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-8 text-center">
            <p className="text-lg font-black">Failed to load families</p>
            <p className="text-sm text-gray-600 mt-2">Please try again later</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            All Families
          </h1>
          <p className="text-lg font-bold text-gray-600">
            {isLoading ? 'Loading...' : `${families.length} Families Registered`}
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
          paginatedFamilies.map((family) => {
            const father = getFamilyFather(family);
            return (
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
                  {family.members.length} Members
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white border-2 border-black">
                <p className="text-xs font-bold uppercase text-gray-600 mb-1">Father</p>
                <p className="font-black">{father ? `${father.firstName} ${father.lastName}` : 'Not assigned'}</p>
              </div>
              <div className="flex items-center gap-2 font-bold text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{father?.email || 'No email'}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>No phone</span>
              </div>
              <Button
                onClick={() => handleViewDetails(family)}
                className="w-full mt-3 h-10 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        );
        })
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="inline-block p-6 bg-gray-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p className="text-xl font-black uppercase mb-2">
                {searchQuery ? 'No Families Found' : 'No Families Registered'}
              </p>
              <p className="font-bold text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search query' : 'Start by creating your first family'}
              </p>
              {!searchQuery && (
                <p className="text-sm text-gray-500">
                  Create families using the "Create Family" page to get started
                </p>
              )}
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
                  {selectedFamily.members.length} Members
                </p>
              </div>

              {/* Father Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">
                  Father Information
                </h3>
                {(() => {
                  const father = getFamilyFather(selectedFamily);
                  return father ? (
                    <>
                      <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                        <User className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold uppercase text-gray-600">Name</p>
                          <p className="font-bold">{father.firstName} {father.lastName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                        <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold uppercase text-gray-600">Email</p>
                          <p className="font-bold">{father.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                        <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold uppercase text-gray-600">Phone</p>
                          <p className="font-bold">No phone</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 bg-yellow-200 border-2 border-black">
                      <p className="font-bold text-center">No father assigned to this family</p>
                    </div>
                  );
                })()}
              </div>

              {/* Family Members */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">
                  Family Members ({selectedFamily.members.length})
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedFamily.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-3 bg-white border-2 border-black">
                      <div className="w-10 h-10 bg-gray-200 border-2 border-black flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{member.firstName} {member.lastName}</p>
                        <p className="text-xs text-gray-600">{member.email}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-200 border border-black font-bold">
                            {member.gender}
                          </span>
                          <span className="text-xs px-2 py-1 bg-green-200 border border-black font-bold">
                            {member.status}
                          </span>
                          <span className="text-xs px-2 py-1 bg-purple-200 border border-black font-bold">
                            {member.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {selectedFamily.members.length === 0 && (
                    <div className="p-3 bg-yellow-200 border-2 border-black text-center">
                      <p className="font-bold">No members in this family</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Family Reports */}
              {selectedFamily.reports && selectedFamily.reports.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">
                    Family Reports ({selectedFamily.reports.length})
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedFamily.reports.map((report) => (
                      <div key={report.id} className="p-3 bg-white border-2 border-black">
                        <p className="font-bold">{report.user.firstName} {report.user.lastName}</p>
                        <p className="text-xs text-gray-600 mb-2">
                          {report.attendance?.sabbathDate ? new Date(report.attendance.sabbathDate).toLocaleDateString() : 'No date'}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={`p-1 border ${report.attendedStartingSabbathCeremony ? 'bg-green-200' : 'bg-red-200'} border-black`}>
                            Sabbath: {report.attendedStartingSabbathCeremony ? '✓' : '✗'}
                          </div>
                          <div className={`p-1 border ${report.sevenDayBibleStudy ? 'bg-green-200' : 'bg-red-200'} border-black`}>
                            Bible Study: {report.sevenDayBibleStudy ? '✓' : '✗'}
                          </div>
                          <div className={`p-1 border ${report.vistedPeople ? 'bg-green-200' : 'bg-red-200'} border-black`}>
                            Visited: {report.vistedPeople ? '✓' : '✗'}
                          </div>
                          <div className={`p-1 border ${report.wasVisited ? 'bg-green-200' : 'bg-red-200'} border-black`}>
                            Was Visited: {report.wasVisited ? '✓' : '✗'}
                          </div>
                          <div className={`p-1 border ${report.helped ? 'bg-green-200' : 'bg-red-200'} border-black`}>
                            Helped: {report.helped ? '✓' : '✗'}
                          </div>
                          <div className={`p-1 border ${report.wasHelped ? 'bg-green-200' : 'bg-red-200'} border-black`}>
                            Was Helped: {report.wasHelped ? '✓' : '✗'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Family Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">
                  Family Information
                </h3>
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                  <Users className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-600">Created Date</p>
                    <p className="font-bold">
                      {selectedFamily.members.length > 0 && selectedFamily.members[0].createdAt ?
                        new Date(selectedFamily.members[0].createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Unknown'
                      }
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
