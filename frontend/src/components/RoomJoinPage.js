import React, { useState } from 'react';
import { Grid, Button, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const RoomJoinPage = (props) => {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');

  const roomButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch('/api/join-room', requestOptions)
      .then((response) => {
        if (response.ok) {
          props.history.push(`/room/${roomCode}`);
        } else {
          setError('Room Not Found');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align='center'>
        <Typography variant='h4' component='h4'>
          Join a Room
        </Typography>
        <Grid item xs={12} align='center'>
          <TextField
            error={error}
            label='Code'
            placeholder='Enter a Room Code'
            value={roomCode}
            helperText={error}
            variant='outlined'
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} align='center'>
          <Button
            variant='contained'
            color='primary'
            onClick={roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align='center'>
          <Link to='/'>
            <Button variant='contained' color='secondary'>
              Back
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;
