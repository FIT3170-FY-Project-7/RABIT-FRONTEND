import { useContext } from 'react';

import { Box, Container, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SidebarContext } from '../../../contexts/SidebarContext';

import DataTitle from './Menu';
import HeaderUserbox from './Userbox';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box sx={{width:'85%'}} display="flex" alignItems="center">
        <Container sx={{width:'100%'}}>
          <DataTitle />
        </Container>
      </Box>
      <Box display="flex" alignItems="center">
        <HeaderUserbox />
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
