import React, { useContext, useEffect } from "react";
import './css/StraNavbar.css'
import {Button, Typography} from '@material-ui/core'
import { GeneralContext } from '../../context';

function StraNavbar() {
const ctx = useContext(GeneralContext);
useEffect(()=> console.log(ctx.accountConnected), [])
  return (

    <div className='navbar'>
     <Typography variant='h5' >VeryFried Strategy</Typography> 
     <Button
          id='connect-wallet-button'
          size='medium'
          onClick={async()=>await  ctx.connectMetamask()}
          >{ctx.accountConnected? ctx.accountConnected : 'Connect Wallet'}
        </Button>
    </div>
    

      // <AppBar color='secondary'>
      //   {/* <CssBaseline /> */}
      //   <Toolbar>
      //     {/* <Typography variant="h4" className={classes.logo}> */}
      //     <Typography variant="h4" >
      //       Navbar
      //     </Typography>
      //     <div >
      //       {/* <div className={classes.navlinks}> */}
      //       {/* <Link to="/" className={classes.link}> */}
      //       {/* <Link to="/" >
      //         Home
      //       </Link> */}
      //       {/* <Link to="/about" className={classes.link}>
      //         About
      //       </Link>
      //       <Link to="/contact" className={classes.link}>
      //         Contact
      //       </Link>
      //       <Link to="/faq" className={classes.link}>
      //         FAQ
      //       </Link> */}
      //     </div>
      //   </Toolbar>
      // </AppBar>
  );
}
export default StraNavbar;