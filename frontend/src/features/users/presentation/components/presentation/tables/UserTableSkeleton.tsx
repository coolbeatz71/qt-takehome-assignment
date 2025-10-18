import React from 'react';
import { SkeletonLoader } from '../../../../../../shared/presentation/components';
import { SkeletonTableRow } from './SkeletonTableRow';

/**
 * User table skeleton component for desktop view
 * @returns {JSX.Element} Desktop table skeleton
 */
export const UserTableSkeleton: React.FC = () => {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="py-3 px-3 text-left">
              <SkeletonLoader className="h-4 w-20" />
            </th>
            <th className="py-3 px-3 text-left">
              <SkeletonLoader className="h-4 w-16" />
            </th>
            <th className="py-3 px-3 text-left">
              <SkeletonLoader className="h-4 w-16" />
            </th>
            <th className="py-3 px-3 text-left">
              <SkeletonLoader className="h-4 w-24" />
            </th>
            <th className="py-3 px-3 text-left">
              <SkeletonLoader className="h-4 w-20" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
