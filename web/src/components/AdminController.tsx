import React, { useEffect, useState } from 'react';
import {
  Alert, Button, CardContent, TextField,
} from '@mui/material';
import { nftContract, marketContract } from '../utils/ContractProvider';

export function AdminController() {
  /** FIXME: too many states...? */
  const [userAddress, setUserAddress] = useState<string>('');
  const [marketAddress, setMarketAddress] = useState<string>('');
  const [mintNftId, setMintNftId] = useState<number>(0);
  const [approveNftId, setApproveNftId] = useState<number>(0);
  const [mintErrorMessage, setMintErrorMessage] = useState<string>('');
  const [approveErrorMessage, setApproveErrorMessage] = useState<string>('');
  const [approved, setApproved] = useState<boolean>(false);
  const [startId, setStartId] = useState<number>(0);

  const mintToken = async () => {
    try {
      await nftContract.mint(userAddress, mintNftId);
    } catch (err: any) {
      setMintErrorMessage(JSON.parse(JSON.stringify(err)).error.message);
      setTimeout(() => {
        setMintErrorMessage('');
      }, 3000);
    }
  };

  const approveContract = async () => {
    try {
      await nftContract.approveContract(marketAddress, approveNftId)
        .then((result: boolean) => {
          if (result) {
            setApproved(true);
          }
        });
    } catch (err: any) {
      setApproveErrorMessage(JSON.parse(JSON.stringify(err)).error.message);
      setApproved(false);
      setTimeout(() => {
        setApproveErrorMessage('');
      }, 3000);
    }
  };

  const start = async () => {
    try {
      await marketContract[startId].start();
    } catch (err: any) {
      setApproveErrorMessage(JSON.parse(JSON.stringify(err)).error.message);
      setApproved(false);
      setTimeout(() => {
        setApproveErrorMessage('');
      }, 3000);
    }
  };

  const end = async () => {
    try {
      await marketContract[startId].end();
    } catch (err: any) {
      setApproveErrorMessage(JSON.parse(JSON.stringify(err)).error.message);
      setApproved(false);
      setTimeout(() => {
        setApproveErrorMessage('');
      }, 3000);
    }
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
            width: '360px',
            margin: '0.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <div
                style={{
                  width: '100%',
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
            </div>
            {mintErrorMessage !== '' && (<Alert severity="error">{mintErrorMessage}</Alert>)}
          </div>
        </CardContent>
      </div>
      <div>
        <CardContent
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            display: 'flex',
            width: '360px',
            margin: '0.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <div
                style={{
                  width: '100%',
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
                onClick={approveContract}
                sx={{
                  marginTop: '0.5rem',
                  marginBottom: '0.5rem',
                  width: '100%',
                }}
              >
                Approve
              </Button>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TextField
                id="outlined-address-input"
                label="NFT ID"
                onChange={(e) => setStartId(Number(e.target.value))}
                sx={{
                  width: '250px',
                  margin: '0.5rem',
                }}
              />
              <Button
                size="medium"
                variant="contained"
                onClick={start}
                sx={{
                  marginTop: '0.5rem',
                  marginBottom: '0.5rem',
                  width: '100%',
                }}
              >
                Start
              </Button>
            </div>
            <Button
              size="medium"
              variant="contained"
              onClick={end}
              sx={{
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                width: '100%',
              }}
            >
              End
            </Button>
            {approveErrorMessage !== '' && (<Alert severity="error">{approveErrorMessage}</Alert>)}
          </div>
        </CardContent>
      </div>
    </div>
  );
}
