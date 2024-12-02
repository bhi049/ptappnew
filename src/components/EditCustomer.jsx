import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function EditCustomer({ open, onClose, onSave, customer }) {
  const [updatedCustomer, setUpdatedCustomer] = useState(customer);

  useEffect(() => {
    setUpdatedCustomer(customer);
  }, [customer]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedCustomer({ ...updatedCustomer, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedCustomer);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Muokkaa asiakasta</DialogTitle>
      <DialogContent>
        <TextField label="Etunimi" name="firstname" value={updatedCustomer?.firstname || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Sukunimi" name="lastname" value={updatedCustomer?.lastname || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Osoite" name="streetaddress" value={updatedCustomer?.streetaddress || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Postinumero" name="postcode" value={updatedCustomer?.postcode || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Kaupunki" name="city" value={updatedCustomer?.city || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Sähköposti" name="email" value={updatedCustomer?.email || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Puhelin" name="phone" value={updatedCustomer?.phone || ''} onChange={handleInputChange} fullWidth margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Peruuta</Button>
        <Button onClick={handleSave} color="primary">Tallenna</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCustomer;
