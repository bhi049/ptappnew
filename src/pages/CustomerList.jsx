import React, { useState, useEffect } from 'react';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../services/api';
import AddCustomer from '../components/AddCustomer';
import EditCustomer from '../components/EditCustomer';
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

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data._embedded.customers);
  };

  const handleAddCustomer = async (customer) => {
    await addCustomer(customer);
    fetchCustomers();
  };

  const handleEditCustomer = async (customer) => {
    await updateCustomer(customer);
    fetchCustomers();
  };

  const handleDeleteCustomer = async (customer) => {
    if (window.confirm('Haluatko varmasti poistaa tämän asiakkaan?')) {
      await deleteCustomer(customer);
      fetchCustomers();
    }
  };

  const handleExportCSV = () => {
    const headers = ['Etunimi', 'Sukunimi', 'Osoite', 'Postinumero', 'Kaupunki', 'Sähköposti', 'Puhelin'];
    const rows = customers.map((customer) => [
      customer.firstname,
      customer.lastname,
      customer.streetaddress,
      customer.postcode,
      customer.city,
      customer.email,
      customer.phone,
    ]);

    const csvContent = [
      headers.join(','), // Otsikot
      ...rows.map((row) => row.join(',')), // Rivien tiedot
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'customers.csv');
    link.click();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Asiakkaat</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenAdd(true)}>Lisää uusi asiakas</Button>
      <Button variant="contained" color="secondary" onClick={handleExportCSV} style={{ marginLeft: '1rem' }}>
        Vie CSV
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Etunimi</TableCell>
              <TableCell>Sukunimi</TableCell>
              <TableCell>Osoite</TableCell>
              <TableCell>Toiminnot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.firstname}</TableCell>
                <TableCell>{customer.lastname}</TableCell>
                <TableCell>{customer.streetaddress}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => { setSelectedCustomer(customer); setOpenEdit(true); }}>Muokkaa</Button>
                  <Button color="secondary" onClick={() => handleDeleteCustomer(customer)}>Poista</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddCustomer open={openAdd} onClose={() => setOpenAdd(false)} onSave={handleAddCustomer} />
      <EditCustomer open={openEdit} onClose={() => setOpenEdit(false)} onSave={handleEditCustomer} customer={selectedCustomer} />
    </div>
  );
}

export default CustomerList;