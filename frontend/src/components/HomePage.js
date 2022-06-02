import React, { useEffect, useState } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { Grid, Button, ButtonGroup, Typography } from '@mui/material';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

const HomePage = (props) => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
        });
    };

    fetchData().catch(console.error);
  }, []);

  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align='center'>
          <Typography variant='h3' component='h3'>
            Music Room
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <ButtonGroup disableElevation variant='contained' color='primary'>
            <Link to='/join'>
              <Button color='primary'>Join a Room</Button>
            </Link>
            <Link to='/create'>
              <Button color='secondary'>Create a Room</Button>
            </Link>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path='/'
          render={() => {
            return roomCode ? (
              <Redirect to={`/room/${roomCode}`} />
            ) : (
              renderHomePage()
            );
          }}
        />
        <Route path='/join' component={RoomJoinPage} />
        <Route path='/create' component={CreateRoomPage} />
        <Route
          path='/room/:roomCode'
          render={(props) => {
            return <Room {...props} leaveRoomCallback={clearRoomCode} />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default HomePage;
