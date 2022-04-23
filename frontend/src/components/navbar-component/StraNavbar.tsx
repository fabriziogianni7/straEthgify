import React, { useContext, useEffect } from "react";
import './css/StraNavbar.css'
import { Button, Link, Typography } from '@material-ui/core'
import { GeneralContext } from '../../context';

function StraNavbar() {
  const { account, connectMetamask } = useContext(GeneralContext);


  // useEffect(() => console.log('account connected', account), [account])
  return (

    <div className='navbar'>
      <Link className='MuiButton-root' style={{textDecoration:'none'}} href='/'>VeryFried Strategy</Link>
      <Link className='MuiButton-root' style={{textDecoration:'none'}} href='/balances'>Balances</Link>
      <Button
        id='connect-wallet-button'
        size='medium'
        onClick={async () => await connectMetamask()}
      >{account ? account : 'Connect Wallet'}
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
