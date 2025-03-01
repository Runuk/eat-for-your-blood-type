import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Box,
  Chip,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CompatibilityBadge } from '../components/shared/CompatibilityBadge';
import { useAuth } from '../context/AuthContext';
import { Food } from '../types';
import { getAllFoods, searchFoods } from '../services/foodDatabase';

// Mock herbs data - in a real app, this would come from an API
const herbs: Food[] = [
  {
    id: 'h1',
    name: 'Echinacea',
    category: 'Immune Support',
    bloodTypeCompatibility: {
      A: 'beneficial',
      B: 'beneficial',
      AB: 'beneficial',
      O: 'neutral'
    },
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    description: 'Supports immune system function. Particularly beneficial for blood types A, B, and AB.'
  },
  {
    id: 'h2',
    name: 'Ginger',
    category: 'Digestive Health',
    bloodTypeCompatibility: {
      A: 'beneficial',
      B: 'beneficial',
      AB: 'beneficial',
      O: 'beneficial'
    },
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    description: 'Anti-inflammatory and digestive aid. Beneficial for all blood types.'
  },
  {
    id: 'h3',
    name: 'Valerian Root',
    category: 'Sleep Aid',
    bloodTypeCompatibility: {
      A: 'beneficial',
      B: 'neutral',
      AB: 'neutral',
      O: 'avoid'
    },
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    description: 'Natural sleep aid. Best for blood type A, neutral for B and AB, should be avoided by type O.'
  },
  {
    id: 'h4',
    name: 'Milk Thistle',
    category: 'Liver Support',
    bloodTypeCompatibility: {
      A: 'neutral',
      B: 'beneficial',
      AB: 'beneficial',
      O: 'neutral'
    },
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    description: 'Supports liver function and detoxification. Particularly beneficial for blood types B and AB.'
  },
  {
    id: 'h5',
    name: 'Turmeric',
    category: 'Anti-inflammatory',
    bloodTypeCompatibility: {
      A: 'beneficial',
      B: 'beneficial',
      AB: 'beneficial',
      O: 'beneficial'
    },
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    description: 'Powerful anti-inflammatory and antioxidant. Beneficial for all blood types.'
  }
];

interface HerbDetails {
  healingProperties: string;
  recommendedDosage: string;
}

const herbDetails: Record<string, HerbDetails> = {
  'h1': {
    healingProperties: 'Immune system stimulation, anti-viral, anti-bacterial',
    recommendedDosage: '300-500mg capsules 3 times daily or 2-3ml of tincture 3 times daily'
  },
  'h2': {
    healingProperties: 'Anti-inflammatory, digestive aid, nausea relief, circulation improvement',
    recommendedDosage: '250-500mg dried powder 3 times daily or 1-2g fresh ginger in tea'
  },
  'h3': {
    healingProperties: 'Sleep aid, anxiety reduction, muscle relaxant',
    recommendedDosage: '300-600mg extract 1 hour before bedtime'
  },
  'h4': {
    healingProperties: 'Liver protection, detoxification support, antioxidant',
    recommendedDosage: '140-800mg standardized extract daily'
  },
  'h5': {
    healingProperties: 'Anti-inflammatory, antioxidant, joint pain relief, cognitive support',
    recommendedDosage: '500-2000mg daily with black pepper for better absorption'
  }
};

const HerbDictionaryPage: React.FC = () => {
  const [filteredHerbs, setFilteredHerbs] = useState<Food[]>(herbs);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (searchTerm) {
      setFilteredHerbs(
        herbs.filter(herb => 
          herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          herb.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          herb.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredHerbs(herbs);
    }
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Herb Dictionary
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search Herbs"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 2 }}>
        {filteredHerbs.map((herb) => (
          <Accordion key={herb.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6">{herb.name}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Chip label={herb.category} size="small" />
                </Grid>
                <Grid item xs={6} sm={4}>
                  {user && (
                    <CompatibilityBadge 
                      compatibility={herb.bloodTypeCompatibility[user.bloodType]} 
                    />
                  )}
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    {herb.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Healing Properties
                    </Typography>
                    <Typography variant="body2">
                      {herbDetails[herb.id]?.healingProperties}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Recommended Dosage
                    </Typography>
                    <Typography variant="body2">
                      {herbDetails[herb.id]?.recommendedDosage}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};

export default HerbDictionaryPage; 