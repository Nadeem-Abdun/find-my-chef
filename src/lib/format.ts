import { formatDistanceToNow } from 'date-fns';

export function formatSalary(min: number, max: number) {
  const fmt = (n: number) => {
    if (n >= 100000) return `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
    return `${n}`;
  };
  return `₹${fmt(min)}–₹${fmt(max)} / mo`;
}

export function formatHourlyRate(rate: number) {
  return `₹${rate.toLocaleString('en-IN')}/hr`;
}

export function timeAgo(iso: string) {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return '';
  }
}

export function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}
