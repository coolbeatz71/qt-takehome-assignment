import React from 'react';

/**
 * Table column header props
 * @property {string} label - Column label
 * @property {string} align - Text alignment
 */
interface TableHeaderCellProps {
  label: string;
  align?: 'left' | 'right';
}

/**
 * Table header cell component
 * @param {TableHeaderCellProps} props - Component props
 * @returns {JSX.Element} Table header cell
 */
const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ label, align = 'left' }) => {
  return (
    <th className={`text-${align} py-2 px-3 text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider`}>
      {label}
    </th>
  );
};

/**
 * User table head component with column headers
 * @returns {JSX.Element} Table head component
 */
export const UserTableHead: React.FC = () => {
  return (
    <thead>
      <tr className="border-b border-gray-200 dark:border-gray-700">
        <TableHeaderCell label="User" />
        <TableHeaderCell label="Role" />
        <TableHeaderCell label="Status" />
        <TableHeaderCell label="Created" />
        <TableHeaderCell label="Actions" align="right" />
      </tr>
    </thead>
  );
};
