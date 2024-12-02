import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Personal Trainer
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/customers">
            Asiakkaat
          </Button>
          <Button color="inherit" component={Link} to="/trainings">
            Harjoitukset
          </Button>
          <Button color="inherit" component={Link} to="/calendar">
            Kalenteri
          </Button>
          <Button color="inherit" component={Link} to="/statistics">
            Tilastot
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
