import './css/StraNavbar.css'
import { Avatar, Link } from '@material-ui/core'

import { AvatarGroup } from "@mui/material";

function StraFooter() {
  return (

    <div className='footer'>
       <Link className='MuiButton-root' style={{textDecoration:'none'}} href='/'>VeryFried Strategy</Link>
      <AvatarGroup max={4}>
       <Link href='https://github.com/ialberquilla' target='_blank'> <Avatar  className='team' style={{ backgroundColor:'transparent', width: '24px', height: '24px'}} alt="Ivan"  >I</Avatar></Link>
       <Link href='https://github.com/obasilakis' target='_blank'><Avatar alt="Vasilis" style={{ backgroundColor:'transparent', width: '24px', height: '24px'}}  >V</Avatar></Link>
       <Link href='https://github.com/fabriziogianni7' target='_blank'><Avatar alt="Fabri" style={{ backgroundColor:'transparent', width: '24px', height: '24px' }}  >F</Avatar></Link>
      </AvatarGroup>
    </div>

  );
}
export default StraFooter;
