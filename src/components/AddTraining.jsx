import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function AddTraining({ open, onClose, onSave, customers }) {
  const [training, setTraining] = useState({
    date: null, // Alkuarvoksi null
    duration: '',
    activity: '',
    customer: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTraining({ ...training, [name]: value });
  };

  const handleDateChange = (date) => {
    // Muutetaan päivämäärä `Dayjs`-instanssiksi tai nulliksi
    setTraining({ ...training, date: date ? dayjs(date).toISOString() : null });
  };

  const handleSave = () => {
    if (training.date && training.customer) {
      onSave(training);
      setTraining({
        date: null,
        duration: '',
        activity: '',
        customer: '',
      });
      onClose();
    } else {
      alert('Päivämäärä ja asiakas ovat pakollisia!');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Lisää uusi harjoitus</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Päivämäärä ja kellonaika"
            value={training.date ? dayjs(training.date) : null} // Muutetaan Dayjs-instanssiksi
            onChange={(date) => handleDateChange(date)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <TextField
          label="Kesto (min)"
          name="duration"
          value={training.duration}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Aktiviteetti"
          name="activity"
          value={training.activity}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Select
          name="customer"
          value={training.customer}
          onChange={(e) => handleInputChange({ target: { name: 'customer', value: e.target.value } })}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>Valitse asiakas</MenuItem>
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer._links.self.href}>
              {customer.firstname} {customer.lastname}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Peruuta</Button>
        <Button onClick={handleSave} color="primary">Tallenna</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTraining;
