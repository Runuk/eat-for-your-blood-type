import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Fab,
  Divider,
  Switch,
  FormControlLabel,
  Button
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import { logger } from '../../services/debugLogger';

interface PerformanceMetrics {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
  };
  loadTime: number;
}

export const DebugPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0
  });
  const [slowAnimations, setSlowAnimations] = useState(false);

  useEffect(() => {
    // Collect performance metrics
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    
    // @ts-ignore - some browsers might not support memory
    const memory = window.performance?.memory;
    
    setMetrics({
      memory: memory ? {
        usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576),
        totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576)
      } : undefined,
      loadTime
    });
  }, []);

  // Toggle slow animations for testing
  useEffect(() => {
    document.body.style.setProperty('--transition-multiplier', slowAnimations ? '5' : '1');
  }, [slowAnimations]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpen(true)}
      >
        <BugReportIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Debug Panel
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Environment"
                secondary={process.env.NODE_ENV}
              />
            </ListItem>
            
            <ListItem>
              <ListItemText
                primary="Page Load Time"
                secondary={`${metrics.loadTime}ms`}
              />
            </ListItem>

            {metrics.memory && (
              <ListItem>
                <ListItemText
                  primary="Memory Usage"
                  secondary={`${metrics.memory.usedJSHeapSize}MB / ${metrics.memory.totalJSHeapSize}MB`}
                />
              </ListItem>
            )}

            <Divider sx={{ my: 1 }} />

            <ListItem>
              <FormControlLabel
                control={
                  <Switch
                    checked={slowAnimations}
                    onChange={(e) => setSlowAnimations(e.target.checked)}
                  />
                }
                label="Slow Animations (5x)"
              />
            </ListItem>

            <ListItem>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  logger.error('Test Error', new Error('This is a test error'));
                }}
              >
                Test Error Logging
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}; 