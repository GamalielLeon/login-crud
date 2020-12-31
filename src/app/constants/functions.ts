const MIN_YEAR: number = 70;
export function getLimitsBirthDate(): string[]{
  const dates: string[] = [];
  const today: Date = new Date();
  const currentYear: number = today.getFullYear();
  dates.push(`${currentYear - MIN_YEAR}-01-01`);
  dates.push(`${currentYear}-${today.getMonth() + 1}-${today.getDate()}`);
  return dates;
}
