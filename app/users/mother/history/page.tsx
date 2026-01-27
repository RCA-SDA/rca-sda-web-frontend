'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Filter,
  CheckCircle2,
  XCircle,
  User,
  Users,
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';
import { Pagination } from '@/components/Pagination';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface HistoricalReport {
  id: string;
  date: Date;
  memberName: string;
  memberId: string;
  isPresent: boolean;
  hasReason?: boolean;
  hasNoReason?: boolean;
  isSick?: boolean;
  attendedSabbath: boolean;
  attendedStartingSabbath: boolean;
  studiedBible: boolean;
  visitedPeople: boolean;
  wasVisited: boolean;
  helpedPeople: boolean;
  wasHelped: boolean;
}

interface GroupedReport {
  date: Date;
  reports: HistoricalReport[];
  stats: {
    totalMembers: number;
    present: number;
    absent: number;
    attendedSabbath: number;
    attendedStartingSabbath: number;
    studiedBible: number;
    visitedPeople: number;
    helpedPeople: number;
  };
}

export default function HistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedMember, setSelectedMember] = useState('all');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Mock data - replace with API call
  const mockReports: HistoricalReport[] = [
    {
      id: '1',
      date: new Date('2026-01-25'),
      memberName: 'John Smith',
      memberId: '1',
      isPresent: true,
      attendedSabbath: true,
      attendedStartingSabbath: true,
      studiedBible: true,
      visitedPeople: true,
      wasVisited: false,
      helpedPeople: true,
      wasHelped: false,
    },
    {
      id: '2',
      date: new Date('2026-01-25'),
      memberName: 'Sarah Smith',
      memberId: '2',
      isPresent: true,
      attendedSabbath: true,
      attendedStartingSabbath: false,
      studiedBible: true,
      visitedPeople: false,
      wasVisited: true,
      helpedPeople: false,
      wasHelped: true,
    },
    {
      id: '3',
      date: new Date('2026-01-25'),
      memberName: 'David Smith',
      memberId: '3',
      isPresent: false,
      hasReason: true,
      isSick: true,
      attendedSabbath: false,
      attendedStartingSabbath: false,
      studiedBible: true,
      visitedPeople: false,
      wasVisited: false,
      helpedPeople: false,
      wasHelped: false,
    },
    {
      id: '4',
      date: new Date('2026-01-25'),
      memberName: 'Emma Smith',
      memberId: '4',
      isPresent: true,
      attendedSabbath: true,
      attendedStartingSabbath: true,
      studiedBible: false,
      visitedPeople: false,
      wasVisited: false,
      helpedPeople: true,
      wasHelped: false,
    },
    {
      id: '5',
      date: new Date('2026-01-18'),
      memberName: 'John Smith',
      memberId: '1',
      isPresent: true,
      attendedSabbath: true,
      attendedStartingSabbath: true,
      studiedBible: true,
      visitedPeople: false,
      wasVisited: true,
      helpedPeople: false,
      wasHelped: true,
    },
    {
      id: '6',
      date: new Date('2026-01-18'),
      memberName: 'Sarah Smith',
      memberId: '2',
      isPresent: true,
      attendedSabbath: true,
      attendedStartingSabbath: true,
      studiedBible: true,
      visitedPeople: true,
      wasVisited: false,
      helpedPeople: true,
      wasHelped: false,
    },
    {
      id: '7',
      date: new Date('2026-01-18'),
      memberName: 'David Smith',
      memberId: '3',
      isPresent: true,
      attendedSabbath: true,
      attendedStartingSabbath: false,
      studiedBible: false,
      visitedPeople: false,
      wasVisited: false,
      helpedPeople: false,
      wasHelped: false,
    },
    {
      id: '8',
      date: new Date('2026-01-18'),
      memberName: 'Emma Smith',
      memberId: '4',
      isPresent: false,
      hasNoReason: true,
      attendedSabbath: false,
      attendedStartingSabbath: false,
      studiedBible: true,
      visitedPeople: false,
      wasVisited: false,
      helpedPeople: false,
      wasHelped: false,
    },
    {
      id: '9',
      date: new Date('2026-01-11'),
      memberName: 'John Smith',
      memberId: '1',
      isPresent: true,
      attendedSabbath: true,
      attendedStartingSabbath: true,
      studiedBible: true,
      visitedPeople: true,
      wasVisited: true,
      helpedPeople: true,
      wasHelped: true,
    },
    {
      id: '10',
      date: new Date('2026-01-11'),
      memberName: 'Sarah Smith',
      memberId: '2',
      isPresent: true,
      attendedSabbath: true,
      attendedStartingSabbath: true,
      studiedBible: true,
      visitedPeople: false,
      wasVisited: true,
      helpedPeople: true,
      wasHelped: false,
    },
  ];

  const familyMembers = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Smith' },
    { id: '3', name: 'David Smith' },
    { id: '4', name: 'Emma Smith' },
  ];

  // Filter reports
  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.memberName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMember = selectedMember === 'all' || report.memberId === selectedMember;
    const matchesDateRange = (!startDate || report.date >= startDate) &&
                             (!endDate || report.date <= endDate);
    return matchesSearch && matchesMember && matchesDateRange;
  });

  // Group reports by date
  const groupedReports = useMemo(() => {
    const groups = new Map<string, HistoricalReport[]>();
    
    filteredReports.forEach(report => {
      const dateKey = format(report.date, 'yyyy-MM-dd');
      if (!groups.has(dateKey)) {
        groups.set(dateKey, []);
      }
      groups.get(dateKey)!.push(report);
    });

    const result: GroupedReport[] = Array.from(groups.entries()).map(([dateKey, reports]) => {
      const date = new Date(dateKey);
      return {
        date,
        reports,
        stats: {
          totalMembers: reports.length,
          present: reports.filter(r => r.isPresent).length,
          absent: reports.filter(r => !r.isPresent).length,
          attendedSabbath: reports.filter(r => r.attendedSabbath).length,
          attendedStartingSabbath: reports.filter(r => r.attendedStartingSabbath).length,
          studiedBible: reports.filter(r => r.studiedBible).length,
          visitedPeople: reports.filter(r => r.visitedPeople).length,
          helpedPeople: reports.filter(r => r.helpedPeople).length,
        },
      };
    });

    // Sort by date descending (most recent first)
    return result.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [filteredReports]);

  // Pagination
  const totalPages = Math.ceil(groupedReports.length / itemsPerPage);
  const paginatedGroups = groupedReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate overall statistics
  const stats = {
    totalSabbaths: groupedReports.length,
    totalReports: filteredReports.length,
    presentCount: filteredReports.filter(r => r.isPresent).length,
    absentCount: filteredReports.filter(r => !r.isPresent).length,
    attendanceRate: filteredReports.length > 0 
      ? Math.round((filteredReports.filter(r => r.isPresent).length / filteredReports.length) * 100)
      : 0,
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Sabbath Report History
          </h1>
          <p className="text-lg font-bold text-gray-600">
            View past Sabbath attendance and activities
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-yellow-200">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <Label htmlFor="search" className="font-bold mb-2 block">
                  Search Member
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Member Filter */}
              <div>
                <Label htmlFor="member" className="font-bold mb-2 block">
                  Family Member
                </Label>
                <Select value={selectedMember} onValueChange={setSelectedMember}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    {familyMembers.map(member => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date */}
              <div>
                <Label htmlFor="startDate" className="font-bold mb-2 block">
                  Start Date
                </Label>
                <Button
                  variant="outline"
                  onClick={() => setShowStartDatePicker(true)}
                  className="w-full justify-start text-left font-bold"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {startDate ? format(startDate, 'MMM dd, yyyy') : 'Pick a date'}
                </Button>
              </div>

              {/* End Date */}
              <div>
                <Label htmlFor="endDate" className="font-bold mb-2 block">
                  End Date
                </Label>
                <Button
                  variant="outline"
                  onClick={() => setShowEndDatePicker(true)}
                  className="w-full justify-start text-left font-bold"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {endDate ? format(endDate, 'MMM dd, yyyy') : 'Pick a date'}
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedMember('all');
                  setStartDate(undefined);
                  setEndDate(undefined);
                }}
              >
                Clear Filters
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Start Date Picker Dialog */}
        <Dialog open={showStartDatePicker} onOpenChange={setShowStartDatePicker}>
          <DialogContent className="max-w-fit p-6">
            <DialogHeader>
              <DialogTitle>Select Start Date</DialogTitle>
            </DialogHeader>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                setStartDate(date);
                setShowStartDatePicker(false);
              }}
              className="w-fit mx-auto"
            />
          </DialogContent>
        </Dialog>

        {/* End Date Picker Dialog */}
        <Dialog open={showEndDatePicker} onOpenChange={setShowEndDatePicker}>
          <DialogContent className="max-w-fit p-6">
            <DialogHeader>
              <DialogTitle>Select End Date</DialogTitle>
            </DialogHeader>
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => {
                setEndDate(date);
                setShowEndDatePicker(false);
              }}
              className="w-fit mx-auto"
            />
          </DialogContent>
        </Dialog>

        {/* Grouped Reports by Sabbath */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Sabbath Reports by Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paginatedGroups.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl font-bold text-gray-500">
                  No reports found matching your filters
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {paginatedGroups.map((group) => (
                  <SabbathGroupCard key={format(group.date, 'yyyy-MM-dd')} group={group} />
                ))}
              </div>
            )}

            {groupedReports.length > 0 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={groupedReports.length}
                  onItemsPerPageChange={setItemsPerPage}
                  itemsPerPageOptions={[5, 10, 20]}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SabbathGroupCard({ group }: { group: GroupedReport }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const attendanceRate = Math.round((group.stats.present / group.stats.totalMembers) * 100);

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardContent className="pt-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CalendarIcon className="w-6 h-6" />
              <h3 className="text-2xl font-black">
                {format(group.date, 'EEEE, MMMM dd, yyyy')}
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-bold text-gray-600">
                {group.stats.totalMembers} Family Members
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Expand
              </>
            )}
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="p-3 bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase">Attendance</p>
                <p className="text-2xl font-black">{attendanceRate}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">{group.stats.present} Present</p>
                <p className="text-sm font-bold text-red-600">{group.stats.absent} Absent</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-bold text-gray-600 uppercase mb-1">Sabbath</p>
            <p className="text-2xl font-black">{group.stats.attendedSabbath}/{group.stats.totalMembers}</p>
          </div>

          <div className="p-3 bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-bold text-gray-600 uppercase mb-1">Bible Study</p>
            <p className="text-2xl font-black">{group.stats.studiedBible}/{group.stats.totalMembers}</p>
          </div>

          <div className="p-3 bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-bold text-gray-600 uppercase mb-1">Service</p>
            <p className="text-2xl font-black">{group.stats.helpedPeople}/{group.stats.totalMembers}</p>
          </div>
        </div>

        {/* Activity Summary Bar */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-pink-200 border-2 border-black font-bold text-sm">
            Starting Sabbath: {group.stats.attendedStartingSabbath}
          </span>
          <span className="px-3 py-1 bg-green-200 border-2 border-black font-bold text-sm">
            Visited: {group.stats.visitedPeople}
          </span>
        </div>

        {/* Expanded Member Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t-4 border-black">
            <h4 className="font-black uppercase mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Member Details
            </h4>
            <div className="space-y-3">
              {group.reports.map((report) => (
                <MemberReportRow key={report.id} report={report} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MemberReportRow({ report }: { report: HistoricalReport }) {
  return (
    <div className={`p-4 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
      report.isPresent ? 'bg-green-100' : 'bg-red-100'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5" />
            <h5 className="text-lg font-black">{report.memberName}</h5>
            {report.isPresent ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {report.isPresent ? (
              <span className="px-2 py-1 bg-green-400 border-2 border-black font-black text-xs uppercase">
                Present
              </span>
            ) : (
              <>
                <span className="px-2 py-1 bg-red-400 border-2 border-black font-black text-xs uppercase">
                  Absent
                </span>
                {report.isSick && (
                  <span className="px-2 py-1 bg-orange-400 border-2 border-black font-black text-xs uppercase">
                    Sick
                  </span>
                )}
                {report.hasReason && (
                  <span className="px-2 py-1 bg-yellow-400 border-2 border-black font-black text-xs uppercase">
                    With Reason
                  </span>
                )}
                {report.hasNoReason && (
                  <span className="px-2 py-1 bg-red-300 border-2 border-black font-black text-xs uppercase">
                    No Reason
                  </span>
                )}
              </>
            )}
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <ActivityBadge label="Sabbath" value={report.attendedSabbath} />
            <ActivityBadge label="Starting Sabbath" value={report.attendedStartingSabbath} />
            <ActivityBadge label="Bible Study" value={report.studiedBible} />
            <ActivityBadge label="Visited" value={report.visitedPeople} />
            <ActivityBadge label="Was Visited" value={report.wasVisited} />
            <ActivityBadge label="Helped" value={report.helpedPeople} />
            <ActivityBadge label="Was Helped" value={report.wasHelped} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityBadge({ label, value }: { label: string; value: boolean }) {
  return (
    <div className={`flex items-center gap-1 px-2 py-1 border-2 border-black font-bold ${
      value ? 'bg-white' : 'bg-gray-200 opacity-50'
    }`}>
      {value ? (
        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
      )}
      <span className="text-xs truncate">{label}</span>
    </div>
  );
}
