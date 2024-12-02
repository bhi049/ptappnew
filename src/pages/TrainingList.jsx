import React, { useState, useEffect } from 'react';
import { getTrainings, getCustomers, addTraining, deleteTraining } from '../services/api';
import AddTraining from '../components/AddTraining';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  Button,
} from '@mui/material';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    fetchTrainings();
    fetchCustomers();
  }, []);

  const fetchTrainings = async () => {
    const data = await getTrainings();
    console.log('Trainings fetched:', data); // Debug-tulostus
    setTrainings(data._embedded.trainings);
  };

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data._embedded.customers);
  };

  const handleAddTraining = async (training) => {
    await addTraining(training);
    fetchTrainings();
  };

  const handleDeleteTraining = async (training) => {
    if (window.confirm('Haluatko varmasti poistaa tämän harjoituksen?')) {
      await deleteTraining(training);
      fetchTrainings();
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Harjoitukset</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenAdd(true)}>Lisää uusi harjoitus</Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Päivämäärä</TableCell>
              <TableCell>Kesto (min)</TableCell>
              <TableCell>Aktiviteetti</TableCell>
              <TableCell>Toiminnot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainings.map((training) => (
              <TableRow key={training.id}>
                <TableCell>{new Date(training.date).toLocaleString()}</TableCell>
                <TableCell>{training.duration}</TableCell>
                <TableCell>{training.activity}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleDeleteTraining(training)}>Poista</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddTraining open={openAdd} onClose={() => setOpenAdd(false)} onSave={handleAddTraining} customers={customers} />
    </div>
  );
}

export default TrainingList;
