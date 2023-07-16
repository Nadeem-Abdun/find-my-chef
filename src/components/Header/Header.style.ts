import { styled } from '@mui/system';
import { Typography } from '@mui/material'


export const NavLinkText = styled(Typography)({
  marginRight: '16px',
  color: '#8B4513',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});