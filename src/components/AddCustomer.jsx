import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function AddCustomer({ open, onClose, onSave }) {
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSave = () => {
    onSave(customer);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Lisää uusi asiakas</DialogTitle>
      <DialogContent>
        <TextField label="Etunimi" name="firstname" onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Sukunimi" name="lastname" onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Osoite" name="streetaddress" onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Postinumero" name="postcode" onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Kaupunki" name="city" onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Sähköposti" name="email" onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Puhelin" name="phone" onChange={handleInputChange} fullWidth margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Peruuta</Button>
        <Button onClick={handleSave} color="primary">Tallenna</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCustomer;
