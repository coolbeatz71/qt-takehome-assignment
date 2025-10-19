import React from 'react';
import { SkeletonLoader } from '../../../../../../shared/presentation/components';

/**
 * Skeleton table row component for desktop view
 * @returns {JSX.Element} Skeleton table row
 */
export const SkeletonTableRow: React.FC = () => (
  <tr className="border-b border-gray-100 dark:border-gray-800">
    <td className="py-3 px-3">
      <div className="flex items-center gap-3">
        <SkeletonLoader className="h-8 w-8 rounded-full" />
        <SkeletonLoader className="h-4 w-32" />
      </div>
    </td>
    <td className="py-3 px-3">
      <SkeletonLoader className="h-5 w-16 rounded-full" />
    </td>
    <td className="py-3 px-3">
      <SkeletonLoader className="h-5 w-16 rounded-full" />
    </td>
    <td className="py-3 px-3">
      <SkeletonLoader className="h-4 w-24" />
    </td>
    <td className="py-3 px-3">
      <div className="flex justify-end gap-1">
        <SkeletonLoader className="h-9 w-9 rounded" />
        <SkeletonLoader className="h-9 w-9 rounded" />
      </div>
    </td>
  </tr>
);
