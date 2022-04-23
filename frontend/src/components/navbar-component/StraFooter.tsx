import React, { useContext, useEffect } from "react";
import './css/StraNavbar.css'
import { Avatar, Button, Link, Typography } from '@material-ui/core'

import { AvatarGroup } from "@mui/material";

function StraFooter() {
  return (

    <div className='footer'>
      <Typography variant='h5' className='brand-name' >VeriFried Strategy</Typography>
      <AvatarGroup max={4}>
       <Link href='https://github.com/ialberquilla' target='_blank'> <Avatar className='team' style={{ backgroundColor:'green' }} alt="Ivan"  >I</Avatar></Link>
       <Link href='https://github.com/obasilakis' target='_blank'><Avatar alt="Vasilis" style={{ backgroundColor:'blue' }}  >V</Avatar></Link>
       <Link href='https://github.com/fabriziogianni7' target='_blank'><Avatar alt="Fabri" style={{ backgroundColor:'purple' }}  >F</Avatar></Link>
      </AvatarGroup>

      {/* <Avatar alt="Ivan" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Ivan" src="/static/images/avatar/1.jpg" /> */}
      {/* <Typography variant='h5' className='team'>Ivan</Typography>
      <Typography variant='h5' className='team'>Vasilis</Typography>
      <Typography variant='h5' className='team'>Fabrizio</Typography> */}
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
export default StraFooter;
