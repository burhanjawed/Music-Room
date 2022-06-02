import React, { useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Alert,
  Collapse,
} from '@mui/material';
import { Link } from 'react-router-dom';

const CreateRoomPage = (props) => {
  const title = props.update ? 'Update Room' : 'Create a Room';

  const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleGuestCanPauseChange = (e) => {
    const { value } = e.target;

    value == 'true' ? setGuestCanPause(true) : setGuestCanPause(false);
  };

  const handleRoomButtonPress = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => props.history.push('/room/' + data.code));
  };

  const handleUpdateButtonPress = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: props.roomCode,
      }),
    };

    fetch('/api/update-room', requestOptions).then((response) => {
      if (response.ok) {
        setSuccessMsg('Room updated successfully!');
      } else {
        setErrorMsg('Error updating room');
      }
    });
  };

  const renderCreateButton = () => {
    return (
      <>
        <Grid item xs={12} align='center'>
          <Button
            color='primary'
            variant='contained'
            onClick={handleRoomButtonPress}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align='center'>
          <Link to='/'>
            <Button color='secondary' variant='contained'>
              Back
            </Button>
          </Link>
        </Grid>
      </>
    );
  };

  const renderUpdateButton = () => {
    return (
      <Grid item xs={12} align='center'>
        <Button
          color='primary'
          variant='contained'
          onClick={handleUpdateButtonPress}
        >
          Update
        </Button>
      </Grid>
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align='center'>
        <Collapse in={errorMsg !== '' || successMsg !== ''}>
          {successMsg !== '' ? (
            <Alert
              severity='success'
              onClose={() => {
                setSuccessMsg('');
              }}
            >
              {successMsg}
            </Alert>
          ) : (
            errorMsg !== '' && (
              <Alert
                severity='error'
                onClose={() => {
                  setErrorMsg('');
                }}
              >
                {errorMsg}
              </Alert>
            )
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align='center'>
        <Typography component='h4' variant='h4'>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <FormControl component='fieldset'>
          <FormHelperText>
            <div align='center'>Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value='true'
              control={<Radio color='primary' />}
              label='Play/Pause'
              labelPlacement='bottom'
            />
            <FormControlLabel
              value='false'
              control={<Radio color='secondary' />}
              label='No Control'
              labelPlacement='bottom'
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align='center'>
        <FormControl>
          <TextField
            required={true}
            type='number'
            defaultValue={votesToSkip}
            inputProps={{ min: 1, style: { textAlign: 'center' } }}
            onChange={(e) => setVotesToSkip(e.target.value)}
          />
          <FormHelperText>
            <div align='center'>Votes Required to Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {props.update ? renderUpdateButton() : renderCreateButton()}
    </Grid>
  );
};

CreateRoomPage.defaultProps = {
  votesToSkip: 2,
  guestCanPause: true,
  update: false,
  roomCode: null,
};

export default CreateRoomPage;
