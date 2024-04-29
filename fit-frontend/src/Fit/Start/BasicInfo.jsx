import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { Container, FilledInput, FormGroup, Grid, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import InputLabel from '@mui/material/InputLabel';
const steps = ['Goals', 'Basic Info', 'Routine'];

export const BasicInfo = ({feet, handleChangeFeet, inches, handleChangeInches, weight, handleChangeWeight}) => {

  return(
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>Step 2: We need some basic info</Typography>
      <Container fixed sx={{ margin: 0 }} >
        <Box sx={{ height: '300px' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Height</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  size='2'
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                  }}
                  value={feet}
                  // label="Feet"
                  onChange={handleChangeFeet}
                >
                  <MenuItem value={1}>1 ft</MenuItem>
                  <MenuItem value={2}>2 ft</MenuItem>
                  <MenuItem value={3}>3 ft</MenuItem>
                  <MenuItem value={4}>4 ft</MenuItem>
                  <MenuItem value={5}>5 ft</MenuItem>
                  <MenuItem value={6}>6 ft</MenuItem>
                  <MenuItem value={7}>7 ft</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Height</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  size='2'
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                  }}
                  value={inches}
                  // label="Height"
                  onChange={handleChangeInches}
                >
                  <MenuItem value={0}>0 in</MenuItem>
                  <MenuItem value={1}>1 in</MenuItem>
                  <MenuItem value={2}>2 in</MenuItem>
                  <MenuItem value={3}>3 in</MenuItem>
                  <MenuItem value={4}>4 in</MenuItem>
                  <MenuItem value={5}>5 in</MenuItem>
                  <MenuItem value={6}>6 in</MenuItem>
                  <MenuItem value={7}>7 in</MenuItem>
                  <MenuItem value={8}>8 in</MenuItem>
                  <MenuItem value={9}>9 in</MenuItem>
                  <MenuItem value={10}>10 in</MenuItem>
                  <MenuItem value={11}>11 in</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Weight"
                  // id="outlined-start-adornment"
                  id="demo-simple-select-label"
                  value={weight}
                  size='2'
                  sx={{ m: 1, width: '22.2ch' }}
                  onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
                  inputProps={{
                    endadornment: <InputAdornment position="start">lbs</InputAdornment>,
                    type: 'number',
                    min: 0,
                    max: 999,
                    length: 3
                  }}
                  onChange={handleChangeWeight}
                />
              </FormControl>
              <Typography sx={{ mt: 2, mb: 1 }} >Your BMI is:</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}