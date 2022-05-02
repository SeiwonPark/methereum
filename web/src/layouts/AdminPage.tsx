import React, { useState } from 'react';
import { Button, CardContent, TextField } from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

export function AdminPage() {
  const { active, account, library } = useWeb3React<Web3Provider>();
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
      <CardContent
        sx={{
          backgroundColor: 'white',
          borderRadius: '10px',
          display: 'flex',
        }}
      >
        <TextField
          id="outlined-address-input"
          label="Address"
          onChange={(e) => setInputAddress(e.target.value)}
          sx={{
            width: '300px',
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
  );
}
