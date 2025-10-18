import React from 'react';
import { SkeletonLoader } from '../../../../../../shared/presentation/components';

/**
 * Skeleton mobile card component
 * @returns {JSX.Element} Skeleton mobile card
 */
export const SkeletonMobileCard: React.FC = () => (
  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
    <div className="flex items-center gap-3 mb-3">
      <SkeletonLoader className="h-8 w-8 rounded-full" />
      <div className="flex-1">
        <SkeletonLoader className="h-4 w-3/4 mb-2" />
        <div className="flex gap-2">
          <SkeletonLoader className="h-5 w-16 rounded-full" />
          <SkeletonLoader className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <SkeletonLoader className="h-3 w-32" />
      <div className="flex gap-1">
        <SkeletonLoader className="h-9 w-9 rounded" />
        <SkeletonLoader className="h-9 w-9 rounded" />
      </div>
    </div>
  </div>
);
