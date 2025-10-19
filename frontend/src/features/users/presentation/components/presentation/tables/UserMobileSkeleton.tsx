import React from 'react';
import { SkeletonMobileCard } from './SkeletonMobileCard';

/**
 * User mobile list skeleton component for mobile view
 * @returns {JSX.Element} Mobile list skeleton
 */
export const UserMobileSkeleton: React.FC = () => {
  return (
    <div className="md:hidden space-y-3">
      {Array.from({ length: 5 }, (_, i) => (
        <SkeletonMobileCard key={i} />
      ))}
    </div>
  );
};
