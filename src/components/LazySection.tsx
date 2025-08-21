'use client';

import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function LazySection({
  children,
  fallback,
  className = '',
  threshold = 0.1,
  rootMargin = '200px'
}: LazySectionProps) {
  const { ref, isInView } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  const defaultFallback = (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Skeleton className="h-8 w-1/3 mx-auto mb-8" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {isInView ? children : (fallback || defaultFallback)}
    </div>
  );
}