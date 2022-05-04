import React, { useState, useEffect } from 'react';
import { Button, CardContent, TextField } from '@mui/material';

export function AdminController() {
  const [inputAddress, setInputAddress] = useState('');

  return (
    <div>
      <div>
        <CardContent
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            display: 'flex',
            width: '350px',
            margin: '0.5rem',
          }}
        >
          <div
            style={{
              width: '270px',
            }}
          >
            <TextField
              id="outlined-address-input"
              label="User Address"
              onChange={(e) => setInputAddress(e.target.value)}
              sx={{
                width: '250px',
                margin: '0.5rem',
              }}
            />
            <TextField
              id="outlined-address-input"
              label="NFT ID"
              onChange={(e) => setInputAddress(e.target.value)}
              sx={{
                width: '250px',
                margin: '0.5rem',
              }}
            />
          </div>
          <Button
            size="medium"
            variant="contained"
            onClick={() => console.log(inputAddress)}
            sx={{
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            }}
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
            margin: '0.5rem',
          }}
        >
          <div
            style={{
              width: '270px',
            }}
          >
            <TextField
              id="outlined-address-input"
              label="Contract Address (Market)"
              onChange={(e) => setInputAddress(e.target.value)}
              sx={{
                width: '250px',
                margin: '0.5rem',
              }}
            />
            <TextField
              id="outlined-address-input"
              label="NFT ID"
              onChange={(e) => setInputAddress(e.target.value)}
              sx={{
                width: '250px',
                margin: '0.5rem',
              }}
            />
          </div>
          <Button
            size="medium"
            variant="contained"
            onClick={() => console.log(inputAddress)}
            sx={{
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            Approve
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
