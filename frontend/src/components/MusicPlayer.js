import React from 'react';
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const MusicPlayer = (props) => {
  const songProgress = (props.time / props.duration) * 100;

  const skipSong = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('/spotify/skip', requestOptions);
  };

  const pauseSong = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('/spotify/pause', requestOptions);
  };

  const playSong = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('/spotify/play', requestOptions);
  };

  return (
    <div className='wrapper'>
      <Card>
        <Grid container alignItems='center'>
          <Grid item align='center' xs={4}>
            <img
              src={props.image_url}
              alt='album cover'
              height='100%'
              width='100%'
            />
          </Grid>
          <Grid item align='center' xs={8}>
            <Typography component='h5' variant='h5'>
              {props.title}
            </Typography>
            <Typography color='textSecondary' variant='subtitle1'>
              {props.artist}
            </Typography>
            <div>
              <IconButton onClick={props.is_playing ? pauseSong() : playSong()}>
                {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={skipSong}>
                <Typography color='textSecondary' variant='subtitle1'>
                  {props.votes} / {props.votes_required}
                </Typography>
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant='determinate' value={songProgress} />
      </Card>
    </div>
  );
};

export default MusicPlayer;
