import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DateUtils } from '../../../../../shared/utils/date.utils';

/**
 * Chart data point interface
 * @property {string} date - Formatted date
 * @property {number} count - Count value
 * @property {string} fullDate - Full date string
 */
export interface ChartDataPoint {
  date: string;
  count: number;
  fullDate: string;
}

/**
 * Stats bar chart component props
 * @property {ChartDataPoint[]} data - Chart data
 */
interface StatsBarChartProps {
  data: ChartDataPoint[];
}

/**
 * Stats bar chart component
 * @param {StatsBarChartProps} props - Component props
 * @returns {JSX.Element} Stats bar chart component
 */
export const StatsBarChart: React.FC<StatsBarChartProps> = ({ data }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            interval="preserveStartEnd"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            width={30}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '12px',
            }}
            formatter={(value: number) => [value, 'Users Created']}
            labelFormatter={(date: string) => {
              const item = data.find(d => d.date === date);
              return item ? DateUtils.formatTooltip(item.fullDate) : date;
            }}
          />
          <Bar
            dataKey="count"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
