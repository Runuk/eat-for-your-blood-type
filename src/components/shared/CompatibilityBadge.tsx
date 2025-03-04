import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import { CompatibilityStatus } from '../../types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';

interface CompatibilityBadgeProps {
  compatibility: CompatibilityStatus;
}

export const CompatibilityBadge: React.FC<CompatibilityBadgeProps> = ({ compatibility }) => {
  const getColor = (status: CompatibilityStatus) => {
    switch (status) {
      case 'beneficial':
        return 'success';
      case 'avoid':
        return 'error';
      default:
        return 'default';
    }
  };

  const getIcon = (status: CompatibilityStatus) => {
    switch (status) {
      case 'beneficial':
        return <CheckCircleIcon />;
      case 'avoid':
        return <CancelIcon />;
      default:
        return <WarningIcon />;
    }
  };

  const getTooltipText = (status: CompatibilityStatus) => {
    switch (status) {
      case 'beneficial':
        return 'Beneficial for your blood type';
      case 'avoid':
        return 'Avoid for your blood type';
      default:
        return 'Neutral for your blood type';
    }
  };

  return (
    <Tooltip title={getTooltipText(compatibility)}>
      <Chip
        icon={getIcon(compatibility)}
        label={compatibility.charAt(0).toUpperCase() + compatibility.slice(1)}
        color={getColor(compatibility)}
        size="small"
      />
    </Tooltip>
  );
}; 