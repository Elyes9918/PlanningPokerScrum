import { Divider, Link, Slide, Typography } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import './Footer.css';

export const Footer = () => {
  return (
    <footer >
      <Slide in={true} direction='up' timeout={3000}>
        <div className='FooterSection'>
          <Divider variant='middle'></Divider>
          <div className='FooterContainer'>
            <div className='FooterItemContainer'>
              <CopyrightIcon color='secondary' fontSize='small' />
              <Typography color='textSecondary' variant='body2'>
                Elyes
              </Typography>
            </div>

            <Divider orientation='vertical' flexItem></Divider>
            <div className='FooterItemContainer'>
              <Typography color='textSecondary' variant='body2'>
                Feedback: Elyes9918@gmail.com
              </Typography>
            </div>

            <Divider orientation='vertical' flexItem></Divider>
            <Link href='https://github.com/Elyes9918'>
              Github
            </Link>
          </div>
        </div>
      </Slide>
    </footer>
  );
};
