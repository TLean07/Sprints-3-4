import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(date: string | Date): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export function formatScore(homeScore: number, awayScore: number): string {
  return `${homeScore} - ${awayScore}`;
}

export function getMatchStatus(status: string): { label: string; color: string } {
  const statusMap = {
    scheduled: { label: 'Agendado', color: 'gray' },
    delayed: { label: 'Adiado', color: 'warning' },
    postponed: { label: 'Adiado', color: 'warning' },
    cancelled: { label: 'Cancelado', color: 'error' },
    live: { label: 'Ao Vivo', color: 'live' },
    halftime: { label: 'Intervalo', color: 'info' },
    finished: { label: 'Finalizado', color: 'success' },
    awarded: { label: 'W.O.', color: 'info' },
  };
  
  return statusMap[status as keyof typeof statusMap] || { label: status, color: 'gray' };
}

export function getWinProbabilityColor(probability: number): string {
  if (probability >= 70) return 'text-success-600';
  if (probability >= 45) return 'text-warning-600'; 
  return 'text-error-600';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}