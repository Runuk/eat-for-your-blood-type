import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { WeightEntry } from '../../types';
import { Box, Typography } from '@mui/material';

interface WeightChartProps {
  data: WeightEntry[];
}

export const WeightChart: React.FC<WeightChartProps> = ({ data }) => {
  // Format data for the chart
  const chartData = data.map(entry => ({
    date: new Date(entry.date).toLocaleDateString(),
    weight: entry.weight,
    timestamp: new Date(entry.date).getTime()
  })).sort((a, b) => a.timestamp - b.timestamp);

  // Calculate min and max for Y axis
  const weights = chartData.map(item => item.weight);
  const minWeight = Math.floor(Math.min(...weights) - 1);
  const maxWeight = Math.ceil(Math.max(...weights) + 1);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="body2">{`Date: ${label}`}</Typography>
          <Typography variant="body2" color="primary">{`Weight: ${payload[0].value} kg`}</Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          domain={[minWeight, maxWeight]} 
          tick={{ fontSize: 12 }}
          label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="weight" 
          stroke="#1976d2" 
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}; 