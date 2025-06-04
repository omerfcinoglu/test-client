import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import api from '@/api';

interface AddMemberDialogProps {
  open: boolean;
  onClose: () => void;
  onMemberAdded: () => void;
}

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({ open, onClose, onMemberAdded }) => {
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/members', { name, role, image, description });
      onMemberAdded(); 
      onClose();
      setName('');
      setRole('');
      setImage('');
      setDescription('');
    } catch (error) {
      console.error('Yeni member eklenirken hata:', error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Takım Arkadaşı Ekle</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="İsim"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Rol"
            variant="outlined"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <TextField
            label="Resim URL"
            variant="outlined"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            label="Açıklama"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>İptal</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>Ekle</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberDialog;
