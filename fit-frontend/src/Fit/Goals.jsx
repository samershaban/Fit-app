import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Container, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';

export const Goals = ({goal, handleChangeGoal}) => {

  return(
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>Step 1: What are your goals?</Typography>
      <Container fixed sx={{ margin: 0 }} >
        <Box sx={{ height: '300px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Goal</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={goal}
                  onChange={handleChangeGoal}
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="loose" control={<Radio />} label="Loose Weight" />
                  <FormControlLabel value="maintain" control={<Radio />} label="Maintain Weight" />
                  <FormControlLabel value="gain" control={<Radio />} label="Gain Lean Weight" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}