import React, { useState } from 'react';
import './css/StraEthForm.css';
import { FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@material-ui/core';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Stack } from '@mui/material';

const marks = [
  {
    value: 1,
    label: '1m',
    timeFrame: 1 * 60
  },
  {
    value: 2,
    label: '5m',
    timeFrame: 5 * 60
  },
  {
    value: 3,
    label: '10m',
    timeFrame: 10 * 60
  },
  {
    value: 4,
    label: '30m',
    timeFrame: 30 * 60
  },
  {
    value: 5,
    label: '1hrs',
    timeFrame: 60 * 60
  },
  {
    value: 6,
    label: '5hrs',
    timeFrame: 60 * 60 * 5
  },
  {
    value: 7,
    label: '10hrs',
    timeFrame: 60 * 60 * 10
  },
  {
    value: 8,
    label: '1d',
    timeFrame: 60 * 60 * 24
  },
];



function StraEthForm() {

  const [asset, setAsset] = useState('')
  const [date, setDate] = useState('')
  const [timeFrame, setTimeframe] = useState(0)

  const handleSetTimeframe = (v: any) => {
    const tframe = marks.filter((item: any) => item.value === v)[0].timeFrame
    console.log('tframe', tframe)
    setTimeframe(tframe)
  }


  return (
    <div className="form-group">
      {/* <Stack spacing={4}> */}

      <div className='form-component'>

        {/* asset */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-asset-label">Select Asset</InputLabel>
          <Select
            labelId="select-asset-label"
            id="select-asset"
            value={asset}
            label="Age"
            onChange={(e: any) => setAsset(e.target.value)}
          >
            <MenuItem value={'ETH'}>ETH</MenuItem>
            <MenuItem value={'BTC'}>BTC</MenuItem>
          </Select>

        </FormControl>
      </div>
      <div className='form-component'>
        {/* starting amount */}
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          type='number'
        />
      </div>
      <div className='form-component'>
        {/* date picker */}
        <TextField
          id="date"
          label="Start date of backtest"
          type="date"
          defaultValue="2021-04-22"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e: any) => setDate(e.target.value)}
        />
      </div>

      {/* timeframe: dropdown of 1m, 5m, 10m, 30m, 1h, 5h, 10h, 1d*/}
      {/* <FormControl fullWidth className='form-component'> */}
      {/* <InputLabel id="demo-simple-select-asset-label">Timeframe</InputLabel> */}
      {/* </Stack>
      <Stack > */}
      <div className='form-component'>

        <Typography id="input-slider" >
          Volume
        </Typography>
        <Slider
          aria-label="Timeframe"
          defaultValue={1}
          // getAriaValueText={ valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1}
          max={8}
          onChange={(_, v) => handleSetTimeframe(v)}

        />
      </div>
      <div className='form-component'>

        <Typography id="input-slider" >
          Leverage Factor
        </Typography>
        <Slider
          aria-label="Timeframe"
          defaultValue={1}
          // getAriaValueText={ valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1}
          max={8}
          onChange={(_, v) => handleSetTimeframe(v)}

        />
      </div>

      {/* </Stack> */}
      {/* </FormControl> */}

    </div>
  );
}

export default StraEthForm;
