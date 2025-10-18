import React from 'react';
import { Card } from '../../../../../shared/presentation/components';

/**
 * Chart loading state component
 * @returns {JSX.Element} Chart loading component
 */
export const ChartLoading: React.FC = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Users Created (Last 7 Days)</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="h-80 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">Loading chart...</div>
        </div>
      </Card.Content>
    </Card>
  );
};
