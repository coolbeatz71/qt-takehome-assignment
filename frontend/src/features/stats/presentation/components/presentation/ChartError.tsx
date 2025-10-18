import React from 'react';
import { Card, Button } from '../../../../../shared/presentation/components';

/**
 * Chart error component props
 * @property {string} error - Error message
 * @property {Function} onRetry - Retry callback
 */
interface ChartErrorProps {
  error: string;
  onRetry?: () => void;
}

/**
 * Chart error state component
 * @param {ChartErrorProps} props - Component props
 * @returns {JSX.Element} Chart error component
 */
export const ChartError: React.FC<ChartErrorProps> = ({ error, onRetry }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Users Created (Last 7 Days)</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <div className="text-danger-600 dark:text-danger-400 mb-2">Failed to load chart data</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm mb-4">{error}</div>
            {onRetry && (
              <Button onClick={onRetry} size="sm">
                Try Again
              </Button>
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};
