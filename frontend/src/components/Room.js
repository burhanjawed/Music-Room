import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';

const Room = (props) => {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({});

  let roomCode = props.match.params.roomCode;

  useEffect(() => {
    let interval = setInterval(getCurrentSong, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('/api/get-room' + '?code=' + roomCode)
      .then((response) => {
        if (!response.ok) {
          props.leaveRoomCallback();
          props.history.push('/');
        }
        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);

        if (isHost) {
          authenticateSpotify();
        }
      });
  }, []);

  const authenticateSpotify = () => {
    try {
      fetch('/spotify/is-authenticated')
        .then((response) => response.json())
        .then((data) => {
          setSpotifyAuthenticated(data.status);

          if (!data.status) {
            fetch('/spotify/get-auth-url')
              .then((response) => response.json())
              .then((data) => {
                window.location.replace(data.url);
              });
          }
        });
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  const getCurrentSong = () => {
    fetch('/spotify/current-song')
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
        console.log(data);
      });
  };

  useEffect(() => {
    getCurrentSong();
  }, []);

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/api/leave-room', requestOptions).then((response) => {
      props.leaveRoomCallback();
      props.history.push('/');
    });
  };

  const updateShowSettings = (value) => {
    setShowSettings(value);
  };

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <CreateRoomPage
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
          />
        </Grid>
        <Grid item xs={12} align='center'>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align='center'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  return (
    <>
      {showSettings ? (
        renderSettings()
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} align='center'>
            <Typography variant='h4' component='h4'>
              Code: {roomCode}
            </Typography>
          </Grid>
          <Grid item xs={12} align='center'>
            <MusicPlayer {...song} />
          </Grid>
          {isHost && renderSettingsButton()}
          <Grid item xs={12} align='center'>
            <Button
              color='secondary'
              variant='contained'
              onClick={leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Room;
