import React, { useEffect, useState } from 'react';
import { Button, CardContent, TextField } from '@mui/material';
import { ethers } from 'ethers';
import { ABIS } from '../contracts/abi';

export function AdminController() {
  const [userAddress, setUserAddress] = useState('');
  const [marketAddress, setMarketAddress] = useState('');
  const [mintNftId, setMintNftId] = useState(0);
  const [approveNftId, setApproveNftId] = useState(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const nftContract = new ethers.Contract(ABIS.NFT_TX_ADDRESS, ABIS.NFT, provider.getSigner());

  const mintToken = () => {
    nftContract.mint(userAddress, mintNftId);
    setUserAddress('');
    setMintNftId(0);
  };

  useEffect(() => {
    // ...
  }, [userAddress, mintNftId]);


  return (
    <div
      style={{
        marginTop: '8rem',
      }}
    >
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
              onChange={(e) => setUserAddress(e.target.value)}
              sx={{
                width: '250px',
                margin: '0.5rem',
              }}
            />
            <TextField
              id="outlined-address-input"
              label="NFT ID"
              onChange={(e) => setMintNftId(Number(e.target.value))}
              sx={{
                width: '250px',
                margin: '0.5rem',
              }}
            />
          </div>
          <Button
            size="medium"
            variant="contained"
            onClick={mintToken}
            sx={{
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              width: '100%',
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
              onChange={(e) => setMarketAddress(e.target.value)}
              sx={{
                width: '250px',
                margin: '0.5rem',
              }}
            />
            <TextField
              id="outlined-address-input"
              label="NFT ID"
              onChange={(e) => setApproveNftId(Number(e.target.value))}
              sx={{
                width: '250px',
                margin: '0.5rem',
              }}
            />
          </div>
          <Button
            size="medium"
            variant="contained"
            onClick={() => console.log(userAddress)}
            sx={{
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              width: '100%',
            }}
          >
            Approve
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
