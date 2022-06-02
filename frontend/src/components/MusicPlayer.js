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

  return (
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
            <IconButton>
              {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton>
              <SkipNextIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant='determinate' value={songProgress} />
    </Card>
  );
};

export default MusicPlayer;
