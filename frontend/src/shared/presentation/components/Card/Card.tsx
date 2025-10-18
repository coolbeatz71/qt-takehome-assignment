import React from 'react';

/**
 * Card component props
 * @property {React.ReactNode} children - Card content
 * @property {string} className - Additional CSS classes
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card header component props
 * @property {React.ReactNode} children - Header content
 * @property {string} className - Additional CSS classes
 */
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card title component props
 * @property {React.ReactNode} children - Title content
 * @property {string} className - Additional CSS classes
 */
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card content component props
 * @property {React.ReactNode} children - Content
 * @property {string} className - Additional CSS classes
 */
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card header component
 * @param {CardHeaderProps} props - Component props
 * @returns {JSX.Element} Card header
 */
const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card title component
 * @param {CardTitleProps} props - Component props
 * @returns {JSX.Element} Card title
 */
const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h3>
  );
};

/**
 * Card content component
 * @param {CardContentProps} props - Component props
 * @returns {JSX.Element} Card content
 */
const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card container component
 * @param {CardProps} props - Component props
 * @returns {JSX.Element} Card component
 */
const CardRoot: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Compound card component type
 */
type CardComponent = React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Title: React.FC<CardTitleProps>;
  Content: React.FC<CardContentProps>;
};

/**
 * Card compound component with attached sub-components
 */
const Card = CardRoot as CardComponent;

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export { Card };
