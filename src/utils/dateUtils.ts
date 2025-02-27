import { format, startOfWeek } from 'date-fns';

export const getCurrentWeekId = (): string => {
  return format(new Date(), 'yyyy-MM-ww');
};

export const getDaysOfWeek = (): string[] => {
  const start = startOfWeek(new Date());
  return Array.from({ length: 7 }, (_, i) => 
    format(new Date(start.getTime() + i * 24 * 60 * 60 * 1000), 'EEEE')
  );
}; 