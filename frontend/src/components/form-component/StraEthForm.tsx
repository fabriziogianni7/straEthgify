import { useContext, useState } from 'react';
import './css/StraEthForm.css';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@material-ui/core';
import { leverageFactorMarks, timeframeMarks } from './constants'
import { GeneralContext } from '../../context';
import {
  CREDIT_MANAGER_ADDRESS_USDC,
  USDC_ADDRESS,
  WETH_ADDRESS,
  UNI_V2_USDC_ADAPTER,
  YEARN_VAULT,
  WBTC_ADDRESS,
  ASSET_NAMES
} from '../../config'

function StraEthForm() {

  const context = useContext(GeneralContext)
  const [asset, setAsset] = useState('0xE36bC5d8b689AD6d80e78c3e736670e80d4b329D')

  const handleSetTimeframe = (v: any) => {
    const tframe = timeframeMarks.filter((item: any) => item.value === v)[0].timeFrame
    context.setTimeFrameBacktest(tframe)
  }
  const handleSetLeverageFactor = (v: any) => {
    const lev = leverageFactorMarks.filter((item: any) => item.value === v)[0].leverage
    // console.log('lev', lev)
    context.setLeverageFactor(lev)
  }

  const handleSetWindowSize = (v: any) => {
    context.setWindowSize(v)
  }

  return (
    <div className="form-group">
      {/* <Stack spacing={4}> */}
      <Typography variant="h5" style={{ textAlign: "left" }} color='primary'>Select Strategy Parameters</Typography>
      <div className='form-component'>

        {/* asset */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-asset-label">Select Risky Asset to Test the Strategy</InputLabel>
          <Select
            labelId="select-asset-label"
            id="select-asset"
            value={asset}
            label="Age"
            onChange={(e: any) => {
              setAsset(e.target.value)
              context.setAssetBacktest(ASSET_NAMES[e.target.value])
            }}
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
          label="Amount To Invest in USDC"
          variant="outlined"
          type='number'
          defaultValue={10}
          onChange={(e) => {
            const val = Number(e.target.value)
            context.setAssetAmount(val)
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
          onChange={(e: any) => context.setDateBacktest(e.target.value)}
        />
      </div>

      {/* timeframe: dropdown of , 1h, 6h, 12h, 1d*/}
      {/* <FormControl fullWidth className='form-component'> */}
      {/* <InputLabel id="demo-simple-select-asset-label">Timeframe</InputLabel> */}
      {/* </Stack>
      <Stack > */}
      <div className='form-component'>

        <Typography id="input-slider" >
          Rebalance Interval
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
          Moving Average Size
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
            context.timeFrameBacktest,
            context.windowSize,
            context.assetAmount * 1000000,
            USDC_ADDRESS,
            asset,
            UNI_V2_USDC_ADAPTER,
            YEARN_VAULT,
            context.leverageFactor)}
        >Deploy Strategy
        </Button>
      </ButtonGroup>


    </div>
  );
}

export default StraEthForm;
