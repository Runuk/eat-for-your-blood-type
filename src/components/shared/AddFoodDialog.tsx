import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  InputAdornment
} from '@mui/material';
import { Food } from '../../types';
import { foodDatabase } from '../../services/foodDatabase';
import { CompatibilityBadge } from './CompatibilityBadge';

interface AddFoodDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (food: Food, portion: number) => void;
}

export const AddFoodDialog: React.FC<AddFoodDialogProps> = ({
  open,
  onClose,
  onAdd
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [portion, setPortion] = useState('');

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedFood && portion) {
      onAdd(selectedFood, parseFloat(portion));
      setSearchTerm('');
      setSelectedFood(null);
      setPortion('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Food</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Search Foods"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List sx={{ maxHeight: 300, overflow: 'auto' }}>
          {filteredFoods.map((food) => (
            <ListItem
              button
              key={food.id}
              selected={selectedFood?.id === food.id}
              onClick={() => setSelectedFood(food)}
            >
              <ListItemText
                primary={food.name}
                secondary={`${food.portionInfo.defaultSize}${food.portionInfo.unit}`}
              />
              <CompatibilityBadge compatibility={food.bloodTypeCompatibility['A+']} />
            </ListItem>
          ))}
        </List>
        {selectedFood && (
          <TextField
            margin="dense"
            label="Portion"
            type="number"
            fullWidth
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {selectedFood.portionInfo.unit}
                </InputAdornment>
              ),
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} disabled={!selectedFood || !portion}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 