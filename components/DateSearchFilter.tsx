'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface DateSearchFilterProps {
  dateFilter: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
}

export function DateSearchFilter({
  dateFilter,
  onDateChange,
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
}: DateSearchFilterProps) {
  return (
    <>
      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-start text-left font-bold">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateFilter ? (
              format(dateFilter, 'PPP')
            ) : (
              <span className="font-black uppercase tracking-tight border-2 border-black bg-yellow-300 px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                Pick a date
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateFilter}
            onSelect={onDateChange}
          />
          {dateFilter && (
            <div className="p-3 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onDateChange(undefined)}
              >
                Clear Date
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Search Bar */}
      <div className="flex-1 min-w-[250px] max-w-md">
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
    </>
  );
}
