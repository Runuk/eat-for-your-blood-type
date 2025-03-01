import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export type CompatibilityStatus = 'beneficial' | 'neutral' | 'avoid';

interface CompatibilityBadgeProps {
  compatibility: CompatibilityStatus;
}

const getColor = (compatibility: CompatibilityStatus): string => {
  switch (compatibility) {
    case 'beneficial':
      return 'success';
    case 'neutral':
      return 'info';
    case 'avoid':
      return 'error';
    default:
      return 'default';
  }
};

const getIcon = (compatibility: CompatibilityStatus) => {
  switch (compatibility) {
    case 'beneficial':
      return <CheckCircleIcon />;
    case 'neutral':
      return <RemoveCircleIcon />;
    case 'avoid':
      return <CancelIcon />;
    default:
      return null;
  }
};

const getTooltipText = (compatibility: CompatibilityStatus): string => {
  switch (compatibility) {
    case 'beneficial':
      return 'Beneficial for your blood type';
    case 'neutral':
      return 'Neutral for your blood type';
    case 'avoid':
      return 'Avoid for your blood type';
    default:
      return '';
  }
};

export const CompatibilityBadge: React.FC<CompatibilityBadgeProps> = ({ compatibility }) => {
  return (
    <Tooltip title={getTooltipText(compatibility)}>
      <Chip
        label={compatibility.charAt(0).toUpperCase() + compatibility.slice(1)}
        color={getColor(compatibility) as any}
        icon={getIcon(compatibility)}
        variant="outlined"
      />
    </Tooltip>
  );
}; 