import React, { useContext, useState } from 'react';
import './css/StraEthForm.css';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@material-ui/core';
import { leverageFactorMarks, timeframeMarks } from './constants'
import { GeneralContext } from '../../context';
import {
  CREDIT_MANAGER_ADDRESS_USDC,
  TIME_FRAME,
  WINDOW_SIZE,
  USDC_AMOUNT,
  USDC_ADDRESS,
  WETH_ADDRESS,
  UNI_V2_USDC_ADAPTER,
  YEARN_VAULT,
  LEVERAGE_FACTOR,
  WBTC_ADDRESS
} from '../../config'




function StraEthForm() {

  const context = useContext(GeneralContext)
  const [asset, setAsset] = useState('')
  const [date, setDate] = useState('')
  const [timeFrame, setTimeframe] = useState(0)
  const [leverageFactor, setleverageFactor] = useState(0)
  const [windowSize, setWindowSize] = useState(0)
  const [assetAmount, setAssetAmount] = useState('')

  const handleSetTimeframe = (v: any) => {
    const tframe = timeframeMarks.filter((item: any) => item.value === v)[0].timeFrame
    setTimeframe(tframe)
  }
  const handleSetLeverageFactor = (v: any) => {
    const lev = leverageFactorMarks.filter((item: any) => item.value === v)[0].leverage
    // console.log('lev', lev)
    setleverageFactor(lev)
  }

  const handleSetWindowSize = (v: any) => {
    setWindowSize(v)
  }

  return (
    <div className="form-group">
      {/* <Stack spacing={4}> */}
      <Typography variant="h5" style={{ textAlign: "left" }} color='primary'>Select Strategy Parameters</Typography>
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
            <MenuItem value={WETH_ADDRESS}>WETH</MenuItem>
            <MenuItem value={WBTC_ADDRESS}>WBTC</MenuItem>
          </Select>

        </FormControl>
      </div>
      <div className='form-component'>
        {/* starting amount */}
        <TextField
          fullWidth
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          type='number'
          onChange={(e) => {
            const val = (Number(e.target.value)*1000000).toString()
            setAssetAmount(val)
          }}
        />
      </div>
      <div className='form-component'>
        {/* date picker */}
        <TextField
          fullWidth
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

      {/* timeframe: dropdown of , 1h, 6h, 12h, 1d*/}
      {/* <FormControl fullWidth className='form-component'> */}
      {/* <InputLabel id="demo-simple-select-asset-label">Timeframe</InputLabel> */}
      {/* </Stack>
      <Stack > */}
      <div className='form-component'>

        <Typography id="input-slider" >
          Timeframe
        </Typography>
        <Slider
          aria-label="timeframe"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={1}
          marks={timeframeMarks}
          min={1}
          max={4}
          onChange={(_, v) => handleSetTimeframe(v)}

        />
      </div>
      {/* leverage factor */}
      <div className='form-component'>
        <Typography id="input-slider" >
          Leverage Factor
        </Typography>
        <Slider
          aria-label="leverage-factor"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={1}
          marks={leverageFactorMarks}
          min={1}
          max={4}
          onChange={(_, v) => handleSetLeverageFactor(v)}
        />
      </div>

      {/* window size */}
      <div className='form-component'>
        <Typography id="input-slider" >
          Window Size
        </Typography>
        <Slider
          aria-label="window-size"
          onChange={(_, v) => handleSetWindowSize(v)}
        />
      </div>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        <Button
          id='test-strategy-button'
          size="medium"
          onClick={() => alert('TODO: test strategy')}
        >Test Strategy
        </Button>
        <Button
          id='deploy-strategy-button'
          size="medium"
          color='primary'
          onClick={async () => await context.createStrategy(CREDIT_MANAGER_ADDRESS_USDC,
            timeFrame,
            windowSize,
            assetAmount,
            USDC_ADDRESS,
            asset,
            UNI_V2_USDC_ADAPTER,
            YEARN_VAULT,
            leverageFactor)}
        >Deploy Strategy
        </Button>
      </ButtonGroup>


    </div>
  );
}

export default StraEthForm;
