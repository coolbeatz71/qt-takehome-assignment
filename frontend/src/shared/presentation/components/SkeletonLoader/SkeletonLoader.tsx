import React from 'react';

/**
 * SkeletonLoader component props
 * @property {string} className - Additional CSS classes
 */
interface SkeletonLoaderProps {
  className?: string;
}

/**
 * Skeleton loader for loading states
 * @param {SkeletonLoaderProps} props - Component props
 * @returns {JSX.Element} Skeleton loader component
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = '' }) => {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} />
  );
};