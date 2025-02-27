import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import { Compatibility } from '../../types';

interface CompatibilityBadgeProps {
  compatibility: Compatibility;
}

export const CompatibilityBadge: React.FC<CompatibilityBadgeProps> = ({ compatibility }) => {
  const getColor = () => {
    switch (compatibility) {
      case Compatibility.Beneficial:
        return 'success';
      case Compatibility.Neutral:
        return 'info';
      case Compatibility.Avoid:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Tooltip title={`This food is ${compatibility} for your blood type`}>
      <Chip
        label={compatibility}
        color={getColor()}
        size="small"
      />
    </Tooltip>
  );
}; 