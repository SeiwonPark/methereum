import React, { useEffect, useState } from 'react';
import { Button, CardContent, TextField } from '@mui/material';

export function AdminPage() {
  const [inputAddress, setInputAddress] = useState('');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: '50%',
      }}
    >
      <div>
        <CardContent
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            display: 'flex',
            width: '350px',
          }}
        >
          <TextField
            id="outlined-address-input"
            label="Address"
            onChange={(e) => setInputAddress(e.target.value)}
            sx={{
              width: '250px',
              marginRight: '0.5rem',
            }}
          />
          <Button
            size="large"
            variant="contained"
            onClick={() => console.log(inputAddress)}
          >
            MINT
          </Button>
        </CardContent>
      </div>
      <div>
        <CardContent
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            display: 'flex',
            width: '350px',
          }}
        >
          <TextField
            id="outlined-address-input"
            label="Address"
            onChange={(e) => setInputAddress(e.target.value)}
            sx={{
              width: '250px',
              marginRight: '0.5rem',
            }}
          />
          <Button
            size="large"
            variant="contained"
            onClick={() => console.log(inputAddress)}
          >
            Authorize
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
