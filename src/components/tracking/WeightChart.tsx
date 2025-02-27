import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WeightEntry } from '../../types';

interface WeightChartProps {
  data: WeightEntry[];
}

export const WeightChart: React.FC<WeightChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(date) => new Date(date).toLocaleDateString()}
        />
        <YAxis />
        <Tooltip 
          labelFormatter={(date) => new Date(date).toLocaleDateString()}
          formatter={(value) => [`${value} kg`, 'Weight']}
        />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}; 