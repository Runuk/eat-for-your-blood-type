import React, { useState } from 'react';
import { Box, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { herbDatabase } from '../services/herbDatabase';
import { useAuth } from '../context/AuthContext';
import { CompatibilityBadge } from '../components/shared/CompatibilityBadge';

export const HerbDictionaryPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHerbs = herbDatabase.filter(herb =>
    herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    herb.healingProperties.some(prop => prop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Herb Dictionary</Typography>
      <TextField
        fullWidth
        label="Search Herbs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={2}>
        {filteredHerbs.map((herb) => (
          <Grid item xs={12} key={herb.id}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{herb.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>{herb.shortDescription}</Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Blood Type Compatibility
                  </Typography>
                  <CompatibilityBadge 
                    compatibility={herb.bloodTypeCompatibility[user?.bloodType || 'A+']} 
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Healing Properties
                  </Typography>
                  {herb.healingProperties.map((property, index) => (
                    <Chip 
                      key={index} 
                      label={property} 
                      sx={{ mr: 1, mb: 1 }} 
                    />
                  ))}
                </Box>

                {herb.dosageInfo && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Recommended Dosage
                    </Typography>
                    <Typography>{herb.dosageInfo}</Typography>
                  </Box>
                )}

                <Typography variant="subtitle1" gutterBottom>
                  Detailed Information
                </Typography>
                <Typography>{herb.detailedDescription}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 